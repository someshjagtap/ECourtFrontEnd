import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSCreateComponent } from './create.component';

describe('SupplierCreateComponent', () => {
  let component: FormSCreateComponent;
  let fixture: ComponentFixture<FormSCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
