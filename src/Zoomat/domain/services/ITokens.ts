import { JwtPayload } from "jsonwebtoken";

export interface IServicesToken {
  singToken(
    usuario: string,
    secret: string,
    expiresIn: number
  ): Promise<string | null>;
  verifyToken(token: string): Promise<string | JwtPayload | null>;
}
