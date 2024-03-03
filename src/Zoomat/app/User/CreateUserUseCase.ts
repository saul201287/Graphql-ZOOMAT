import { User } from "../../domain/entities/User";
import { UserReporitory } from "../../domain/repository/UserRepository";

export class CreateUserUseCase {
  constructor(readonly userRepository: UserReporitory) {}
  async run(
    nombre: string,
    password: string,
    usuario: string,
    correo: string
  ): Promise<User[] | null> {
    try {
      const user = await this.userRepository.createUser(
        nombre,
        password,
        usuario,
        correo
      );
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
