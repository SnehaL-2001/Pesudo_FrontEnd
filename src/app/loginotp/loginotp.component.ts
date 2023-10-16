import { Component,Renderer2, ElementRef, AfterViewInit} from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-loginotp',
  templateUrl: './loginotp.component.html',
  styleUrls: ['./loginotp.component.css']
})
export class LoginotpComponent {
  
  constructor(public eservice:ServicesService,  public service:AuthserviceService,private renderer: Renderer2, private el: ElementRef,private router:Router,public sessionservice:SessionService){}
  
  ngAfterViewInit() {
    this.OTPInput();
  }

  OTPInput() {
    const inputs = this.el.nativeElement.querySelectorAll("#otp > *[id]");
  
    for (let i = 0; i < inputs.length; i++) {
      this.renderer.listen(inputs[i], 'keydown', (event) => {
        if (event.key === "Backspace") {
          (inputs[i] as HTMLInputElement).value = "";
          if (i !== 0) (inputs[i - 1] as HTMLInputElement).focus();
        } else {
          if (i === inputs.length - 1 && (inputs[i] as HTMLInputElement).value !== "") {
            // Add this line
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            (inputs[i] as HTMLInputElement).value = event.key;
            if (i !== inputs.length - 1) (inputs[i + 1] as HTMLInputElement).focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            (inputs[i] as HTMLInputElement).value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1) (inputs[i + 1] as HTMLInputElement).focus();
            event.preventDefault();
          }
        }
      });
    }
  }
  mobile: string='';
  verifyOTP() {
    const enteredOTP = this.getEnteredOTP();
    this.mobile = this.eservice.mobile;
    if (!enteredOTP) {
      this.showInvalidOTPPopup();
      return;
    }

    // For testing purposes, you can check if the entered OTP is '123456'
    if (enteredOTP === '123456' && this.mobile==='9876543210')
     {
      this.sessionservice.loginWithPhoneNumber(this.mobile);
      this.service.isLogin = true;
      // this.sessionservice.setItem('isLogin', true);
      this.redirectToLoginHome();
      this.showSuccessOTPPopup();
    } else {
      // If it's not '123456', then send a request to the backend for validation
      this.eservice.validateOTP(this.mobile, enteredOTP).subscribe(
        (isValid) => {
          if (isValid) {
            this.sessionservice.loginWithPhoneNumber(this.mobile);
            this.service.isLogin = true;
            console.log(sessionStorage.getItem("phoneNumber"));
           
            // this.router.navigate(['/loginhome'])
           
            this.redirectToLoginHome();
            this.showSuccessOTPPopup();
          } else {
            this.showInvalidOTPPopup();
          }
        },
        (error) => {
          console.error('Error validating OTP:', error);
          this.showInvalidOTPPopup();
        }
      );
    }
  }

  getEnteredOTP(): string {
    // Implement a function to retrieve the entered OTP from the input fields
    // Concatenate the values of all input fields to get the complete OTP
    return (
      (document.getElementById('first') as HTMLInputElement).value +
      (document.getElementById('second') as HTMLInputElement).value +
      (document.getElementById('third') as HTMLInputElement).value +
      (document.getElementById('fourth') as HTMLInputElement).value +
      (document.getElementById('fifth') as HTMLInputElement).value +
      (document.getElementById('sixth') as HTMLInputElement).value
    );
  }
  showSuccessOTPPopup() {
    Swal.fire({
      icon: 'success',
      title: 'OTP Verified',
      text: 'You have successfully verified your OTP.',
      confirmButtonColor: '#28a745'
    });
  }

  redirectToLoginHome() {
    // Redirect to the loginhome page using Angular router
    // Replace 'routerLink' with the actual route
    this.router.navigate(['/loginhome']);

    // this.router.navigate(['/loginhome']);
  }

  showInvalidOTPPopup() {
    Swal.fire({
      icon: 'error',
      title: 'Invalid OTP',
      text: 'Please enter a valid OTP.',
      confirmButtonColor: '#d33'
    });
  }

}
