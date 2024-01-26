import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCreateComponent } from './actor-create.component';

describe('ActorCreateComponent', () => {
  let component: ActorCreateComponent;
  let fixture: ComponentFixture<ActorCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorCreateComponent]
    });
    fixture = TestBed.createComponent(ActorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
