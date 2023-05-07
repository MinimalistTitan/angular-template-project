import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuttingSpeedCorrectionComponent } from './cutting-speed-correction/cutting-speed-correction.component';
import { CapacityDataBaseDirective } from '../capacity-data-base/capacity-data-base.directive';
import { CapacityDataBaseComponent } from '../capacity-data-base/capacity-data-base.component';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingIndicatorModule } from 'src/app/share/loading-indicator';
import { ProductDetailToolbarModule } from 'src/app/share/product-detail-toolbar/product-detail-toolbar.component.module';
import { MatButtonModule } from '@angular/material/button';
import { PopoverModule } from 'src/app/share/popover/popover.module';
import { CapacityDataPipe } from '../capacity-data-base/capacity-data-base.pipe';
import { RankingComponent } from './ranking/ranking.component';
import { CapacityDataToolLifeCorrectionComponent } from './tool-life-correction/tool-life-correction.component';
import { CorrectionFactorComponent } from './cutting-force/correction-factor.component';
import { NumberSpinnerModule } from 'src/app/share/number-spinner/number-spinner.module';
import { AreaHelpModule } from '../area-help/area-help.module';
import { SliderModule } from 'src/app/share/slider/slider.module';
import { ValidationModule } from 'src/app/share/valdiation/validation.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CapacityDataSingleSliderGroupComponent } from '../../capacity-data-single-slider-group/capacity-data-single-slider-group.component';
import { CapacityDataRangeSliderGroupComponent } from '../../capacity-data-range-slider-group/capacity-data-range-slider-group.component';

const CAPACITY_DATA_COMMON_COMPONENTS = [
  CapacityDataBaseComponent,
  RankingComponent,
  CapacityDataToolLifeCorrectionComponent,
  CuttingSpeedCorrectionComponent,
  CorrectionFactorComponent,
  // StabilityCorrectionComponent,
  // CoolantSpeedFactorComponent,
  // TappingWorkingConditionComponent,
  // CoolantRankingComponent,
  // CuttingSpeedComponent,
  CapacityDataBaseDirective,
  // CapacityDataKarpComponent,
  // SurfaceRoughnessComponent,
  // CuttingSpeedTestManagerComponent,
  // CuttingSpeedTestDialogComponent,
  // GeometryFeedComponent,
  // OperationTypeMediumComponent,
  // OperationTypeFinishingComponent,
  // InsertIndexCountComponent,
  // GradeFeedComponent,
  // GradeFeedApmxComponent,
  // WorkingConditionComponent,
  // EngagementCorrectionComponent,
  // WorkingEngagementCorrectionComponent,
  // ProductDataReleaseStartValueComponent,
  // ToolguideValidationsComponent,
  // MaterialProfileDialogComponent,
  // StartValuesComponent,
  // RgfRegrindingParameterComponent,
  // ToolLifeCoreComponent,
  // FirstChoiceManagementComponent,
  // StartValuesDialogTemplateDirective,
  // FeedNomFactorComponent,
  // DrillingFeedComponent,
  // FeedForceCorrectionComponent,
  // StartValuesDialogTemplateDirective,
  // DepthOfCutComponent,
  // CuttingAngleComponent,
  // StartValuesDialogTemplateDirective,
  // SuboperationComponent,
  // EnteringAngleComponent,
  // OperationAreaGraphComponent,
  // DrillingToolLifeComponent,
  // OperationTypeLowFeedComponent
];

@NgModule({
  declarations: [
    ...CAPACITY_DATA_COMMON_COMPONENTS,
  ],
  imports: [
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
    LoadingIndicatorModule,
    CommonModule,
    ProductDetailToolbarModule,
    AreaHelpModule,
    ReactiveFormsModule,
    PopoverModule,
    SliderModule,
    NumberSpinnerModule,
    MatButtonModule,
    ValidationModule,
    DragDropModule,
    CapacityDataSingleSliderGroupComponent,
    CapacityDataRangeSliderGroupComponent,
    CapacityDataPipe
  ],
  exports: [
    ...CAPACITY_DATA_COMMON_COMPONENTS,
    CapacityDataPipe
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'never' },
    },
  ],
})
export class CommonCapacityDataModule { }
