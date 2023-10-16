import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plan'
})
export class PlanPipe implements PipeTransform {

  transform(filteredPlans: any[], selectedCategory: string): any[] {
    if (selectedCategory === 'all') {
      return filteredPlans; // Return all plans if 'all' is selected
    } else {
      return filteredPlans.filter((plan) => plan.category === selectedCategory);
    }
  }

}
