export class Transaction {
    constructor(
    public phoneNumber: string,
    public firstName:string,
    public lastName:string,
    public date: Date,
    public invoiceID: string,
    public nextPaymentDate: Date,
    public emailAddress: string,
    public paymentMethod: string,
    public paymentMethodId:string,
    public planName: string,
    public planPrice: number,
    public transactionId:string,
    public rechargedId:string,
    public wallet:number,
    public paid:number
    ){} // Add the planPrice property
  }
  