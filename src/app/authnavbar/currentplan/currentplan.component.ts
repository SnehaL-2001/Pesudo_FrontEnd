import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-currentplan',
  templateUrl: './currentplan.component.html',
  styleUrls: ['./currentplan.component.css']
})
export class CurrentplanComponent {
  addingFunds: boolean = false;
  fundAmount: number = 0;
  phoneNumber:any;
  emailAddress:any;
  transactionDetails:any;
  planDetails:any;
  planName:any;
  currentDateTime = new Date();
  formattedDate: any;
  nextdayformat:any;
  nextDayDate:any;
  userDetails:any;
constructor(private sessionservice:SessionService,private userService:UserserviceService){
  this.phoneNumber=sessionStorage.getItem("phoneNumber");
  this.emailAddress=sessionStorage.getItem("emailAddress");
  console.log(this.phoneNumber);
  console.log(this.emailAddress);
  const datePipe = new DatePipe('en-US');
  this.nextDayDate = new Date(this.currentDateTime);
  this.nextDayDate.setDate(this.currentDateTime.getDate() + 1);
  this.nextDayDate.setHours(2, 30, 0, 0);
    this.formattedDate = datePipe.transform(this.nextDayDate, 'MMM dd, yyyy hh:mm a');
    this.nextDayDate = new Date(this.currentDateTime);
    this.nextDayDate.setDate(this.currentDateTime.getDate() + 1);
    this.nextDayDate.setHours(0, 0, 0, 0);
    

    
    this.nextdayformat = datePipe.transform(this.nextDayDate, 'MMM dd, yyyy hh:mm a');
}
ngOnInit() {
  this.retrieveUserDetails();
}
retrieveUserDetails() {
  if (this.phoneNumber) {
    this.userService.getUserDataByPhoneNumber(this.phoneNumber).subscribe(
      (userDetails) => {
        this.userDetails=userDetails;
        console.log(userDetails);
        this.retrieveTransactionDetails();
      },
      (error) => {
        console.error('Error fetching user details: ', error);
      });
  } else if (this.emailAddress) {
    this.userService.getUserDataByEmail(this.emailAddress).subscribe(
      (userDetails) => {
        this.userDetails=userDetails;
        console.log(userDetails);
        this.retrieveTransactionDetails();
      },
      (error) => {
        console.error('Error fetching user details: ', error);
      });
  }
}

  retrieveTransactionDetails() {
  if (this.phoneNumber) {
    this.userService.getTransactionByPhoneNumber(this.phoneNumber).subscribe(
      (data) => {
        this.transactionDetails = data;
        console.log(this.transactionDetails);
        this.planName = this.transactionDetails?.planName; // Retrieve planName
        this.retrievePlanDetails();
      },
      (error) => {
        console.error('Error fetching transaction details: ', error);
      }
    );
  } else if (this.emailAddress) {
    // Retrieve transaction details by emailAddress
    this.userService.getTransactionByEmail(this.emailAddress).subscribe(
      (data) => {
        this.transactionDetails = data;
        console.log(this.transactionDetails);
        this.planName = this.transactionDetails?.planName; // Retrieve planName
        this.retrievePlanDetails();
      },
      (error) => {
        console.error('Error fetching transaction details: ', error);
      }
    );
  }
}

// Retrieve plan details based on the planName
retrievePlanDetails() {
  if (this.planName) {
    this.userService.getPlanDetailsByName(this.planName).subscribe(
      (data) => {
        this.planDetails = data;
        console.log('User Details:',this.userDetails);
        console.log('Transaction Details:', this.transactionDetails);
        console.log('Plan Details:', this.planDetails);
      },
      (error) => {
        console.error('Error fetching plan details: ', error);
      }
    );
  }
}
addFunds() {
  const email = this.userDetails.emailAddress; 
  this.userDetails.wallet=this.userDetails.wallet+this.fundAmount;
  console.log(this.userDetails);
  this.userService.updateWalletBalance(email, this.userDetails).subscribe(response => {
  
    console.log('Wallet updated successfully:', response);
   
    this.fundAmount = 0;
    this.addingFunds = false;
  }, error => {
    
    console.error('Error updating wallet:', error);
  });
}
}
