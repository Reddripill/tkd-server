import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  defaultAdminName: process.env.DEFAULT_ADMIN_NAME,
  defaultAdminPass: process.env.DEFAULT_ADMIN_PASS,
}));
