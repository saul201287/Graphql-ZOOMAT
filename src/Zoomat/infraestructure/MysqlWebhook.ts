import { query } from "../../database/mysql";
import { IWebhhok } from "../domain/services/IWebhook";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class MysqlWebhookRepository implements IWebhhok {
  async recive(url: string, events: string[]): Promise<string | null> {
    const sql = "INSERT INTO webhook (id,url,events) VALUES (?, ?, ?)";
    const params: any[] = [0, url, events];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      return "elemento creado";
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async search(event: string): Promise<string[] | null> {
    const sql = `SELECT url FROM webhook WHERE JSON_CONTAINS(events,?);`;
    let params: any[] = [`"${event}"`];
    try {
      const [data]: any = await query(sql, params);      
      const dataUsers: any = Object.values(JSON.parse(JSON.stringify(data)));
      return dataUsers;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async send(url: string, data: any): Promise<boolean | null> {
    try {
        const response: AxiosResponse = await axios.post(url, data);
        console.log("Respuesta de la API:", response.data);
        return true;
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        return null;
    }
}

}
