import { Component } from '@angular/core';
import { AuthserviceService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PesudoFulFillment';
  constructor(public authService:AuthserviceService){}
  get userIsAuthenticated(){
    return this.authService.isAuthenticated();

  }
  logout()
  {
    this.authService.logout();
  }
}
