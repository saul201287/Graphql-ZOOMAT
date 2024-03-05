import { Animals } from "../entities/Animals";

export interface AnimalsRepository {
  getAll(): Promise<Animals[] | null>;
  getById(id:number,): Promise<Animals | null>;
  getEspecie(especie: string): Promise<Animals[] | null>;
  putAnimalEdad(nombre: string, edad: number): Promise<Animals | null>;
  createAnimal(animal: Animals): Promise<Animals | null>;
  putAnimalCategory(
    id: number,
    categoria: string
  ): Promise<String | null>;
  deleteAnimal(id: number): Promise<string | null>
}
