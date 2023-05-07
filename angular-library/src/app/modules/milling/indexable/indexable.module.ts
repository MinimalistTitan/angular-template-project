import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexableMillingRoutingModule } from './indexable-routing.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/share/share.module';
import { HierarchyGridModule } from 'src/app/share/hierarchy-grid/hierarchy-grid.module';
import { MODULE_NAME_TOKEN } from 'src/app/core/services/common.service';
import { CdmModule } from 'src/app/share/shared.enum';
import { CapacityDataContainerModule } from '../../capacity-data-container/capacity-data-container.module';
import { IndexableMillingComponent } from './indexable.component';

const ACCORDIONS = [
//   IndexableMillingCuttingSpeedCorrectionComponent,
//   IndexableMillingFeedAxialComponent,
//   IndexableMillingRelativeEngagementComponent,
//   IndexableMillingSuboperationComponent,
//   IndexableMillingToolLifeCorrectionComponent,
//   IndexableMillingToolLifeComponent,
//   MaximumOfMaxEngagementComponent,
//   MaxChipThicknessCorrectionComponent,
//   AermxCorrectionComponent
];

@NgModule({
  declarations: [IndexableMillingComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    IndexableMillingRoutingModule,
    HierarchyGridModule,
    CapacityDataContainerModule,
    MatRadioModule,
    //ValidationModule,
    //NumberSpinnerModule,
    // ProfileCalculationModule,    
    // ProfileCalculationModule,
    // CapacityDataPipe,
    // ReportModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: MODULE_NAME_TOKEN,
      useValue: CdmModule.IndexableMilling,
    },
    // {
    //   provide: FIRST_CHOICE_TYPE_TOKEN,
    //   useValue: ProductHierarchyTypeEnum.IndexableMillingFirstChoice,
    // },
    //RelativeEngagementService,
  ],
})
export class IndexableMillingModule {}
