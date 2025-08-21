import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // * Aquí consulta a la DB
    // * Ejemplo Dummy
    if (email !== 'test@edu.com' || password !== '123456') {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    //* Simulación de respuesta con JWT

    return {
      token: 'fake-jwt-token',
      user: {
        id: '1',
        email: 'test@edu.com',
        name: 'Test User',
        role: 'admin',
      },
    };
  }

  async resetPassword(email: { email: string }) {
    // * Aquí normalmente enviarías un correo de token de reset.
    console.log(`Enviando correo de recuperación a ${email}`);
    return { message: 'Correo de recuperación enviado' };
  }

  async changePassword(newPasswordData: {newPassword: string }) {
    // * Aquí actualizarías la contraseña de DB
    console.log(`Nueva contraseña: ${newPasswordData.newPassword}`);
    return { message: 'Contraseña actualizada' };
  }
}
