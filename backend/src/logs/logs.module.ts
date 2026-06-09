import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs.service';
import { AccessLog } from './entities/access-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLog])],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
