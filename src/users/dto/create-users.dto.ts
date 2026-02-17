import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/types/enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
