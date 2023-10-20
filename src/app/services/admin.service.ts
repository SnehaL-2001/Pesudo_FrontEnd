import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/module/plan';
import { Transaction } from 'src/module/transaction';
import { TransactionHistory } from 'src/module/transactionHistory';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getRechargedetails():Observable<TransactionHistory[]> {
    return this.http.get<TransactionHistory[]>(`http://localhost:8036/allTransaction`);
  }
  getAllUsers(): Observable<Plan[]> {
    
    return this.http.get<Plan[]>(`http://localhost:8034/allusers`);
  }
  deletePlan(planId: number): Observable<void> {
    const url = `http://localhost:8036/deleteplan/${planId}`;
    return this.http.delete<void>(url);
  
  }
  
  getPlans(): Observable<Plan[]> {
    return this.http.get<any[]>('http://localhost:8036/getplan',{responseType:'json'});
  }
  constructor(private http:HttpClient){}
  addPlan(planData: Plan): Observable<any> {
    return this.http.post('http://localhost:8036/addplan', planData);
  }
  getPlan(planId: number): Observable<Plan> {
    const url = `http://localhost:8036/plans/${planId}`;

    return this.http.get<Plan>(url);
  }
  updatePlan(plan: Plan): Observable<any> {
    const url = `http://localhost:8036/plans/${plan.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(url, plan, { headers });
  }
}
