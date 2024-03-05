import {JwtPayload, sign, verify} from "jsonwebtoken"
import { IServicesToken } from "../../domain/services/ITokens"

export class ServicesTokens implements IServicesToken{
    async  singToken(usuario: string, secret: string, expiresIn: number): Promise<string | null> {  
        try {
            const token = sign(usuario, secret || "seguridad")    
           return token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async verifyToken(token: string): Promise<string | JwtPayload | null> {
        try {            
            const id = verify(token, process.env.SECRET_TOKEN|| "yaque")
            return id
        } catch (error) {            
            return null
        }
    }
}