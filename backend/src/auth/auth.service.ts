import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { passwordDecoder, passwordEncoder } from 'src/utils/passwordEncoder';
import { LoginDTO, RegisterDTO, UpdatePasswordDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(register: RegisterDTO) {
    const user = this.userService.create(register);
    return 'prueba registro';
  }

  async login(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const userFound = await this.userService.findByEmail(email);
    const isValid = passwordDecoder(password, userFound.password);
    if ((userFound && isValid) || !userFound)
      throw new BadRequestException('Credentials invalids');
    return 'TODO: JWT etc.';
  }

  async recoverPassword(email: string) {
    const userFound = this.userService.findByEmail(email);
    if (!userFound)
      throw new BadRequestException(`user not found with email: ${email}`);
    // Enviar jwt via email para poder cambiar la pw
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDTO) {
    const { password, confirmPassword } = updatePasswordDto;
    if (password !== confirmPassword)
      throw new BadRequestException('Password dont match');
    const user = this.userService.update(id, {
      password: passwordEncoder(password),
    });
    return user;
  }
}
