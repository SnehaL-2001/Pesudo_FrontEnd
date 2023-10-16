import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  public isLogin = false;
  
  public userIsAuthenticated = false;
  public isAdminLogin=false;

  login() {

    // Perform authentication logic, set userIsAuthenticated to true on success

    this.userIsAuthenticated = true;

  }

 

  logout() {

    // Perform logout logic, set userIsAuthenticated to false

    this.userIsAuthenticated = false;

  }

 

  isAuthenticated() {

    return this.userIsAuthenticated;

  }
  getUserDataKey(): string {
    // You can implement your logic to determine the user data key here
    // For this example, let's say we have a flag to indicate whether the user is using an email or phone as the key
    if (this.isUsingEmailAsKey()) {
      return 'email';
    } else {
      return 'phone';
    }
  }

  // Example method to check if the user is using email as the key
  isUsingEmailAsKey(): boolean {
    // Replace this with your actual logic to determine the key type
    return true; // Return true if using email, false if using phone
  }
  constructor() { }
}
