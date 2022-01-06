import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexureABCListComponent } from './list.component';

describe('HospitalListComponent', () => {
  let component: AnnexureABCListComponent;
  let fixture: ComponentFixture<AnnexureABCListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnexureABCListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexureABCListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
