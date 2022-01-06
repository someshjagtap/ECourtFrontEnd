import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSComponent } from './form-s.component';

describe('FormSComponent', () => {
  let component: FormSComponent;
  let fixture: ComponentFixture<FormSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
