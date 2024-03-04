import { GetAllUserUseCase } from "../../app/User/GetAllUserUseCase";
import { GetUserUseCase } from "../../app/User/GetUserUseCase";
import { Animals } from "../../domain/entities/Animals";
import { GetByAnimalUseCase } from "../../app/Animals/GetByIdAnimalUseCase";
import { GetAnimalByEspecieUseCase } from "../../app/Animals/GetAnimallByEspecieUseCase";
import { GetAllAnimalsUseCase } from "../../app/Animals/GetAllAnimalsUseCase";
import { CreateAnimalUseCase } from "../../app/Animals/CreateAnimalsUseCase";
import { CreateUserUseCase } from "../../app/User/CreateUserUseCase";
import { PutAnimalCategoryUseCase } from "../../app/Animals/PutAnimalCategoryUseCase";
import { putAnimalEdadUseCase } from "../../app/Animals/PutAnimalEdadUseCase";
import { DeleteAnimalUseCase } from "../../app/Animals/DeleteAnimalUseCase";

export class Resolvers {
  constructor(
    readonly getUserUseCase: GetUserUseCase,
    readonly getAllUserCase: GetAllUserUseCase,
    readonly getByIdAnimal: GetByAnimalUseCase,
    readonly getAllAnimals: GetAllAnimalsUseCase,
    readonly getAnimalByEspecie: GetAnimalByEspecieUseCase,
    readonly createAnimal: CreateAnimalUseCase,
    readonly createUser: CreateUserUseCase,
    readonly putAnimalCategory: PutAnimalCategoryUseCase,
    readonly putAnimalEdad: putAnimalEdadUseCase,
    readonly deleteAnimal: DeleteAnimalUseCase
  ) {}
  resolvers: any = {
    Query: {
      user: async (__:void,args:any) => {
        const user = await this.getUserUseCase.run(args.usuario, args.password);
        return user;
      },
      users:async () => {
        const users = await this.getAllUserCase.run();
        console.log(users);
        
        return users;
      },
      animals: async () => {
        const animals = await this.getAllAnimals.run();
        return animals;
      },
      animal: async (__: void, args: any) => {
        const animal = await this.getByIdAnimal.run(args.id);
        return animal;
      },
      animalByEspecie: async (__: void, args: any) => {
        const animal = await this.getAnimalByEspecie.run(args.especie);
        return animal;
      },
    },
     Mutation: {
      createAnimal: async (__: void, args: any) => {
        
        const animalNew = new Animals(
          0,
          args.animal.nombre,
          args.animal.edad,
          args.animal.peso,
          args.animal.especie,
          args.animal.alimentacion,
          args.animal.distribucion,
          args.animal.categoria
        );
        console.log(animalNew,"ssas");

        const animal = await this.createAnimal.run(animalNew);
        return animal;
      },
      createUser: async(__: void, args: any) => {
        const user = await this.createUser.run(
          args.nobre,
          args.password,
          args.usuario,
          args.correo
        );
        return user;
      },
      putAnimalEdad: async (__: void, args: any) => {
        const animal = await this.putAnimalEdad.run(args.nombre, args.edad);
        return animal;
      },
      putAnimalCategory: async (__: void, args: any) => {
        const animal = await this.putAnimalCategory.run(args.id, args.categoria);
        return animal;
      },
      deleteAnimal: async (__: void, args: any) => {
        const msg = await this.deleteAnimal.run(args.id);
        return msg;
      },
      // webhuuk: (__: void, args: any) => {
      //   return "";
      // },
    },
  };
}
