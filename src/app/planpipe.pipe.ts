import { Pipe, PipeTransform } from '@angular/core';
import { Plan } from 'src/module/plan';

@Pipe({
  name: 'planpipe',
 
})
export class PlanpipePipe implements PipeTransform {

  transform(plans: any[], selectedCategory: string): any[] {
    if (selectedCategory === 'all') {
      return plans; // Return all plans if "All Categories" is selected
    } else {
      return plans.filter((plan) => plan.category === selectedCategory);
    }
  }
  }

