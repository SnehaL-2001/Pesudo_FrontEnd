import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanserviceService } from 'src/app/planservice.service';
import { AdminService } from 'src/app/services/admin.service';
import { SessionService } from 'src/app/services/session.service';
import { Plan } from 'src/module/plan';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  planId: number;
  plan: Plan = {
    id: 0,
    name: '',
    planPrice: 0,
    data: '',
    calling:'',
    messagesPerDay: 0,
    validity: 0,
    features: [],
    category: ''
  };
  
  editForm: FormGroup;

  featureOptions: string[] = ['Hotstar', 'Netflix', 'Spotify', 'Extra 10GB Data', 'Extra 20GB Data'];// Define featureOptions here

  constructor(private sessionservice: SessionService, private adminservice: AdminService, private planservice: PlanserviceService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.planId = this.route.snapshot.params['id'];
    this.editForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      planPrice: [0, Validators.required],
      data: [{value:''}, Validators.required],
      calling:[{value:''},Validators.required],
      messagesPerDay: [0, Validators.required],
      validity: [0, Validators.required],
    });

    // Initialize the form controls for features based on the featureOptions
    this.featureOptions.forEach((feature, i) => {
      this.editForm.addControl(`feature${i}`, this.fb.control(false));
    });
  }
  
  ngOnInit() {
    this.adminservice.getPlan(this.planId).subscribe(
      (retrievedPlan: Plan) => {
        this.plan = retrievedPlan;

        // Set the values for "name" and "category" in the form with safe navigation
        this.editForm.get('name')?.setValue(this.plan?.name);
        this.editForm.get('category')?.setValue(this.plan?.category);
        this.editForm.get('planPrice')?.setValue(this.plan?.planPrice);
        this.editForm.get('data')?.setValue(this.plan?.data);
        this.editForm.get('calling')?.setValue(this.plan?.calling);
        this.editForm.get('messagesPerDay')?.setValue(this.plan?.messagesPerDay);
        this.editForm.get('validity')?.setValue(this.plan?.validity);
        
        // Set the form controls for features based on the plan's features
        this.plan.features.forEach((feature, i) => {
          this.editForm.get(`feature${i}`)?.setValue(true);
        });
      },
      (error) => {
        console.error('Error fetching plan:', error);
        // Handle error
      }
    );
  }

  onSubmit() {
    if (this.editForm.valid) {
      // Update the plan object with the form values
      this.plan = {
        ...this.plan,
        planPrice: this.editForm.value.planPrice,
        data: this.editForm.value.data,
        calling:this.editForm.value.calling,
        messagesPerDay: this.editForm.value.messagesPerDay,
        validity: this.editForm.value.validity,
      };
  
      // Clear and update the features array
      this.plan.features = this.featureOptions.filter((_, i) => this.editForm.get(`feature${i}`)?.value);

      // Send the updated plan to the server
      this.adminservice.updatePlan(this.plan).subscribe(
        (response) => {
          console.log('Plan updated successfully:', response);
          // Navigate back to the plan details page or perform other actions
          this.router.navigate(['/plan-details', this.plan.id]);
        },
        (error) => {
          console.error('Error updating plan:', error);
          // Handle error
        }
      );
    }
  }
}
