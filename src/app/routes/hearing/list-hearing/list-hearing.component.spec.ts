import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHearingComponent } from './list-hearing.component';

describe('ListHearingComponent', () => {
  let component: ListHearingComponent;
  let fixture: ComponentFixture<ListHearingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHearingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
