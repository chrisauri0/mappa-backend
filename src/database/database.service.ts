import { Injectable,OnModuleDestroy,OnModuleInit } from '@nestjs/common';
import { createClient } from '@libsql/client';

@Injectable()
export class DatabaseService {}
