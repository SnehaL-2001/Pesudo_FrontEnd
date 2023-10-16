import { Component,Input } from '@angular/core';
import { Plan } from 'src/module/plan';

@Component({
  selector: 'app-pricingcard',
  templateUrl: './pricingcard.component.html',
  styleUrls: ['./pricingcard.component.css']
})
export class PricingcardComponent {
    @Input() plan:any;
    constructor(){}
 
}
