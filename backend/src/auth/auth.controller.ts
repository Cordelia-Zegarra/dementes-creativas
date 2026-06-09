import { Controller, Post, Body, Get, Req, UseGuards, Ip, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CaptchaService } from './captcha.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private captchaService: CaptchaService,
  ) {}

  @Get('captcha')
  getCaptcha() {
    return this.captchaService.generateCaptcha();
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.login(loginDto, ip, userAgent);
  }

  @Post('logout')
  async logout(
    @Body('username') username: string,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.logout(username, ip, userAgent);
  }

  @Post('check-password-strength')
  checkPasswordStrength(@Body('password') password: string) {
    return this.authService.checkPasswordStrength(password);
  }
}
