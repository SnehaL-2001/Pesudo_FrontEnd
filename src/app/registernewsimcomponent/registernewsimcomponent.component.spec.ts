import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisternewsimcomponentComponent } from './registernewsimcomponent.component';

describe('RegisternewsimcomponentComponent', () => {
  let component: RegisternewsimcomponentComponent;
  let fixture: ComponentFixture<RegisternewsimcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisternewsimcomponentComponent]
    });
    fixture = TestBed.createComponent(RegisternewsimcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
