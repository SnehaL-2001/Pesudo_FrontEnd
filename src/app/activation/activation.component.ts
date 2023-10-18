import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { Newsim } from 'src/module/newsim';
import { Transaction } from 'src/module/transaction';
import { ServicesService } from '../services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {
  paymentInfo: Transaction = {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    date: new Date(),
    invoiceID: '',
    nextPaymentDate: new Date(),
    emailAddress: '',
    paymentMethod: '',
    paymentMethodId: '',
    planName: 'starter pack',
    planPrice: 100,
    transactionId: '',
    rechargedId: '',
    wallet:0,
    paid:0
  };
  userDetails:any;
  paymentMethod:any;
  paymentMethodId:any;
  invoiceID: any;
  currentTime: Date;
  nextPaymentDate:Date=new Date();
  constructor(private route:ActivatedRoute,private userService:UserserviceService,private servservice:ServicesService){ this.currentTime = new Date();}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        // Use the UserService to retrieve user details
        this.userService.getUserDetailsByCode(code).subscribe(
          (data) => {
            this.userDetails = data; 
            console.log('User Details:', this.userDetails);
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
      }
    });
  }

  generateRandomTransactionId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const transactionId = 'TR-' + Array.from({ length: 22 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    return transactionId;
  }
  generateUniqueRechargedId(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');
    return `RID-${year}${month}${day}${hour}${minute}${second}`;
  }
  generateRandomInvoiceID() {
    const randomID = Math.floor(1000000000 + Math.random() * 9000000000);
    const randomCode = this.generateRandomCode();
    const invoiceID = `${randomCode}${randomID}`;
    return invoiceID;
  }

  generateRandomCode() {
    const codes = ['SN', 'AB', 'XY', 'ZZ'];
    const randomIndex = Math.floor(Math.random() * codes.length);
    return codes[randomIndex];
  }
  calculateNextPaymentDate() {
    const currentDate = new Date();
    const nextPaymentDate = new Date(currentDate.getTime() + 28 * 24 * 60 * 60 * 1000);
    
  }
  
 
  onSubmit() {
    this.paymentInfo.phoneNumber=this.userDetails.phoneNumber
    this.paymentInfo.firstName=this.userDetails.firstName
    this.paymentInfo.lastName=this.userDetails.lastName
    this.paymentInfo.date=this.currentTime
    this.paymentInfo.invoiceID=this.generateRandomInvoiceID();
    this.paymentInfo.nextPaymentDate=this.nextPaymentDate
    this.paymentInfo.emailAddress=this.userDetails.emailAddress
    this.paymentInfo.paymentMethod=this.paymentMethod
    this.paymentInfo.paymentMethodId=this.paymentMethodId
    this.paymentInfo.planName="Starter Pack"
    this.paymentInfo.planPrice=100
    this.paymentInfo.transactionId=this.generateRandomTransactionId();
    this.paymentInfo.rechargedId=this.generateUniqueRechargedId();
    console.log(this.paymentInfo);
    console.log(this.userDetails.activationCode)
    this.userService.activatesim(this.userDetails.activationCode).subscribe(
      (result) => {
        console.log(result)
        if (result.something === 'already-activated') {
          Swal.fire({
            icon: 'warning',
            title: 'SIM Already Activated',
            text: 'This SIM card is already activated.'
          });
        } else if (result.something === 'SIM activated successfully') {
          Swal.fire({
            icon: 'success',
            title: 'SIM Activation Successful',
            text: 'Your SIM card has been activated.'
          });
          this.servservice.transactionrecharge(this.paymentInfo).subscribe(
            () => {
              // Handle successful transaction recharge
            },
            (error) => {
              // Handle error in transaction recharge
            }
          );
          this.servservice.transactionrechargehistorysave(this.paymentInfo).subscribe(
            () => {
              // Handle successful transaction history save
            },
            (error) => {
              // Handle error in transaction history save
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'SIM Activation Failed',
            text: 'There was an error while activating your SIM card.'
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'SIM Activation Failed',
          text: 'There was an error while activating your SIM card.'
        });
      }
    );
  }
}