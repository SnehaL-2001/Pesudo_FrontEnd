import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Newsim } from 'src/module/newsim';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registernewsimcomponent',
  templateUrl: './registernewsimcomponent.component.html',
  styleUrls: ['./registernewsimcomponent.component.css'],

  

})
export class RegisternewsimcomponentComponent {
  errorMessage:string='';
  user: Newsim = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    emailAddress: '',
    address: '',
    location:'',
    loginPassword:'',
    phoneNumber:'',
    status:'inactive',
    simNumber:'',
    activationCode:'',
    simStatus:'inactive',
    wallet:0
   
  }; 
 
constructor(public eService:ServicesService){}
  onSubmit() {
    
    console.log(this.user);
    const { emailAddress, firstName } = this.user;
    
  
    this.eService.sendMail(emailAddress, firstName).subscribe((res) => {
      this.user.phoneNumber = res.phoneNumber
      this.user.simNumber=res.simCardNumber
      this.user.activationCode=res.activationCode
      console.log(res)
      console.log(res.phoneNumber)
      const result = this.eService.registerNewSim(this.user).subscribe();
      Swal.fire({
        icon: 'success',
        title: 'Registration Done, Check mail for further information'
      });
    });
   
  }
}

