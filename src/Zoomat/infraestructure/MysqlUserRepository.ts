import { query } from "../../database/mysql";
import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async getUser(
    usuario: string,
    password: string
  ): Promise<[User[], string] | null> {
    const sql = "SELECT * FROM usuarios where usuario= ? ";
    let params: any[] = [usuario];    
    try {
      const data = await query(sql, params);
      console.log(data?.[0]);
      
      const dataUsers : any = Object.values(JSON.parse(JSON.stringify(data)));
      console.log(dataUsers);
      
      return dataUsers
    } catch (error) {
      console.log(error);
      return null;
    }
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
    password: string,
    usuario: string,
    correo: string
  ): Promise<User | null> {
    const sql =
      "INSERT INTO usuarios (id,nombre,password,usuario,correo) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [0,nombre, password, usuario, correo ];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);
      const user = new User(
        result.insertId,
        nombre,
        password,
        usuario,
        correo
      )
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
