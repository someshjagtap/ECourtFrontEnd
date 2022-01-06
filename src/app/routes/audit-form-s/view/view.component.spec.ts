import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: FormSViewComponent;
  let fixture: ComponentFixture<FormSViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
