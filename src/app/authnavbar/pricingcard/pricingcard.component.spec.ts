import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingcardComponent } from './pricingcard.component';

describe('PricingcardComponent', () => {
  let component: PricingcardComponent;
  let fixture: ComponentFixture<PricingcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingcardComponent]
    });
    fixture = TestBed.createComponent(PricingcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
