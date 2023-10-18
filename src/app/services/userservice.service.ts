import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Newsim } from 'src/module/newsim';
import { Plan } from 'src/module/plan';
import { TransactionHistory } from 'src/module/transactionHistory';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  updateWalletBalance(email: string, userDetails: any): Observable<any> {
    const url = `http://localhost:8034/update-wallet/${email}`;
    return this.http.put(url, userDetails);
  }
  activatesim(code: string): Observable<any> {
    const body = { "code": code };
    console.log(this.http.post('http://localhost:8034/activate-sim', body));
    return this.http.post('http://localhost:8034/activate-sim', body);
  }

  getUserDetailsByCode(code: string): Observable<any> {
    
    return this.http.get(`http://localhost:8034/activate?code=${code}`);
  }
  getTransactionHistoryByEmail(emailAddress: string): Observable<TransactionHistory[]> {
    const url = `http://localhost:8036/getTransactionHistoryByEmailAddress?emailAddress=${emailAddress}`;
    return this.http.get<TransactionHistory[]>(url);
  }

  getTransactionHistoryByPhoneNumber(phoneNumber: string): Observable<TransactionHistory[]> {
    const url = `http://localhost:8036/getTransactionHistoryByPhoneNumber?phoneNumber=${phoneNumber}`;
    return this.http.get<TransactionHistory[]>(url);
  }
    getPlanDetailsByName(planName: string): Observable<any> {
    console.log(planName);
    const url = `http://localhost:8036/getplansbyname/${planName}`;
    return this.http.get(url);
  }

  getTransactionByPhoneNumber(phoneNumber: string): Observable<any> {
    console.log(this.http.get<any>(`http://localhost:8036/getTransactionByPhoneNumber?phoneNumber=${phoneNumber}`));
    return this.http.get<any>(`http://localhost:8036/getTransactionByPhoneNumber?phoneNumber=${phoneNumber}`);
  
  }
  getTransactionByEmail(emailAddress: string): Observable<any> {
    const url = `http://localhost:8036/getByEmailAddress?emailAddress=${emailAddress}`;
    console.log(this.http.get(url));
    return this.http.get(url);
  }
  searchPlansByPrice(price: number): Observable<any[]> {
   console.log(this.http.get<Plan[]>(`http://localhost:8036/pricing-plans?price=${price}`,{responseType:'json'}))
    return this.http.get<Plan[]>(`http://localhost:8036/pricing-plans?price=${price}`);
  }
  searchPlanByName(name: string) {
   console.log(name)
  
    return this.http.get(`http://localhost:8036/getplan/search/${name}`);
  }
 
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8036/getplan');
  }
  
  getUserData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8034/getuserdetails');
  } 
  
  constructor(private http: HttpClient) { }

  getUserDataByEmail(email: string): Observable<Newsim[]> {
    return this.http.get<Newsim[]>(`http://localhost:8034/userDataByEmail?email=${email}`);
}


  // Fetch user data by phone number
  getUserDataByPhoneNumber(phoneNumber: string) {
    return this.http.get<Newsim>(`http://localhost:8034/userDataByPhoneNumber?phoneNumber=${phoneNumber}`);
  }
  
}


