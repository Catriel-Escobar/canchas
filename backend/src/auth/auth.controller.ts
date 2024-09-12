import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { RecoverPasswordDto } from './dto/RecoverPasswordDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Inicia el proceso de autenticación con Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return {
      message: 'Usuario autenticado con Google',
      user: req.user,
    };
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
  @Post('/recover-password')
  findOne(@Body('email') recoverPasswordDto: RecoverPasswordDto) {
    return this.authService.recoverPassword(recoverPasswordDto.email);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile() {
    return { message: 'Perfil protegido' };
  }
}
