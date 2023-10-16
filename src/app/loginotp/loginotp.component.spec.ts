import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginotpComponent } from './loginotp.component';

describe('LoginotpComponent', () => {
  let component: LoginotpComponent;
  let fixture: ComponentFixture<LoginotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginotpComponent]
    });
    fixture = TestBed.createComponent(LoginotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
