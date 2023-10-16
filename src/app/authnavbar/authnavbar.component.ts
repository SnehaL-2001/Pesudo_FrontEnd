import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-authnavbar',
  templateUrl: './authnavbar.component.html',
  styleUrls: ['./authnavbar.component.css']
})
export class AuthnavbarComponent {


  mobile: any; // Define the mobile property

  constructor(public service: AuthserviceService, public sessionService:SessionService,private router:Router) {
    // Retrieve the phone number from localStorage
  
  }


  logout() {   

    console.log('Logout function called');
    this.sessionService.logout();
    console.log(sessionStorage.getItem('phoneNumber'))
    console.log(sessionStorage.getItem('emailAddress'))
    this.router.navigate(['/home']);
    this.service.isLogin=false



    // ... any other logout actions you need to perform
  }

//   import { Component } from '@angular/core';
// import { YourAuthService } from '../services/auth.service'; // Import your authentication service
// import { SessionStorageService } from '../services/session-storage.service'; // Import your SessionStorageService
// import { Router } from '@angular/router'; // Import the Angular Router

// @Component({
//   selector: 'app-your-component',
//   template: `
//     <!-- Your template code here -->
//   `
// })
// export class YourComponent {
//   constructor(
//     private authService: YourAuthService,
//     private sessionStorageService: SessionStorageService,
//     private router: Router // Inject the Angular Router
//   ) { }

//   logout(): void {
//     // Set the login status to false when the user logs out
//     this.authService.isLogin = false;

//     // Remove user data from session storage based on the key (email or phone)
//     const userDataKey = this.authService.getUserDataKey(); // Replace with the actual method to get the key (email or phone)
//     this.sessionStorageService.removeItem(userDataKey);

//     // Redirect to the home page after logout
//     this.router.navigate(['/home']); // Replace with the actual route to your home page
//   }
// }

}
