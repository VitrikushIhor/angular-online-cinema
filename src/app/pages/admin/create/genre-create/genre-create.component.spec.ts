import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCreateComponent } from './genre-create.component';

describe('GenreCreateComponent', () => {
  let component: GenreCreateComponent;
  let fixture: ComponentFixture<GenreCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreCreateComponent]
    });
    fixture = TestBed.createComponent(GenreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
