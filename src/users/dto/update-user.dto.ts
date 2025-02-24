export class UpdateUser {
  id?: number;
  email?: string;
  role?: 'cliente' | 'admin';
  password?: string;
}
