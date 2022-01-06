import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxygenUseComponent } from './oxygen-use.component';

describe('OxygenUseComponent', () => {
  let component: OxygenUseComponent;
  let fixture: ComponentFixture<OxygenUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxygenUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxygenUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
