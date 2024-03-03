import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class GetAllAnimalsUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(): Promise<Animals[] | null> {
    try {
      const animal = await this.animalsRepository.getAll();
      return animal;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
