export interface IServicesToken {
    singToken(usuario:string,secret:string, expiresIn:number): Promise<string | null>;
    
}