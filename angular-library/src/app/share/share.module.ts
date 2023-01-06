import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const MODULES = [
  //   TreeViewModule,
  //   TooltipModule,
  //   LoadingIndicatorModule,
  //   AccordionModule,
  //   PopoverModule,
  //   HierarchyGridModule,
  //   MaterialIsoCodeModule,
  //   ProductDetailToolbarModule,
  //   ProductHierarchyFilterModule,
  //   SliderModule,
  //   DialogModule,
  CommonModule,
  //   GridDataModule
];

@NgModule({
  exports: [...MODULES],
})
export class SharedModule {}
