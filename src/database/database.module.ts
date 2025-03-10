import { createClient } from '@libsql/client';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/libsql';
import { DatabaseService } from './database.service';
export const DATABASE_CONNECTION = 'database-connection';
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const client = createClient({
          url: configService.getOrThrow('DATABASE_URL'),
          authToken: configService.getOrThrow('DATABASE_TOKEN'),
        });

        return drizzle(client, {
          schema: {},
        });
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
