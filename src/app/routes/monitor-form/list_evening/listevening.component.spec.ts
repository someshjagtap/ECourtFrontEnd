import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeveningComponent } from './listevening.component';

describe('ListeveningComponent', () => {
  let component: ListeveningComponent;
  let fixture: ComponentFixture<ListeveningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeveningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeveningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
