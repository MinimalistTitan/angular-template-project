
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchyGridComponent } from './hierarchy-grid.component';
import { MatTableModule } from '@angular/material/table';
import { HierarchyGridCellDirective } from './hierarchy-grid-cell.directive';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [
    HierarchyGridComponent,
    HierarchyGridCellDirective,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    ScrollingModule,
    TableVirtualScrollModule,
    PipeModule,
    MatTooltipModule
  ],
  exports: [
    HierarchyGridComponent,
    HierarchyGridCellDirective,
    MatIconModule,
  ]
})
export class HierarchyGridModule {}
