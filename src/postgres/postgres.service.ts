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
  async getProcedure() {
    // Ejemplo de llamada a un procedimiento almacenado
    const data = await this.sql`
      SELECT * from get_active_users();

    `;
    return data;
  }

  async createUser(request: { email: string; password: string; name: string }) {
    try {
      const { email, password, name } = request;
      const data = await this.sql`
        INSERT INTO users (email, password, name) 
        VALUES (${email}, ${password}, ${name}) 
        RETURNING id, email, password, name;
      `;
      return data;
    } catch (error) {
      console.error('Error al registrar usuario en Postgres:', error);
      throw new Error(error.message || 'Error al registrar usuario');
    }
  }
}
