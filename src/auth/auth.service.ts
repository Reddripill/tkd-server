import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FindAuthDto } from './dto/find-auth.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AuthRequest, JwtPayload } from './guards/auth/auth.guard';
import authConfigEnv from 'src/config/auth.config';
import appConfigEnv from 'src/config/app.config';
import { type ConfigType } from '@nestjs/config';
import { type Response } from 'express';
import { CookieNames } from './constants/cookie.constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfigEnv.KEY)
    private authConfig: ConfigType<typeof authConfigEnv>,
    @Inject(appConfigEnv.KEY)
    private appConfig: ConfigType<typeof appConfigEnv>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userInfo: FindAuthDto, res: Response) {
    const user = await this.usersService.findOne(userInfo.name);
    if (user) {
      const isPassMatch = await bcrypt.compare(
        userInfo.password,
        user.password,
      );

      if (isPassMatch) {
        const payload: JwtPayload = {
          id: user.id,
          name: user.name,
          role: user.role,
        };

        const { refresh_token } = this.generateTokens(payload, res);

        await this.usersService.update(user.id, { refresh_token });

        return payload;
      }
    }
    throw new UnauthorizedException();
  }

  generateTokens(payload: JwtPayload, res: Response) {
    const accessExpiration = parseInt(this.authConfig.accessExpires as string);
    const accessExpireTime = new Date(Date.now() + accessExpiration);
    const refreshExpiration = parseInt(
      this.authConfig.refreshExpires as string,
    );
    const refreshExpireTime = new Date(Date.now() + refreshExpiration);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: `${accessExpiration}ms`,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${refreshExpiration}ms`,
    });

    res.cookie(CookieNames.AUTH, accessToken, {
      secure: this.appConfig.NODE_ENV === 'production',
      expires: accessExpireTime,
      sameSite: 'lax',
      httpOnly: true,
    });

    res.cookie(CookieNames.REFRESH, refreshToken, {
      secure: this.appConfig.NODE_ENV === 'production',
      expires: refreshExpireTime,
      sameSite: 'lax',
      httpOnly: true,
    });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(request: AuthRequest, response: Response) {
    const user = await this.usersService.findById(request.user.id);

    const cookieRefreshToken = request.cookies?.[CookieNames.REFRESH];
    const payload =
      await this.jwtService.verifyAsync<JwtPayload>(cookieRefreshToken);

    const refreshTokenMatches = user?.refresh_token === cookieRefreshToken;
    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }

    const { refresh_token } = this.generateTokens(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      response,
    );

    await this.usersService.update(user.id, { refresh_token });

    return payload;
  }

  async logout(userId: string, res: Response) {
    await this.usersService.update(userId, { refresh_token: null });
    res.clearCookie(CookieNames.AUTH);
    res.clearCookie(CookieNames.REFRESH);
    return userId;
  }
}
