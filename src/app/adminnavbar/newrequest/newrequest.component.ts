import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Newsim } from 'src/module/newsim';
import { Plan } from 'src/module/plan';

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})
export class NewrequestComponent {
  users: any;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
    this.adminservice.getAllUsers().subscribe((data: Plan[]) => {
      this.users = data;
    });
  }

}
