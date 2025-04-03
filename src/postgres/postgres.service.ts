// database.service.ts
import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresService {
  private readonly sql;

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get('DATABASE_URL_POSTGRES');
    this.sql = neon(databaseUrl);
  }
  async getData() {
    // Ejemplo de consulta SQL
    const data = await this.sql`
      SELECT id, nombre, email FROM users LIMIT 10;
    `;
    return data;
  }
  async createUser(request: { email: string; password: string; name: string }) {
    const { email, password, name } = request;
    const data = await this.sql`
        INSERT INTO users (email, password, name) VALUES (${email}, ${password},${name}) RETURNING id, email, password, name;
        `;
    return data;
  }
}
