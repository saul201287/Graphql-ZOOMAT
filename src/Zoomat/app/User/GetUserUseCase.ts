import { User } from "../../domain/entities/User";
import { UserReporitory } from "../../domain/repository/UserRepository";
import { ServicesTokensUser } from "../services/ServicesTokens";

export class GetUserUseCase {
  constructor(
    readonly userRepository: UserReporitory,
    readonly webToken: ServicesTokensUser
  ) {}
  async run(
    usuario: string,
    password: string
  ): Promise<[User[], string] | null> {
    try {
      let tokenNew = await this.webToken.run(
        usuario,
        String(process.env.SECRET_TOKEN),
        100 * 100
      );
      const user = await this.userRepository.getUser(usuario, password);
      const data: any = [user, tokenNew];
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
