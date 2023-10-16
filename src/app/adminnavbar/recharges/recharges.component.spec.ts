import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargesComponent } from './recharges.component';

describe('RechargesComponent', () => {
  let component: RechargesComponent;
  let fixture: ComponentFixture<RechargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargesComponent]
    });
    fixture = TestBed.createComponent(RechargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
