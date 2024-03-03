import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class GetByAnimalUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(id: number): Promise<Animals[] | null> {
    try {
      const animal = await this.animalsRepository.getById(id);
      return animal;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
