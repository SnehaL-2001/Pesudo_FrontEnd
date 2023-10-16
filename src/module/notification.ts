export class Notification{
constructor(public id:number,
    public title:string,
    public messge:string,
    public timestamp:Date,
    public read:boolean){}
}