import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ServicesService } from 'src/app/services/services.service';
import { SessionService } from 'src/app/services/session.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Plan } from 'src/module/plan';
import { Recharge } from 'src/module/recharge';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  mobile: any; // Define the mobile property
  emailAddress:any;
  planId:any;
  plandetail:any;
  currentTime: Date;
  users:any;

  constructor(private router:Router,private route: ActivatedRoute,private eservice:AdminService,public service: AuthserviceService, public sessionService: SessionService,public userservice:UserserviceService) {
    this.currentTime = new Date();

    this.mobile = sessionStorage.getItem('phoneNumber');
    // console.log(this.mobile);
  this.emailAddress=sessionStorage.getItem('emailAddress');
  console.log(this.emailAddress);
  
  }

   
  
  ngOnInit():void{
    console.log(this.mobile);
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  
    this.route.params.subscribe((params) => {

      this.planId = params['id'];
      
      console.log(this.planId);
      this.eservice.getPlan(this.planId).subscribe((planDetails) => {
        // Assuming you get plan details in the response
        this.plandetail=planDetails;
        console.log('Plan Details:', planDetails);});


  });  if (this.mobile === null && this.emailAddress !== null) {
    this.userservice.getUserDataByEmail(this.emailAddress).subscribe((data) => {
        
      this.users=data;
      this.mobile=this.users.phoneNumber;
      console.log(this.mobile);
      console.log(data);
    },
    (error) => {
     
      console.error(error);
    }
  );}

}

  payNow(plandetail: Plan) {
    const url = `/paymentgateway/${plandetail.id}/${this.mobile}`;
    // Implement your payment processing logic here
    // You can connect to a payment gateway or perform any desired payment processing steps
    console.log('Processing recharge for:', plandetail);
    this.router.navigate([url]);
  }
}