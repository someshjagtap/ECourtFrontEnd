import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexureABCViewComponent } from './view.component';

describe('HospitalViewComponent', () => {
  let component: AnnexureABCViewComponent;
  let fixture: ComponentFixture<AnnexureABCViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnexureABCViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexureABCViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
