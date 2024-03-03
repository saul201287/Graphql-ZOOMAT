import { User } from "../../domain/entities/User";
import { UserReporitory } from "../../domain/repository/UserRepository";

export class GetUserUseCase {
  constructor(readonly userRepository: UserReporitory) {}
  async run(usuario: string, password: string ): Promise<[User[], string] | null> {
    try {
      const user = await this.userRepository.getUser(usuario, password);
      const data: any = [user, ""]
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
