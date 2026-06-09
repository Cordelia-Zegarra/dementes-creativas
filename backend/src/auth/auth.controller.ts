import { Controller, Post, Body, Get, Ip, Headers, BadRequestException } from '@nestjs/common';
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
    // Validar CAPTCHA
    if (!registerDto.captchaId || !registerDto.captcha) {
      throw new BadRequestException('CAPTCHA requerido');
    }
    
    const isValid = this.captchaService.validateCaptcha(
      registerDto.captchaId,
      registerDto.captcha
    );
    
    if (!isValid) {
      throw new BadRequestException('CAPTCHA incorrecto');
    }
    
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    // Validar CAPTCHA
    if (!loginDto.captchaId || !loginDto.captcha) {
      throw new BadRequestException('CAPTCHA requerido');
    }
    
    const isValid = this.captchaService.validateCaptcha(
      loginDto.captchaId,
      loginDto.captcha
    );
    
    if (!isValid) {
      throw new BadRequestException('CAPTCHA incorrecto');
    }
    
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
