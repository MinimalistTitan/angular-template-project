import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { CapacityDataPipe } from '../capacity-data-accordion/capacity-data-base/capacity-data-base.pipe';
import { SliderModule } from 'src/app/share/slider/slider.module';
import { SliderConfigs, SliderStepConfigs } from 'src/app/share/slider/models';
import { CapacityDataStatusEnum } from 'src/app/models/enums';
import { PopoverModule } from 'src/app/share/popover/popover.module';

@Component({
  selector: 'cdm-capacity-data-range-slider-group',
  templateUrl: './capacity-data-range-slider-group.component.html',
  styleUrls: ['./capacity-data-range-slider-group.component.scss'],
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
})
export class CapacityDataRangeSliderGroupComponent {
  @Input() sliderConfigs: SliderConfigs[];
  @Input() formGroup: FormGroup;
  @Input() formControls: FormGroup[];
  @Input() sliderNames: string[] = [];
  @Input() sliderControlName: string = '';
  @Input() mainControlName: string;
  @Input() descriptorControlName: string = 'descriptor';
  @Input() shouldShowSliderLabel: boolean;
  @Input() shouldShowSliderControl: boolean = true;
  @Input() groupName: string;
  @Input() random: string;
  @Output() rangeChanged = new EventEmitter<{
    item: FormGroup;
    sliderControlName: string;
    data: number[];
  }>();

  sliderStepConfigs: SliderStepConfigs[];
  stepNames: { [key: string]: string } = {};
  shouldShowPopoverButtons: boolean;
  sliderLabels: any[];
  capacityDataStatusEnum = CapacityDataStatusEnum;

  private readonly unsubscribe$ = new Subject();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sliderConfigs']?.currentValue || changes['random']) {
      this.updateSliderStepConfigs();
      this.updateStepNames();
    }

    if (changes['formControls']?.currentValue?.length) {
      this.formControls = changes['formControls'].currentValue;
      this.updateSliderLabels();
      this.updatePopOverDisplayCondition();
    }
  }

  private updateSliderLabels() {
    this.sliderLabels = this.formControls.map((formGroup) => {
      const range: [number, number] = formGroup.get(
        this.sliderControlName
      ).value;

      if (
        formGroup.get(this.descriptorControlName)?.value?.status ===
          CapacityDataStatusEnum.ReadOnly ||
        (!range?.length && range?.length != 2)
      ) {
        return '';
      }

      const [lowRange, highRange] = range;
      let tooltip = {label: this.stepNames[lowRange], title: this.stepNames[lowRange]}
      
      if (lowRange === highRange) {
        return tooltip;
      }

      const valueConfig = this.sliderConfigs.map(x => x.value);
      const maxValueConfig = Math.max(...valueConfig);
      const minValueConfig = Math.min(...valueConfig);
      tooltip = {...tooltip, label: `${this.stepNames[lowRange].substring(0, 7)}… - ${this.stepNames[highRange]}`};

      if (lowRange === minValueConfig && highRange === maxValueConfig) {
        return {...tooltip, title: Object.keys(this.stepNames).map(x => this.stepNames[x]).join(' - ')};
      }

      return {...tooltip, title: `${this.stepNames[lowRange]} - ${this.stepNames[highRange]}`};
    });
  }

  private updatePopOverDisplayCondition() {
    this.shouldShowPopoverButtons = this.formControls?.some(
      (item) =>
        item?.controls[this.descriptorControlName]?.value?.isReadOnly ||
        item?.controls[this.descriptorControlName]?.value?.isInherited ||
        item.invalid
    );
  }

  private updateStepNames() {
    this.sliderConfigs.forEach((e) => (this.stepNames[e.value] = e.name));
  }

  private updateSliderStepConfigs() {
    this.sliderStepConfigs = this.sliderConfigs?.map((e) => ({
      value: e.value,
      color: e.pointerColor,
    }));
  }

  get sliderColClasses() {
    return {
      'col-end-11':
        !this.shouldShowSliderLabel && !this.shouldShowPopoverButtons,
      'col-end-7':
        this.shouldShowSliderLabel && !this.shouldShowPopoverButtons,
      'col-end-6': this.shouldShowSliderLabel && this.shouldShowPopoverButtons,
      'col-end-10':
        !this.shouldShowSliderLabel && this.shouldShowPopoverButtons,
    };
  }

  sliderValueChanged(event: {
    item: FormGroup;
    sliderControlName: string;
    data: number[];
  }){
    this.updateSliderLabels();
    this.updatePopOverDisplayCondition();
    this.rangeChanged.next(event);
  }
}
