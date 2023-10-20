import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { ServicesService } from '../services/services.service';
import Swal from 'sweetalert2';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-loginemail',
  templateUrl: './loginemail.component.html',
  styleUrls: ['./loginemail.component.css']
})
export class LoginemailComponent {
  emailAddress: string = '';
  loginPassword: string = '';

  constructor(private router: Router,public service:AuthserviceService,public eservice:ServicesService,public sessionservice:SessionService) {}

  login() {
    console.log(this.emailAddress,this.loginPassword)
    if (this.emailAddress === 'admin@prodapt.com') {
      if (this.loginPassword === 'Reset@123') {
        this.service.isAdminLogin = true;
        this.router.navigate(['/adminhome']);
      } else {
        Swal.fire('Error', 'Invalid admin login credentials', 'error');
      }
    }  else {
      // Subscribe to the observable returned by verifyEmailAndPassword
      this.eservice.verifyEmailAndPassword(this.emailAddress, this.loginPassword).subscribe((verificationResult) => {
          // Here, you can access the data emitted by the observable
          console.log(verificationResult.something); // Log the result to the console
          if (verificationResult.something === 'valid') {
            this.sessionservice.loginWithEmail(this.emailAddress);
            Swal.fire('Success', 'LoggedIn Successfully', 'success');
            this.service.isLogin = true;
            this.router.navigate(['/loginhome']);
          } else if (verificationResult === 'invalid') {
            Swal.fire('Error', 'Invalid login credentials', 'error');
          } else {
            Swal.fire('Error', 'Email does not exist in the database', 'error');
          }
        },
        (error) => {
          console.error('Error checking email and password:', error);
          Swal.fire('Error', 'An error occurred while logging in', 'error');
        }
      );
    }
  }
  
}
