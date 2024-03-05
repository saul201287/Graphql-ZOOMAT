import { query } from "../../database/mysql";
import { Animals } from "../domain/entities/Animals";
import { AnimalsRepository } from "../domain/repository/AnimalsRepository";

export class MysqlAnimalRepository implements AnimalsRepository {
  async getAll(): Promise<Animals[] | null> {
    const sql = "SELECT * FROM animales ";
    try {
      const [data]: any = await query(sql, []);
      const dataAnimals = Object.values(JSON.parse(JSON.stringify(data)));
      return dataAnimals.map(
        (animal: any) =>
          new Animals(
            animal.id,
            animal.nombre,
            animal.edad,
            animal.peso,
            animal.especie,
            animal.alimentacion,
            animal.distribucion,
            animal.categoria
          )
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getById(id: number): Promise<Animals | null> {
    const sql = "SELECT * FROM animales where id = ?";
    try {
      const [data]: any = await query(sql, [id]);
   
      const dataAnimals: any = Object.values(JSON.parse(JSON.stringify(data)));
      return dataAnimals;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getEspecie(especie: string): Promise<Animals[] | null> {
    const sql = "SELECT * FROM animales where especie = ?";
    try {
      const [data]: any = await query(sql, [especie]);
      const dataAnimals: any = Object.values(JSON.parse(JSON.stringify(data)));
      return dataAnimals.map(
        (animal: any) =>
          new Animals(
            animal.id,
            animal.nombre,
            animal.edad,
            animal.peso,
            animal.especie,
            animal.alimentacion,
            animal.distribucion,
            animal.categoria
          )
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async putAnimalEdad(nombre: string, edad: number): Promise<String | null> {
    const sql = "UPDATE animales SET edad=? where nombre = ?";
    try {
      const [data]: any = await query(sql, [edad, nombre]);
      if (data.changedRows>0) {
        return "Elemto modificado"
      } else {
        return " Elemento no encontrado"
      }  
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async putAnimalCategory(
    id: number,
    categoria: string
  ): Promise<String | null> {
    const sql = "UPDATE animales SET categoria=? where id = ?";
    try {
      const [data]: any = await query(sql, [categoria, id]);
      console.log(data.changedRows);
      if (data.changedRows>0) {
        return "Elemto modificado"
      } else {
        return " Elemento no encontrado"
      }     
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async createAnimal(animal: Animals): Promise<Animals | null> {
    console.log(animal,"ss");
    
    const sql =
      "INSERT INTO animales (id,nombre,edad,peso,especie,alimentacion,distribucion,categoria) VALUES (?, ?, ?, ?, ?, ?,?,?)";
    const params: any[] = [
      0,
      animal.nombre,
      animal.edad,
      animal.peso,
      animal.especie,
      animal.alimentacion,
      animal.distribucion,
      animal.categoria,
    ];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);
      const animals = new Animals(
        result.insertId,
        animal.nombre,
        animal.edad,
        animal.peso,
        animal.especie,
        animal.alimentacion,
        animal.distribucion,
        animal.categoria
      );
      console.log(animals);
      return animals;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteAnimal(id: number): Promise<string | null> {
    const sql = "DELETE from animales where id = ?";
    try {
      const [data]: any = await query(sql, [id]);
      const dataAnimals: any = Object.values(JSON.parse(JSON.stringify(data)));
      console.log(data, dataAnimals);
      return dataAnimals;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
