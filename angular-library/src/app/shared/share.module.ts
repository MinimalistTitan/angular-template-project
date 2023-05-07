import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HierarchyGridModule } from './hierarchy-grid/hierarchy-grid.module';
import { ProductHierarchyFilterModule } from './product-hierarchy-filter/product-hierarchy-filter.module';
import { TreeViewModule } from './tree-view/tree-view.module';
import { MaterialIsoCodeModule } from './material-iso-code/material-iso-code.module';
import { PopoverModule } from './popover/popover.module';
import { ProductDetailToolbarModule } from './product-detail-toolbar/product-detail-toolbar.component.module';
import { DialogModule } from './dialog/dialog.module';

const MODULES = [
  TreeViewModule,
  //TooltipModule,
  //LoadingIndicatorModule,
  //AccordionModule,
  PopoverModule,
  HierarchyGridModule,
  MaterialIsoCodeModule,
  ProductDetailToolbarModule,
  ProductHierarchyFilterModule,
  //SliderModule,
  DialogModule,
  CommonModule,
  
];

@NgModule({
  exports: [...MODULES]
})
export class SharedModule {}
