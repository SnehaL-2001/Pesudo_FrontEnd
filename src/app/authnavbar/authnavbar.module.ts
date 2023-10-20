import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthnavbarRoutingModule } from './authnavbar-routing.module';
import { AuthnavbarComponent } from './authnavbar.component';
import { BrowseplansComponent } from './browseplans/browseplans.component';
import { FronthomeComponent } from './fronthome/fronthome.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PricingcardComponent } from './pricingcard/pricingcard.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { AccountcardComponent } from './accountcard/accountcard.component';
import { CurrentplanComponent } from './currentplan/currentplan.component';
import { NotificationComponent } from './notification/notification.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { PlanPipe } from './plan.pipe';
import { PaymentstatusComponent } from './paymentstatus/paymentstatus.component';
import { RechargehistoryComponent } from './rechargehistory/rechargehistory.component';
import { DataTablesModule } from 'angular-datatables';




@NgModule({
  declarations: [
    AuthnavbarComponent,
    BrowseplansComponent,
    FronthomeComponent,
    MyaccountComponent,
    PricingcardComponent,
    AccountcardComponent,
  AccountdetailsComponent,
  CurrentplanComponent,
  NotificationComponent,
  PaymentComponent,
  PaymentgatewayComponent,
  PlanPipe,
  PaymentstatusComponent,
  RechargehistoryComponent

  ],
  imports: [
    CommonModule,
    AuthnavbarRoutingModule,FormsModule,DataTablesModule

  ], exports:[AuthnavbarRoutingModule,AuthnavbarComponent,MyaccountComponent],
})
export class AuthnavbarModule { }
