import { IWebhhok } from "../../domain/services/IWebhook";  

export class ServicesCreateWebhook{
    constructor(readonly iWebhook: IWebhhok){}
    async run(url:string, events: string[]){
        try {
            const data = await this.iWebhook.recive(url,events)
            return data
        } catch (error) {
            return null
        }
    }
}