export class Webhooks{
    constructor(
        readonly id:number,
        readonly url: string,
        readonly events: string[]
    ){}
}