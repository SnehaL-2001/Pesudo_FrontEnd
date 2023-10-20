import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Newsim } from 'src/module/newsim';
import { Observable, of } from 'rxjs';
import { Transaction } from 'src/module/transaction';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  updatestatus(phoneNumber: string): Observable<any> {
    return this.http.post(`http://localhost:8034/updateStatus?phoneNumber=${phoneNumber}`,{});
  }

  transactionrechargehistorysave(plantransaction: Transaction):Observable<any> {
    // console.log(plantransaction);
    return this.http.post('http://localhost:8036/transactionssave', plantransaction);
  }
  generateBill(emailAddress: string): Observable<Map<string, string>> {
    console.log(emailAddress);
    console.log(this.http.post('http://localhost:8036/generate-bill', emailAddress ))
    return this.http.post<Map<string, string>>('http://localhost:8036/generate-bill', emailAddress );
  }
  transactionrecharge(plantransaction: Transaction):Observable<any> {
    // console.log(plantransaction);
    return this.http.post('http://localhost:8036/transactions', plantransaction);
  }
  

 
 

  
  verifyEmailAndPassword(emailAddress: string, loginPassword: string):Observable<any> {
    const request = { emailAddress, loginPassword };
    return this.http.post('http://localhost:8034/verify',request)
  }
  
  
  sendMail(emailAddress: string, userName: string): Observable<any> {
    const body = { emailAddress, userName };
    console.log(this.http.post('http://localhost:8034/sendmail', body,{responseType:'json'}))
    return this.http.post('http://localhost:8034/sendmail', body);
  }

  registerNewSim(user: Newsim) {
    console.log(user);
    return this.http.post('http://localhost:8034/newsimrequest',user)
  }

  mobile:string = '';
  validateOTP(mobile: string, otp: string): Observable<boolean> {
   
      
      return this.http.post<boolean>('http://localhost:8034/validate-otp', { mobile, otp });
    
  }
  constructor(private http: HttpClient) {}
 url:string=''
  requestOTP(phoneNumber: string) {
    const body = { phoneNumber };
    console.log(body);
    return this.http.post('http://localhost:8034/requestotp', body);
  }
 
  
  // verifyEmailAndPassword(emailAddress: string, loginPassword: string): Observable<any> {
  //   const request = { emailAddress, loginPassword };
  //   console.log(this.http.post('http://localhost:8034/verifyemailnpswd', request));
  //   return this.http.post('http://localhost:8034/verifyemailnpswd', request);
  // }
  

}
