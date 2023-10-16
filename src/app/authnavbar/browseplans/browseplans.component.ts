import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Plan } from 'src/module/plan';

@Component({
  selector: 'app-browseplans',
  templateUrl: './browseplans.component.html',
  styleUrls: ['./browseplans.component.css']
})
export class BrowseplansComponent {
  pricingPlans: any[] = [];
  filteredPlan:any[]=[];
  searchPrice: any;
  mobile: any;
  selectedCategory: string = 'all';
  categoryOptions: string[] = ['Monthly Basic Plan', 'Monthly Premium Plan', 'Yearly Basic Plan', 'Yearly Premium Plan'];
  emailAddress:any;
  constructor(public sessionservice:SessionService, private userservice:UserserviceService){
    this.mobile = sessionStorage.getItem('phoneNumber');
    console.log(this.mobile);
    this.emailAddress=sessionStorage.getItem('emailAddress');
    console.log(this.emailAddress);

  }
  ngOnInit() {
    this.fetchPricingPlans();
  }

  fetchPricingPlans() {
    this.userservice.getPlans().subscribe((plans) => {
      this.pricingPlans = plans;
    });
  }

    searchPlans() {
      console.log(this.searchPrice)
      if (!this.searchPrice) {
        // If the search input is empty, fetch all plans
        this.fetchPricingPlans();
      } else {
        // Filter plans based on the entered price
        this.userservice.searchPlansByPrice(this.searchPrice).subscribe((filteredPlans) => {
          this.filteredPlan = filteredPlans;
          console.log(this.pricingPlans);
          
        });
      }
    }
  
    clearSearch() {
      // Clear the search query when a new category is selected
      this.filteredPlan = [];
      this.searchPrice = '';
    }
  }
 
