import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class putAnimalEdadUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(nombre: string, edad: number): Promise<Animals | null> {
    try {
      const animal = await this.animalsRepository.putAnimalEdad(nombre, edad);
      return animal;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
