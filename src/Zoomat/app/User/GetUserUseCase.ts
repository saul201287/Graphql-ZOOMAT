import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { IEncryptServices } from "../services/IEncrypt";
import { ServicesTokensUser } from "../services/ServicesTokens";

export class GetUserUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly webToken: ServicesTokensUser,
    readonly options: IEncryptServices
  ) {}
  async run(
    usuario: string,
    password: string
  ): Promise<[User[], string] | null> {
    try {
      const user = await this.userRepository.getUser(usuario, password);
      if (user != null) {
        let password2 = user[0];
        console.log(password2);
        //const pass = await this.options.compareTo(password, password2);
        let tokenNew = await this.webToken.run(
          usuario,
          String(process.env.SECRET_TOKEN),
          100 * 100
        );
        const data: any = [user, tokenNew];
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
