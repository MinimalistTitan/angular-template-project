import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CapacityDataPipe } from '../capacity-data-accordion/capacity-data-base/capacity-data-base.pipe';
import { SliderModule } from 'src/app/share/slider/slider.module';
import { PopoverModule } from 'src/app/share/popover/popover.module';
import { SliderConfigs, SliderStepConfigs } from 'src/app/share/slider/models';
import { CapacityDataStatusEnum } from 'src/app/models/enums';

@Component({
  selector: 'cdm-capacity-data-single-slider-group',
  templateUrl: './capacity-data-single-slider-group.component.html',
  styleUrls: ['./capacity-data-single-slider-group.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    SliderModule,
    PopoverModule,
    ReactiveFormsModule,
    CommonModule,
    CapacityDataPipe,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapacityDataSingleSliderGroupComponent implements OnInit {
  @Input() sliderConfigs: SliderConfigs[];
  @Input() formGroup: FormGroup;
  @Input() formControls: FormGroup[];
  @Input() sliderControlName: string = '';
  @Input() sliderNames: string[] = [];
  @Input() descriptorControlName: string = 'descriptor';
  @Input() shouldShowSliderNames: boolean;
  @Input() shouldShowSliderValues: boolean;
  @Input() shouldShowPopoverButtons: boolean;
  @Input() shouldShowValidatePopover: boolean = true;
  @Input() shouldShowWarningReadOnlyPopover: boolean = true;
  @Input() shouldShowInheritancePopoverButtons: boolean = true;
  @Input() hasValueOnStepName:boolean = false;

  @Input() customValidateResult: any;
  capacityDataStatusEnum = CapacityDataStatusEnum;
  sliderStepConfigs: SliderStepConfigs[];
  stepNames: { [key: string]: string } = {};
  isPopoverExisting: boolean;

  sliderColClasses: any = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sliderConfigs']) {
      this.updateSliderStepConfigs();
      this.updateSliderNames();
    }

    if (
      changes['formControls']?.currentValue?.length ||
      changes['customValidateResult']?.currentValue
    ) {
      this.updateShowPopoverFlag();
    }

    this.sliderColClasses = this.getSliderColClasses();
  }

  private updateShowPopoverFlag(): void {
    const shouldShowCustomValidate =
      this.customValidateResult &&
      Object.values(this.customValidateResult).some((value) => value === true) && this.shouldShowValidatePopover;

    const shouldShowControlValidate = this.formControls.some((item) => {
      return (
        (item?.controls[this.sliderControlName].errors?.['required'] && this.shouldShowValidatePopover) ||
        (item?.controls[this.descriptorControlName]?.value?.isReadOnly && this.shouldShowWarningReadOnlyPopover) ||
        (item?.controls[this.descriptorControlName]?.value?.isInherited && this.shouldShowInheritancePopoverButtons)
      );
    });

    this.isPopoverExisting =
      this.shouldShowPopoverButtons &&
      (shouldShowCustomValidate || shouldShowControlValidate);
  }

  private updateSliderStepConfigs(): void {
    this.sliderStepConfigs = this.sliderConfigs?.map((e) => ({
      value: e.value,
      color: e.pointerColor,
      disabled: e.disabled,
    }));
  }

  private updateSliderNames(): void {
    this.sliderConfigs.forEach((e) => (this.stepNames[e.value] = this.hasValueOnStepName ? `${e.name} (${e.value})` : e.name));
  }

  private getSliderColClasses() {
    return {
      'col-end-13': !this.shouldShowSliderValues && !this.isPopoverExisting,
      'col-end-9': this.shouldShowSliderValues && !this.isPopoverExisting,
      'col-end-7': this.shouldShowSliderValues && this.isPopoverExisting,
      'col-end-11': !this.shouldShowSliderValues && this.isPopoverExisting,
      'col-start-3': this.shouldShowSliderNames,
      'col-start-1': !this.shouldShowSliderNames,
    };
  }
}
