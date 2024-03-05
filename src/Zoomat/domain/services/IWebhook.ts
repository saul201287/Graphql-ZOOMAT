export interface IWebhhok{
    recive(url:string, events:string[] ):Promise<string | null>;
    search(event:string): Promise<string[] | null>
    send(url:string,data:any): Promise<boolean | null>
}