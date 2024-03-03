import { Animals } from "../../domain/entities/Animals";
import { AnimalsRepository } from "../../domain/repository/AnimalsRepository";

export class DeleteAnimalUseCase {
  constructor(readonly animalsRepository: AnimalsRepository) {}
  async run(id: number): Promise<string | null> {
    try {
      const animal = await this.animalsRepository.deleteAnimal(id);
      if (animal) {
        return "Registro eliminado";
      } else {
        return "El registro no se pudo eliminar";
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
