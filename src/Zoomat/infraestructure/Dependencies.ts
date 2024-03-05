import { CreateUserUseCase } from "../app/User/CreateUserUseCase";
import { GetUserUseCase } from "../app/User/GetUserUseCase";
import { GetAllUserUseCase } from "../app/User/GetAllUserUseCase";
import { CreateAnimalUseCase } from "../app/Animals/CreateAnimalsUseCase";
import { GetAllAnimalsUseCase } from "../app/Animals/GetAllAnimalsUseCase";
import { PutAnimalCategoryUseCase } from "../app/Animals/PutAnimalCategoryUseCase";
import { putAnimalEdadUseCase } from "../app/Animals/PutAnimalEdadUseCase";
import { GetByAnimalUseCase } from "../app/Animals/GetByIdAnimalUseCase";
import { DeleteAnimalUseCase } from "../app/Animals/DeleteAnimalUseCase";
import { GetAnimalByEspecieUseCase } from "../app/Animals/GetAnimallByEspecieUseCase";
import { ServicesTokensUser } from "../app/services/ServicesTokens";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { MysqlAnimalRepository } from "./MysqlAnimalRepository";
import { EncryptServices } from "./helpers/EncriptServices";
import { ServicesTokens } from "./servicesTokens/ServicesTokens";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserController } from "./controllers/GetUserController";
import { Resolvers } from "./ServicesGraphql/Resolvers";
import { ServicesAuth } from "../app/services/ServicesAuth";

const mysqlUsertRepository = new MysqlUserRepository();
const mysqlAnimalRepository = new MysqlAnimalRepository();
const servicesEncrypt = new EncryptServices();
const webTokens = new ServicesTokens();

const servicesAuth = new ServicesAuth(webTokens);
const servicesTokensUser = new ServicesTokensUser(webTokens);

const createUserUseCase = new CreateUserUseCase(
  mysqlUsertRepository,
  servicesEncrypt
);
const getUserUseCase = new GetUserUseCase(
  mysqlUsertRepository,
  servicesTokensUser,
  servicesEncrypt
);
const getAllUserUseCase = new GetAllUserUseCase(mysqlUsertRepository);
const createAnimalUseCase = new CreateAnimalUseCase(mysqlAnimalRepository);
const getAllAnimalsUseCase = new GetAllAnimalsUseCase(mysqlAnimalRepository);
const putAnimalCategoryUseCase = new PutAnimalCategoryUseCase(
  mysqlAnimalRepository
);
const putanimalEdadUseCase = new putAnimalEdadUseCase(mysqlAnimalRepository);
const getByAnimalUseCase = new GetByAnimalUseCase(mysqlAnimalRepository);
const deleteAnimalUseCase = new DeleteAnimalUseCase(mysqlAnimalRepository);
const getAnimalsByEspecieUseCase = new GetAnimalByEspecieUseCase(
  mysqlAnimalRepository
);

export const ResolversGraph = new Resolvers(
  getUserUseCase,
  getAllUserUseCase,
  getByAnimalUseCase,
  getAllAnimalsUseCase,
  getAnimalsByEspecieUseCase,
  createAnimalUseCase,
  createUserUseCase,
  putAnimalCategoryUseCase,
  putanimalEdadUseCase,
  deleteAnimalUseCase,
  servicesAuth
);
export const getUserController = new GetUserController(getUserUseCase);
export const createUserController = new CreateUserController(createUserUseCase);
