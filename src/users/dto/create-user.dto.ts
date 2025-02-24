export class CreateUser {
  email: string;
  role: 'cliente' | 'admin';
  password: string;
  hash: string;
  hashedRt: string;
}
