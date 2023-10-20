import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminnavbarRoutingModule } from './adminnavbar-routing.module';

import { ManageplansComponent } from './manageplans/manageplans.component';
import { NewrequestComponent } from './newrequest/newrequest.component';
import { RechargesComponent } from './recharges/recharges.component';
import { AdminnavbarComponent } from './adminnavbar.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
   
    ManageplansComponent,
    NewrequestComponent,
    RechargesComponent,
    AdminnavbarComponent,
    HomeadminComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    AdminnavbarRoutingModule,ReactiveFormsModule,FormsModule,DataTablesModule
  ],exports:[AdminnavbarRoutingModule,AdminnavbarComponent]
})
export class AdminnavbarModule { }
