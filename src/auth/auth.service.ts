import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FindAuthDto } from './dto/find-auth.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { JwtPayload } from './guards/auth/auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ name, password }: FindAuthDto) {
    const user = await this.usersService.findOne(name);
    if (user) {
      const isPassMatch = await bcrypt.compare(password, user.password);
      if (isPassMatch) {
        const payload: JwtPayload = {
          id: user.id,
          name: user.name,
          role: user.role,
        };
        return {
          access_token: await this.jwtService.signAsync<JwtPayload>(payload),
        };
      }
    }
    throw new UnauthorizedException();
  }
}
