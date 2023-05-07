import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityDataGridComponent } from './capacity-data-grid.component';

describe('CapacityDataGridComponent', () => {
  let component: CapacityDataGridComponent;
  let fixture: ComponentFixture<CapacityDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityDataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
