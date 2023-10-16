import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { HomeComponent } from './home/home.component';
import { RegisternewsimcomponentComponent } from './registernewsimcomponent/registernewsimcomponent.component';
import { AuthnavbarModule } from './authnavbar/authnavbar.module';
import { LoginotpComponent } from './loginotp/loginotp.component';
import { LoginemailComponent } from './loginemail/loginemail.component';
import { AdminnavbarModule } from './adminnavbar/adminnavbar.module';
import { NotificationComponent } from './authnavbar/notification/notification.component';

const routes: Routes = [{
  path:'login',
  component:LogincomponentComponent
},
{
  path:'register',
  component:RegisternewsimcomponentComponent
},
{
  path:'home',
  component:HomeComponent
},
{
  path:'loginemail',
  component:LoginemailComponent
},
{
  path:'notification',
  component:NotificationComponent
},
{
  path:'login/loginotp',
  component:LoginotpComponent
},
{
  path:'',
  component:HomeComponent
},
{
  path:'auth',
  loadChildren:()=>AuthnavbarModule
},{
  
    path:'admin',
    loadChildren:()=>AdminnavbarModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
