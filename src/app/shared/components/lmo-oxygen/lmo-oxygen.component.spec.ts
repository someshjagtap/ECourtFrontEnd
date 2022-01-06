import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmoOxygenComponent } from './lmo-oxygen.component';

describe('LmoOxygenComponent', () => {
  let component: LmoOxygenComponent;
  let fixture: ComponentFixture<LmoOxygenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmoOxygenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmoOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
