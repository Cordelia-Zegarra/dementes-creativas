import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductSeedService } from './product-seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(ProductSeedService);
  
  await seedService.seedProducts();
  console.log('✅ Seed completado');
  await app.close();
}
bootstrap();
