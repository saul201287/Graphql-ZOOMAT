import { JwtPayload } from "jsonwebtoken";
import { ServicesTokens } from "../../infraestructure/servicesTokens/ServicesTokens";

export class ServicesAuth {
  constructor(readonly webToken: ServicesTokens) {}
  async run(usuario: string): Promise<string | JwtPayload | null>{
    try {
      const token = await this.webToken.verifyToken(usuario);
      return token;
    } catch (error) {
        console.log(error);
      return null;
    }
  }
}
