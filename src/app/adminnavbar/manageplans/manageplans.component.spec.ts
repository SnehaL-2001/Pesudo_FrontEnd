import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageplansComponent } from './manageplans.component';

describe('ManageplansComponent', () => {
  let component: ManageplansComponent;
  let fixture: ComponentFixture<ManageplansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageplansComponent]
    });
    fixture = TestBed.createComponent(ManageplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
