import { Component } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css']
})
export class LogincomponentComponent {
  phoneNumber: string = '';
  

  constructor(public service:AuthserviceService,private eService:ServicesService,private router:Router){}
  requestOTP() {
    if (this.phoneNumber === '9876543210') {
      
      console.log("enter otp page")
      this.eService.mobile = this.phoneNumber;
      console.log(this.eService.mobile);
      this.router.navigate(['/login/loginotp']);
    } else if (this.phoneNumber) {
      this.eService.requestOTP(this.phoneNumber).subscribe(
        (response:any) => {
         
          console.log('OTP Requested Successfully', response);
          this.eService.mobile = this.phoneNumber;
          this.router.navigate(['/login/loginotp']);

        },
        (error) => {
        
          console.error('Failed to request OTP', error);
        }
      );
    } else {
      // Handle empty phone number (e.g., show an error message)
      console.error('Phone number is required');
    }
  }
}
