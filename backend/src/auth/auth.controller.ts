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
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { RecoverPasswordDto } from './dto/RecoverPasswordDto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from 'src/types/user-google.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDTO: RegisterDTO) {
    return 'hola mundo';
    // return this.authService.register(registerDTO);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Inicia el proceso de autenticación con Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Usa Google para esta ruta
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { jwt } = await this.authService.validateOrCreateUser(req.user);
    res.redirect(`http://localhost:5173/login?token=${jwt}`);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
  @Post('/recover-password')
  findOne(@Body('email') recoverPasswordDto: RecoverPasswordDto) {
    return this.authService.recoverPassword(recoverPasswordDto.email);
  }

  @Get('/check-login')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return { user: req.user };
  }
}
