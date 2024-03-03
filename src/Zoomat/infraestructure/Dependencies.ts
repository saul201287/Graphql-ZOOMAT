import { CreateUserUseCase } from "../app/User/CreateUserUseCase";
import { ServicesTokensUser } from "../app/services/ServicesTokens";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { EncryptServices } from "./helpers/EncriptServices";
import { ServicesTokens } from "./servicesTokens/ServicesTokens";
import { CreateUserController } from "./controllers/CreateUserController";


const mysqlUsertRepository = new MysqlUserRepository();
const servicesEncrypt = new EncryptServices();
const webTokens = new ServicesTokens();

const servicesTokensUser = new ServicesTokensUser(webTokens);

const createUserUseCase = new CreateUserUseCase(
    mysqlUsertRepository,
    servicesEncrypt
  );

  export const createUserController = new CreateUserController(createUserUseCase);
