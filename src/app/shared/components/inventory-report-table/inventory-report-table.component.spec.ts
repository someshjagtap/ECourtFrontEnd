import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReportTableComponent } from './inventory-report-table.component';

describe('InventoryReportTableComponent', () => {
  let component: InventoryReportTableComponent;
  let fixture: ComponentFixture<InventoryReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryReportTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
