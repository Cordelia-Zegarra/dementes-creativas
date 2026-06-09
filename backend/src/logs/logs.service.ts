import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessLog } from './entities/access-log.entity';
import { Request } from 'express';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(AccessLog)
    private logsRepository: Repository<AccessLog>,
  ) {}

  async logAccess(
    username: string,
    event: 'login' | 'logout',
    ip: string,
    userAgent: string,
  ): Promise<AccessLog> {
    const log = this.logsRepository.create({
      username,
      event,
      ip,
      userAgent,
    });
    
    return await this.logsRepository.save(log);
  }

  async getUserLogs(username: string): Promise<AccessLog[]> {
    return await this.logsRepository.find({
      where: { username },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllLogs(): Promise<AccessLog[]> {
    return await this.logsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
