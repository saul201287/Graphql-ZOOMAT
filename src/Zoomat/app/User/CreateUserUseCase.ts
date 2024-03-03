import { User } from "../../domain/entities/User";
import { UserReporitory } from "../../domain/repository/UserRepository";
import { IEncryptServices } from "../services/IEncrypt";
import { ServicesTokensUser } from "../services/ServicesTokens";

export class CreateUserUseCase {
  constructor(
    readonly userRepository: UserReporitory,
    readonly options: IEncryptServices
  ) {}
  async run(
    nombre: string,
    password: string,
    usuario: string,
    correo: string
  ): Promise<User[] | null> {
    try {
      const newPassword = await this.options.encodePassword(password);
      const user = await this.userRepository.createUser(
        nombre,
        newPassword,
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
