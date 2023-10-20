import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { SessionService } from 'src/app/services/session.service';
import { Plan } from 'src/module/plan';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  categoryOptions: string[] = ['Monthly Basic Plan', 'Monthly Premium Plan', 'Yearly Basic Plan', 'Yearly Premium Plan'];
  featureOptions: string[] = ['Hotstar', 'Netflix', 'Spotify', 'Extra 10GB Data', 'Extra 20GB Data','Amazon Prime','Zee5'];
  selectedFeatures: string[] = [];

  plan: Plan = {
    id: 0,
    name: '',
    planPrice: 0,
    data: '',
    calling:'',
    messagesPerDay: 0,
    validity: 0,
    features: new Array(this.featureOptions.length).fill(false),
    category: ''
  };
  updateSelectedFeatures(event: any, index: number) {
    this.plan.features[index] = event.target.checked;
  }
  getSelectedFeatures() {
    return this.featureOptions
      .filter((_, i) => this.plan.features[i])
      .map((feature, i) => this.plan.features[i] ? feature : '')
      .filter(Boolean) // Remove empty strings
      .join(', ');
  }
  
  constructor(private sessionservice:SessionService,private adminservice:AdminService){
    // console.log(this.featureOptions);
    // console.log(this.plan.features);
    // this.plan.features=this.featureOptions;
    console.log(sessionStorage.getItem("emailAddress"))
    this.plan.features = new Array(this.featureOptions.length).fill(false);
  }

  
  
 
  maxFeaturesCount: number = 5;

  onSelectFeature(feature: string) {
    if (this.plan.features.includes(feature)) {
      // Remove the feature if already selected
      this.plan.features = this.plan.features.filter((f) => f !== feature);
    } else if (this.plan.features.length < this.maxFeaturesCount) {
      // Add the feature if the limit is not reached
      this.plan.features.push(feature);
    }
  }

  isFeatureSelected(feature: string): boolean {
    return this.plan.features.includes(feature);
  }

  onSubmit() {
    // Filter out the selected features
    const selectedFeatures = this.featureOptions.filter((_, i) => this.plan.features[i]);
  
    // Assign the selected features to the plan
    this.plan.features = selectedFeatures;
  
    console.log(this.plan);
  
    this.adminservice.addPlan(this.plan).subscribe(
      (response) => {
        console.log('Plan added successfully:', response);
        // Reset the form or perform any other necessary actions
      },
      (error) => {
        console.error('Error adding plan:', error);
      }
    );
  }
  

    
    // this.http.post('/api/plans', this.plan).subscribe(
    //   (response) => {
    //     console.log('Plan added successfully:', response);
    //   },
    //   (error) => {
    //     console.error('Error adding plan:', error);
    //   }
    // );
  }

