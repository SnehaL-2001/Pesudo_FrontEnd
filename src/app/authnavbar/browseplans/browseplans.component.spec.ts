import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseplansComponent } from './browseplans.component';

describe('BrowseplansComponent', () => {
  let component: BrowseplansComponent;
  let fixture: ComponentFixture<BrowseplansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseplansComponent]
    });
    fixture = TestBed.createComponent(BrowseplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
