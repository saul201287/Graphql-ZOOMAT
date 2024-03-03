import { User } from "../entities/User";

export interface UserReporitory {
  getUser(usuario: string, password: string): Promise<[User[], string] | null>;
  getAllUser(): Promise<User[] | null>;
  createUser(
    nombre: string,
    password: string,
    usuario: string,
    correo: string
  ): Promise<User[] | null>;
}
