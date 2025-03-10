import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'yourSecretKey', // Cambia esto por una clave secreta segura
  signOptions: {
    expiresIn: '1h', // Tiempo de expiración del token
  },
};
