import { User } from "../entities/User";

export interface UserRepository {
  getUser(usuario: string, password: string): Promise<[user:User[], token:string] | null>;
  getAllUser(): Promise<User[] | null>;
  createUser(
    nombre: string,
    password: string,
    usuario: string,
    correo: string
  ): Promise<User | null>;
}
