import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyGridComponent } from './hierarchy-grid.component';

describe('HierarchyGridComponent', () => {
  let component: HierarchyGridComponent;
  let fixture: ComponentFixture<HierarchyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
