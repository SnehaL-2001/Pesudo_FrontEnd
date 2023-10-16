export class Recharge{
    constructor( public id: number,
        public mobileNumber: string,
         public operator: string,
        public amount: number,
        public features: string,
        public duration: string,
        public date: Date,
        ){
       
        }
    }
