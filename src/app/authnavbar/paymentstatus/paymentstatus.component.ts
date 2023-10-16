import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from 'src/app/services/pdf.service';
import { SessionService } from 'src/app/services/session.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-paymentstatus',
  templateUrl: './paymentstatus.component.html',
  styleUrls: ['./paymentstatus.component.css']
})
export class PaymentstatusComponent {
  phoneNumber:any;
  emailAddress:any;
  transactionDetails:any;
constructor(private userService:UserserviceService,private sessionservice:SessionService,private route:ActivatedRoute,private pdfService: PdfService){

}
// ngOnInit(){
//   this.emailAddress=sessionStorage.getItem("emailAddress");
//   console.log(this.emailAddress);
//   this.route.paramMap.subscribe(params => {
//     this.phoneNumber = params.get('phoneNumber');
//     console.log(this.phoneNumber);})
//   if(this.emailAddress){
//   this.userService.getTransactionByEmail(this.emailAddress).subscribe(
//     (data) => {
//       // Handle the successful response here
//       this.transactionDetails = data;
//       console.log(this.transactionDetails);
//     },
//     (error) => {
//       // Handle any errors that occur during the request
//       console.error('Error fetching transaction details: ', error);
//     }
//   );
//   }
  
ngOnInit() {
  this.route.paramMap.subscribe((params) => {
    this.phoneNumber = params.get('phoneNumber');
    console.log(this.phoneNumber);

    if (this.phoneNumber) {
      this.userService.getTransactionByPhoneNumber(this.phoneNumber).subscribe(
        (data) => {
          this.transactionDetails = data;
          console.log(this.transactionDetails);
        },
        (error) => {
          console.error('Error fetching transaction details: ', error);
        }
      );
    }
  });
}
generatePdf(): void {
  if (this.transactionDetails) {
    this.pdfService.generatePdf(this.transactionDetails).subscribe(
      (pdfData) => {
        this.downloadPdf(pdfData);
      },
      (error) => {
        console.error('Error generating PDF: ', error);
      }
    );
  }
}

downloadPdf(pdfData: ArrayBuffer): void {
  this.pdfService.downloadPdf(pdfData);
}
}
