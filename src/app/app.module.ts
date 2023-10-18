import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { RegisternewsimcomponentComponent } from './registernewsimcomponent/registernewsimcomponent.component';
import { AuthnavbarModule } from './authnavbar/authnavbar.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from './services/services.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginotpComponent } from './loginotp/loginotp.component';
import { LoginemailComponent } from './loginemail/loginemail.component';

import { AdminnavbarModule } from './adminnavbar/adminnavbar.module';
import { PlandetailsDirective } from './plandetails.directive';
import { ActivationComponent } from './activation/activation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LogincomponentComponent,
    RegisternewsimcomponentComponent,
    LoginotpComponent,
    LoginemailComponent,
    PlandetailsDirective,
    ActivationComponent,

   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthnavbarModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AdminnavbarModule
    
    
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
