import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentplanComponent } from './currentplan.component';

describe('CurrentplanComponent', () => {
  let component: CurrentplanComponent;
  let fixture: ComponentFixture<CurrentplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentplanComponent]
    });
    fixture = TestBed.createComponent(CurrentplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
