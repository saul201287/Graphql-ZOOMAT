import { IWebhhok } from "../../domain/services/IWebhook";

export class ServicesSearchWebhook {
  constructor(readonly iWebhook: IWebhhok) {}
  async run(event: string) {
    try {
      const data = await this.iWebhook.search(event);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
