import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { Product } from './products/entities/product.entity';
import { User } from './auth/entities/user.entity';
import { AccessLog } from './logs/entities/access-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Product, User, AccessLog],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product, User, AccessLog]),
    ProductsModule,
    AuthModule,
    LogsModule,
  ],
})
export class AppModule {}
