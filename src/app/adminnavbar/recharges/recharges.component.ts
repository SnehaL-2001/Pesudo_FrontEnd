import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-recharges',
  templateUrl: './recharges.component.html',
  styleUrls: ['./recharges.component.css']
})
export class RechargesComponent {
  plans: any;
  dtOptions: DataTables.Settings = {};

  constructor(private adminservice: AdminService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10, // Number of rows per page
      processing: true,
    };

    this.adminservice.getRechargedetails().subscribe((data: any) => {
      this.plans = data;
    });
  }
}
