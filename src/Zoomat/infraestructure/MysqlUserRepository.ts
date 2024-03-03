import { query } from "../../database/mysql";
import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async getUser(
    usuario: string,
    password: string
  ): Promise<[User[], string] | null> {
    let data: any = [User, ""];
    return data;
  }
  async getAllUser(): Promise<User[] | null> {
    const sql = "SELECT * FROM usuarios ";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) =>
          new User(
            user.id,
            user.nombre,
            user.password,
            user.usuario,
            user.correo
          )
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createUser(
    nombre: string,
    correo: string,
    usuario: string,
    password: string
  ): Promise<User[] | null> {
    const sql =
      "INSERT INTO usuarios (id,nombre,password,usuario,correo) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [0,nombre, password, usuario, correo];
    try {
      const [result]: any = await query(sql, params);

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
