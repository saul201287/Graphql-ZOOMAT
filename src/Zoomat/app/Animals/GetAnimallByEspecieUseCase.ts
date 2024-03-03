import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class GetAnimalByEspecieUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(especie: string): Promise<Animals[] | null> {
    try {
      const animal = await this.animalsRepository.getEspecie(especie);
      return animal;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
