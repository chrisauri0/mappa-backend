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
  async getProcedure2() {
    // Ejemplo de llamada a un procedimiento almacenado
    const data = await this.sql`
call get_active_users2();
    `;
    return data;
  }
  async getTicketPromedio() {
    const data = await this.sql`
      SELECT AVG(plan_price) AS promedio_precio FROM (
    SELECT plan_price FROM user_plans WHERE compras = 1
) AS compras_realizadas;


    `;
    return data;
  }

  async getComprasUsuarios() {
    const data = await this.sql`
       SELECT
 users.name AS Usuario,
 COUNT(user_plans.id) AS Planes_Contratados
FROM
 users
INNER JOIN
 user_plans ON users.id = user_plans.user_id
GROUP BY
 users.name
HAVING
 COUNT(user_plans.id) > 1
ORDER BY
 Planes_Contratados DESC;
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
