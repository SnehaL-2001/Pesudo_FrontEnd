import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ServicesService } from 'src/app/services/services.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Transaction } from 'src/module/transaction';
import { TransactionHistory } from 'src/module/transactionHistory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})
export class PaymentgatewayComponent {
  plantransaction:Transaction={
    phoneNumber:'',
    firstName:'',
    lastName:'',
    date:new Date(),
  invoiceID:'',
  nextPaymentDate:new Date(),
  emailAddress:'',
  paymentMethod:'',
  paymentMethodId:'',
  planName:'',
  planPrice:0,
  transactionId:'',
  rechargedId:'',
  wallet:0,
  paid:0
  };
  plantransactionHistory:TransactionHistory={
  planrechargedId:'',
    phoneNumber:'',
    firstName:'',
    lastName:'',
    date:new Date(),
  invoiceID:'',
  nextPaymentDate:new Date(),
  emailAddress:'',
  paymentMethod:'',
  paymentMethodId:'',
  planName:'',
  planPrice:0,
  transactionId:'',
  rechargedId:'',
  wallet:0,
  paid:0
  };
  email: any;
  message:any;
  useWalletBalance: boolean = false;
  planId: any;
  creditno: any;
  users: any;
  currentTime: Date;
  plandetail: any;
  paymentMethod: string = 'creditCard';
  mobilePaymentDetails: { upiId: string, phoneNumber: string } = { upiId: '', phoneNumber: '' };
  paymentMobileField: string = 'upiId';
  invoiceID: any;
  phoneNumber: any;
  nextPaymentDate: Date = new Date();
  mobile: any;
  emailAddress: any;
  paymentMethodId: any;
  upiId: any;
  initialWalletBalance: number = 0;
  totalWithWallet: number = 0;
   usedWallet:number=0;
   remainingWallet:number=0;
   isWalletSufficient: boolean = false;

  constructor(private eservice: AdminService, private route: ActivatedRoute,private router:Router,private userService:UserserviceService,private servservice:ServicesService) {
    this.currentTime = new Date();
    this.generateRandomInvoiceID();
    this.updatePaymentMethod();
    console.log(this.paymentMethod)
   
  }

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
    console.log('Selected Payment Method:', this.paymentMethod);
    if (this.paymentMethod === 'creditCard') {
      console.log('Credit Card Number:', this.creditno);
    }
  }
  updatePaymentMethod() {
    if (this.useWalletBalance) {
      if (this.initialWalletBalance >= this.plandetail.planPrice) {
        this.paymentMethod = 'wallet';
      } else {
        if (this.paymentMethod === 'creditCard') {
          this.paymentMethod = 'creditCard,wallet';
        } else if (this.paymentMethod === 'mobilePayment') {
          this.paymentMethod = 'mobilePayment,wallet';
        }
      }
    } else {
      this.paymentMethod = this.paymentMethod; 
    }
  }
  
  switchMobilePaymentField(field: string) {
    this.paymentMobileField = field;
  }

  processMobilePayment() {
    if (this.paymentMobileField === 'upiId') {
      console.log('Processing Mobile Payment with UPI ID:', this.mobilePaymentDetails.upiId);
    } else {
      console.log('Processing Mobile Payment with Phone Number:', this.mobilePaymentDetails.phoneNumber);
    }
  }

  
  generateRandomInvoiceID() {
    const randomID = Math.floor(1000000000 + Math.random() * 9000000000);
    const randomCode = this.generateRandomCode();
    this.invoiceID = `${randomCode}${randomID}`;
  }

  generateRandomCode() {
    const codes = ['SN', 'AB', 'XY', 'ZZ'];
    const randomIndex = Math.floor(Math.random() * codes.length);
    return codes[randomIndex];
  }

  
  calculateNextPaymentDate() {
    const currentDate = new Date();
    const nextPaymentDate = new Date(currentDate.getTime() + this.plandetail.validity * 24 * 60 * 60 * 1000);
    this.nextPaymentDate = nextPaymentDate;
    this.plantransaction.date=this.currentTime
    this.plantransaction.invoiceID=this.invoiceID
    this.plantransaction
  }

  ngOnInit() {
    this.remainingWallet = this.initialWalletBalance;
    this.route.params.subscribe((params) => {
      this.planId = params['id'];
      this.phoneNumber=params['mobile'];
      console.log(this.planId);
      this.eservice.getPlan(this.planId).subscribe((planDetails) => {
        this.plandetail = planDetails;
        console.log('Plan Details:', planDetails);
        this.calculateNextPaymentDate();
      });
    });
    this.mobile =sessionStorage.getItem("phoneNumber");
    
    this.email = sessionStorage.getItem("emailAddress");
    console.log(this.email);
    console.log(this.mobile);
    // this.userService.getUserData().subscribe((data: Newsim[]) => {
    //   this.users = data;
    //   console.log(this.users);
    // });

    // Determine whether the user logged in with email or phone number
    if (this.email) {
      this.userService.getUserDataByEmail(this.email).subscribe((data) => {
        this.users = data;
        this.initialWalletBalance = this.users.wallet;
        this.updateTotalPrice();
      });
    } else if (this.mobile) {
      this.userService.getUserDataByPhoneNumber(this.mobile).subscribe((data) => {
        this.users = data;
        this.initialWalletBalance = this.users.wallet;
        this.updateTotalPrice();
      });
    }
  }
 
  updateTotalPrice() {
    const usedWallet = this.useWalletBalance ? Math.min(this.initialWalletBalance, this.plandetail.planPrice) : 0;
    this.usedWallet = usedWallet; // Store the used wallet amount
    this.remainingWallet = this.initialWalletBalance - usedWallet;
    console.log(this.remainingWallet);
    this.plantransaction.wallet = usedWallet;
    this.plantransaction.paid = this.plandetail.planPrice - usedWallet;
    if (this.plantransaction.paid < 0) {
      this.plantransaction.paid = 0;
    }
    this.totalWithWallet = this.plantransaction.paid;
    console.log('Used Wallet Amount:', usedWallet);
    console.log('Remaining Wallet Balance:', this.remainingWallet);
    console.log('Paid Amount:', this.plantransaction.paid);
    
    
    this.isWalletSufficient = usedWallet >= this.plandetail.planPrice;
  }
  
  generateRandomTransactionId(): string {
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const transactionId = 'TR-' + Array.from({ length: 22 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    return transactionId;
  }
  generateUniqueRechargedId(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');
    return `RID-${year}${month}${day}${hour}${minute}${second}`;
  }
  
  saveTransaction() {
    if (this.paymentMethod === 'creditCard' && this.creditno) {
      
      this.paymentMethodId = this.creditno; }
      else{
      if (this.paymentMethod === 'mobilePayment' && this.upiId) {
          
          this.paymentMethodId = this.upiId;
      }
    }
    this.updatePaymentMethod();

    this.plantransaction.phoneNumber=this.phoneNumber
    this.plantransaction.firstName=this.users.firstName
    this.plantransaction.lastName=this.users.lastName
this.plantransaction.date=this.currentTime
this.plantransaction.invoiceID=this.invoiceID
this.plantransaction.nextPaymentDate=this.nextPaymentDate
this.plantransaction.emailAddress=this.users.emailAddress
this.plantransaction.paymentMethod=this.paymentMethod
this.plantransaction.paymentMethodId=this.paymentMethodId
this.plantransaction.planName=this.plandetail.name
this.plantransaction.planPrice=this.plandetail.planPrice
this.plantransaction.transactionId=this.generateRandomTransactionId();
this.plantransaction.rechargedId=this.generateUniqueRechargedId();



console.log(this.plantransaction);
          this.users.wallet=this.remainingWallet;
          console.log(this.users)
  
          this.servservice.updatestatus(this.phoneNumber).subscribe();
          this.userService.updateWalletBalance(this.users.emailAddress, this.users).subscribe();
                    this.servservice.transactionrecharge(this.plantransaction).subscribe(() => {
           
                      this.servservice.generateBill(this.plantransaction.emailAddress).subscribe((response: Map<string, string>) => {
                        console.log('Response:', response);
                         this.message = response.get('message');
                    
                        if (this.message.includes('successfully')) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: this.message,
                          });
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: this.message,
                          });
                        }
                    
                        // Handle the response message and navigate to the desired route if needed
                        if (this.message.includes('successfully')) {
                          this.router.navigate(["/paymentstatus", this.plantransaction.phoneNumber]);
                        }
                    });
                      
          this.servservice.transactionrechargehistorysave(this.plantransaction).subscribe();
         
           this.router.navigate(["/paymentstatus",this.plantransaction.phoneNumber]);
  })
}
}
