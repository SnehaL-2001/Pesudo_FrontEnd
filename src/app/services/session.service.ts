import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private phoneNumber: string|null=null;
  private emailAddress: string | null=null;
  private isLogin = false;

  loginWithEmail(emailAddress: string) {
    console.log(emailAddress);
    this.emailAddress = emailAddress;
    this.isLogin = true;
    // Store the email and login status in sessionStorage
    sessionStorage.setItem('emailAddress', emailAddress);
    sessionStorage.setItem('isLogin', 'true');
  }

  loginWithPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
    this.isLogin = true;
    // Store the phone number and login status in sessionStorage
    sessionStorage.setItem('phoneNumber', phoneNumber);
    sessionStorage.setItem('isLogin', 'true');
  }

  logout() {
    this.phoneNumber = null;
    this.emailAddress = null;
    this.isLogin = false;
    // Clear the stored information from sessionStorage
    sessionStorage.removeItem('phoneNumber');
    sessionStorage.removeItem('emailAddress');
    sessionStorage.removeItem('isLogin');
    this.router.navigate(['/home']);
  }

  getPhoneNumber(): string |null{
    return this.phoneNumber;
  }

  getEmail(): string|null {
    return this.emailAddress;
  }

  getIsLogin(): boolean {
    return this.isLogin;
  }
  constructor(private router:Router) { }
}

