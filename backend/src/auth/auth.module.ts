import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CaptchaService } from './captcha.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from './entities/user.entity';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'DementesSecretKey2026_HarryPotter_Wizard_Strong_Key',
      signOptions: { expiresIn: '8h' },
    }),
    ConfigModule,
    LogsModule, // Importante: importar LogsModule aquí
  ],
  controllers: [AuthController],
  providers: [AuthService, CaptchaService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
