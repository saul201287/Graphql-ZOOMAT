import { GraphQLError } from "graphql";
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
import { ServicesAuth } from "../../app/services/ServicesAuth";
import { ServicesCreateWebhook } from "../../app/services/ServicesCreateWebhook";
import { ServicesSearchWebhook } from "../../app/services/ServicesSearchWebhook";
import { ServicesSendWebhook } from "../../app/services/ServicesSendWebhook";

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
    readonly deleteAnimal: DeleteAnimalUseCase,
    readonly servicesAuth: ServicesAuth,
    readonly servicesCreateWebhook: ServicesCreateWebhook,
    readonly servicesSearchWebhook: ServicesSearchWebhook,
    readonly servicesSendWebhook: ServicesSendWebhook
  ) {}
  public token: string = "";

  resolvers: any = {
    Query: {
      user: async (__: void, args: any) => {
        const user: any = await this.getUserUseCase.run(
          args.usuario,
          args.password
        );
        const [url]: any = await this.servicesSearchWebhook.run("login");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, user);
        }

        if (user) {
          this.token = user[1];
        }
        return { user: user[0], token: user[1] };
      },
      users: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const users = await this.getAllUserCase.run();
          const [url]: any = await this.servicesSearchWebhook.run("allUsers");
          if (url) {
            const e = await this.servicesSendWebhook.run(url.url, users);
          }
          return users;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      animals: async (_: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const animals = await this.getAllAnimals.run();
          const [url]: any = await this.servicesSearchWebhook.run("allAnimals");
          if (url) {
            const e = await this.servicesSendWebhook.run(url.url, animals);
          }
          return animals;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      animal: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const [animal]: any = await this.getByIdAnimal.run(args.id);
          const [url]: any = await this.servicesSearchWebhook.run("oneAnimal");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, animal);
        }
          return animal;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      animalByEspecie: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const [animal]: any = await this.getAnimalByEspecie.run(args.especie);
          const [url]: any = await this.servicesSearchWebhook.run("especieAnimal");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, animal);
        }
          return animal;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
    },
    Mutation: {
      createAnimal: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
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
          const animal = await this.createAnimal.run(animalNew);
          const [url]: any = await this.servicesSearchWebhook.run("crearAnimal");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, animal);
        }
          return animal;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      createUser: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const user = await this.createUser.run(
            args.user.nombre,
            args.user.password,
            args.user.usuario,
            args.user.correo
          );
          const [url]: any = await this.servicesSearchWebhook.run("crearUser");
          if (url) {
            const e = await this.servicesSendWebhook.run(url.url, user);
          }
          return user;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      putAnimalEdad: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const animal = await this.putAnimalEdad.run(
            args.animal.nombre,
            args.animal.edad
          );
          const [url]: any = await this.servicesSearchWebhook.run("modificarEdadAnimal");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, animal);
        }
          return animal;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      putAnimalCategory: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const animal = await this.putAnimalCategory.run(
            args.animal.id,
            args.animal.categoria
          );
          const [url]: any = await this.servicesSearchWebhook.run("modificarAnimalCategoria");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, animal);
        }
          return animal;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      deleteAnimal: async (__: void, args: any, context: any) => {
        let key = await this.servicesAuth.run(context.authScope);

        if (key) {
          const msg = await this.deleteAnimal.run(args.id);
          const [url]: any = await this.servicesSearchWebhook.run("eliminarAnimal");
        if (url) {
          const e = await this.servicesSendWebhook.run(url.url, msg);
        }
          return msg;
        } else {
          throw new GraphQLError("Acceso denegado!", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      },
      createWebhook: async (__: void, args: any) => {
        const data = await this.servicesCreateWebhook.run(
          args.url,
          args.events
        );
        return data;
      },
    },
  };
}
