export class TransactionHistory {
    constructor(
    public planrechargedId:string,
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
    public rechargedId:string
    ){} // Add the planPrice property
  }