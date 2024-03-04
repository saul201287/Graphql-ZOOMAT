import { ServicesTokens } from "../../infraestructure/servicesTokens/ServicesTokens";

export class ServicesTokensUser {
  constructor(readonly webToken: ServicesTokens) {}
  async run(usuario: string, secret: string, expiresIn: number): Promise<string | null>{
    try {
      const token = await this.webToken.singToken(usuario, secret, expiresIn);
      return token;
    } catch (error) {
        console.log(error);
      return null;
    }
  }
}
