import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateeveningComponent } from './createevening.component';

describe('CreateeveningComponent', () => {
  let component: CreateeveningComponent;
  let fixture: ComponentFixture<CreateeveningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateeveningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateeveningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
