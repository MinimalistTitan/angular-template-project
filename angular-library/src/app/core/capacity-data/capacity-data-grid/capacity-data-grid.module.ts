import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityDataGridComponent } from './capacity-data-grid.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CapacityDataGridComponent],
  imports: [
    CommonModule,
    //HierarchyGridModule,
    MatButtonModule,
    //LoadingIndicatorModule,
    //PopoverModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [CapacityDataGridComponent],
})
export class CapacityDataGridModule {}