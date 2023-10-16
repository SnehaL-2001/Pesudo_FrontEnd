import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  notifications:any[]=[

    {

      id: 1,

      title: 'New Message',

      message: 'Your Plan Expire within 2 days',

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
 constructor(){
  console.log(this.notifications.length);
 }
}