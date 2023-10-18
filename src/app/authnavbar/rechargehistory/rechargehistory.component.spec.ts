import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargehistoryComponent } from './rechargehistory.component';

describe('RechargehistoryComponent', () => {
  let component: RechargehistoryComponent;
  let fixture: ComponentFixture<RechargehistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargehistoryComponent]
    });
    fixture = TestBed.createComponent(RechargehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
