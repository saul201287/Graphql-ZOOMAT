import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class PutAnimalCategoryUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(id: number, categoria: string): Promise<Animals | null> {
    try {
      const animal = await this.animalsRepository.putAnimalCategory(
        id,
        categoria
      );
      return animal;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
