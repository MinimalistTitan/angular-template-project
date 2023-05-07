import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderStepComponent } from './components/slider-step/slider-step.component';
import {MatSliderModule} from '@angular/material/slider'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SliderRangeComponent } from './components/slider-range/slider-range.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PopoverModule } from '../popover/popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    NgxSliderModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule
  ],
  declarations: [SliderStepComponent, SliderRangeComponent],
  exports: [SliderStepComponent, SliderRangeComponent]
})
export class SliderModule { }
