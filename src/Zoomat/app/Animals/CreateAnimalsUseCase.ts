import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class CreateAnimalUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(animals: Animals): Promise<Animals | null> {
    try {
      const animal = await this.animalsRepository.createAnimal(animals);
      return animal;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
