import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class GetAllUserUseCase {
  constructor(readonly userRepository: UserRepository) {}
  async run(): Promise<User[] | null> {
    try {
      const user = await this.userRepository.getAllUser();
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
