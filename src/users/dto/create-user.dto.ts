export class CreateUser {
  email: string;
  role: 'cliente' | 'admin';
  name: string;
  password: string;
  hash: string;
  hashedRt: string;
}
