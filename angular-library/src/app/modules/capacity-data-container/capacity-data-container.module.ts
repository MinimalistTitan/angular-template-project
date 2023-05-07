import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CapacityDataGridModule } from 'src/app/core/capacity-data/capacity-data-grid/capacity-data-grid.module';
import { CapacityDataService } from 'src/app/core/capacity-data/capacity-data.service';
import { HierarchyGridModule } from 'src/app/share/hierarchy-grid/hierarchy-grid.module';
import { SharedModule } from 'src/app/share/share.module';
import { CapacityDataContainerComponent } from './capacity-data-container.component';
import { Accordion2Module } from 'src/app/share/accordion/accordion2.module';
import { MaterialIsoCodeModule } from 'src/app/share/material-iso-code/material-iso-code.module';
import { CommonCapacityDataModule } from 'src/app/core/capacity-data/capacity-data-accordion/accordion/common-capacity-data.module';
import { CapacityDataAccordionService } from 'src/app/core/capacity-data/capacity-data-accordion/capacity-data-accordion.service';

@NgModule({
  declarations: [
    CapacityDataContainerComponent
  ],
  imports: [
    MatExpansionModule,
    SharedModule,
    HierarchyGridModule,
    CapacityDataGridModule,
    MaterialIsoCodeModule,
    CommonCapacityDataModule,
    Accordion2Module    
  ],
  providers: [
    CapacityDataAccordionService,
    CapacityDataService
  ],
  exports: [
    CommonCapacityDataModule,
    CapacityDataContainerComponent
  ]
})
export class CapacityDataContainerModule {}

