import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormAComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateFormAComponent;
  let fixture: ComponentFixture<CreateFormAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
