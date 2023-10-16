import { Component, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent {

  mobile: any;
  emailAddress: any;
  users: any;

  constructor(private sessionservice: SessionService, private userService: UserserviceService) {
   console.log(sessionservice.getEmail())
   sessionStorage.getItem("emailAddress");
  }

 
  ngOnInit() {
    this.mobile =sessionStorage.getItem("phoneNumber");
    
    this.emailAddress = sessionStorage.getItem("emailAddress");
    console.log(this.emailAddress);
    console.log(this.mobile);
    // this.userService.getUserData().subscribe((data: Newsim[]) => {
    //   this.users = data;
    //   console.log(this.users);
    // });

    // Determine whether the user logged in with email or phone number
    if (this.emailAddress) {
      // User logged in with email, fetch user data by email
      this.userService.getUserDataByEmail(this.emailAddress).subscribe((data) => {
        
          this.users=data;
          console.log(data);
        },
        (error) => {
         
          console.error(error);
        }
      );
    } else if (this.mobile) {
      // User logged in with phone number, fetch user data by phone number
      this.userService.getUserDataByPhoneNumber(this.mobile).subscribe((data) => {
        this.users = data;
        console.log(data);
      });
    }
}
}