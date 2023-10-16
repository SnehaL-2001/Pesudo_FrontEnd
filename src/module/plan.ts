export interface Plan {
    id: number;
    name: string;
    planPrice: number;
    data: string;
    calling:string;
    messagesPerDay: number;
    validity: number;
    features: string[];
    category: string;
    
  }
  export const categoryOptions: string[] = ['Monthly Basic Plan', 'Monthly Premium Plan', 'Yearly Basic Plan', 'Yearly Premium Plan'];