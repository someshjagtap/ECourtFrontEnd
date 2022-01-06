import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSListComponent } from './list.component';

describe('SupplierListComponent', () => {
  let component: FormSListComponent;
  let fixture: ComponentFixture<FormSListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
