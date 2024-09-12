import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { passwordDecoder, passwordEncoder } from 'src/utils/passwordEncoder';
import { LoginDTO, RegisterDTO, UpdatePasswordDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/types/user-google.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(register: RegisterDTO) {
    const user = await this.userService.create(register);
    delete user.password;
    const jwt = this.getJwtToken({ id: user.id });
    return { user, jwt };
  }

  async login(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const user = await this.userService.findByEmail(email);
    const isValid = passwordDecoder(password, user.password);
    if ((user && isValid) || !user)
      throw new BadRequestException('Credentials invalids');

    delete user.password;

    const jwt = this.getJwtToken({ id: user.id });
    return { user, jwt };
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

  private getJwtToken(payload: JwtPayload) {
    //
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateOrCreateUser(user: User) {
    const { email, firstName: name } = user;
    const userFound = await this.userService.createGoogle({ email, name });
    delete userFound.password;
    const jwt = this.getJwtToken({ id: userFound.id });
    return { userFound, jwt };
  }
}
