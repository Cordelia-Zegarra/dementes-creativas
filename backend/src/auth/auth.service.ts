import { Injectable, UnauthorizedException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto, PasswordStrengthDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private logsService: LogsService,
  ) {}

  checkPasswordStrength(password: string): PasswordStrengthDto {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    let strength: 'weak' | 'medium' | 'strong';
    if (score <= 2) strength = 'weak';
    else if (score <= 4) strength = 'medium';
    else strength = 'strong';
    
    return { password, strength, score };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: registerDto.username },
        { email: registerDto.email }
      ]
    });
    
    if (existingUser) {
      throw new BadRequestException('El usuario o email ya existe');
    }
    
    const strength = this.checkPasswordStrength(registerDto.password);
    if (strength.strength === 'weak') {
      throw new BadRequestException('La contraseña es demasiado débil. Usa al menos 8 caracteres, mayúsculas, minúsculas y números.');
    }
    
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = this.userRepository.create({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
      role: 'user',
      isActive: true,
    });
    
    await this.userRepository.save(user);
    
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(loginDto: LoginDto, ip: string, userAgent: string): Promise<{ access_token: string; username: string; role: string }> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username }
    });
    
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    
    if (!user.isActive) {
      throw new UnauthorizedException('Usuario desactivado');
    }
    
    // Registrar log de ingreso
    await this.logsService.logAccess(user.username, 'login', ip, userAgent);
    
    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = this.jwtService.sign(payload);
    
    return {
      access_token,
      username: user.username,
      role: user.role,
    };
  }

  async logout(username: string, ip: string, userAgent: string): Promise<{ message: string }> {
    await this.logsService.logAccess(username, 'logout', ip, userAgent);
    return { message: 'Sesión cerrada exitosamente' };
  }
}
