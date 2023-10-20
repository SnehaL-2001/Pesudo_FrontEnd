import { Component, Input } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  phoneNumber: any;
  emailAddress: any;
  transactionDetails: any;
  notifications: any[] = [
    {
      id: 1,
      title: 'New Message',
      message: '',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      title: 'Recharge with AmazonPAY',
      message: 'Get 20% off on your next recharge',
      timestamp: new Date(),
      read: false
    },
  ];

  get notificationCount(): number {
    return this.notifications.length;
  }

  constructor(private userService: UserserviceService) {
    this.phoneNumber = sessionStorage.getItem('phoneNumber');
    this.emailAddress = sessionStorage.getItem('emailAddress');
    console.log(this.phoneNumber);
    console.log(this.emailAddress);
  }

  ngOnInit() {
    if (this.phoneNumber) {
      this.userService.getTransactionByPhoneNumber(this.phoneNumber).subscribe(
        (data) => {
          this.transactionDetails = data;
          console.log(this.transactionDetails);

          // Calculate days until next payment
          this.calculateDaysUntilNextPayment();
        },
        (error) => {
          console.error('Error fetching transaction details: ', error);
        }
      );
    } else if (this.emailAddress) {
      this.userService.getTransactionByEmail(this.emailAddress).subscribe(
        (data) => {
          this.transactionDetails = data;
          console.log(this.transactionDetails);

          // Calculate days until next payment
          this.calculateDaysUntilNextPayment();
        },
        (error) => {
          console.error('Error fetching transaction details: ', error);
        }
      );
    }
  }

  calculateDaysUntilNextPayment() {
    if (this.transactionDetails && this.transactionDetails.nextPaymentDate) {
      const nextPaymentDate = new Date(this.transactionDetails.nextPaymentDate);
      const currentDate = new Date();
      const timeDifference = nextPaymentDate.getTime() - currentDate.getTime();
      const daysUntilNextPayment = Math.ceil(timeDifference / (1000 * 3600 * 24));

      // Update the message property dynamically
      this.notifications[0].message = `Your Plan Expires in ${daysUntilNextPayment} day(s)`;
      console.log('Days until next payment: ', daysUntilNextPayment);
    }
  }
}
