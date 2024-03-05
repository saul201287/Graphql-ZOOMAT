import { IWebhhok } from "../../domain/services/IWebhook";

export class ServicesSendWebhook {
  constructor(readonly iWebhook: IWebhhok) {}
  async run(url: string, data:any) {
    try {
      const result = await this.iWebhook.send(url,data);
      return result;
    } catch (error) {
        console.error(error);
        
      return null;
    }
  }
}
