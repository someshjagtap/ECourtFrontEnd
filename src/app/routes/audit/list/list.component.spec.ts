import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierListComponent } from './list.component';

describe('SupplierListComponent', () => {
  let component: SupplierListComponent;
  let fixture: ComponentFixture<SupplierListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
