import {sign} from "jsonwebtoken"
import { IServicesToken } from "../../domain/services/ITokens"

export class ServicesTokens implements IServicesToken{
    async  singToken(id: string, secret: string, expiresIn: number): Promise<string | null> {
        try {
            const token = sign(id, secret || "seguridad")    
           return token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}