import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshComponent } from './fresh.component';

describe('FreshComponent', () => {
  let component: FreshComponent;
  let fixture: ComponentFixture<FreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreshComponent]
    });
    fixture = TestBed.createComponent(FreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
