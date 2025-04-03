import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { PostgresController } from './postgres.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PostgresService],
  controllers: [PostgresController],
})
export class PostgresModule {}
