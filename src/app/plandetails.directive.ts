import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appPlandetails]'
})
export class PlandetailsDirective {

  @Input() appCategoryFilter: any;
  @Output() appCategoryFilterChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.appCategoryFilter = value;
    this.appCategoryFilterChange.emit(value);
  }
}


