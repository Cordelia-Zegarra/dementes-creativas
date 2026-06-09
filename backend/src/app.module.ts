import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { ProductSeedService } from './seeds/product-seed.service';
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
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Product, User, AccessLog],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product, User, AccessLog]),
    ProductsModule,
    AuthModule,
    LogsModule,
  ],
  providers: [ProductSeedService],
})
export class AppModule {}
