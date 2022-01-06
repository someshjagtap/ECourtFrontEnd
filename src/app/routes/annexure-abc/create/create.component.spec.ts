import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnexureABCComponent } from './create.component';

describe('HospitalCreateComponent', () => {
  let component: CreateAnnexureABCComponent;
  let fixture: ComponentFixture<CreateAnnexureABCComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnnexureABCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnnexureABCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
