import { ChangeContext, LabelType, Options, PointerType } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SliderBaseComponent } from '../../slider-base.component';

@Component({
  selector: 'cdm-slider-range',
  templateUrl: './slider-range.component.html',
  styleUrls: ['./slider-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderRangeComponent extends SliderBaseComponent {
  maxValue: number;
  protected override isRangeSlider = true;
  protected override buildOptions(): Options {
    this.maxValue = Math.max(...this.stepConfigs?.map(o => o.value));
    const options: Options = {
      showTicks: true,
      hideLimitLabels: true,
      hidePointerLabels: true,
      showSelectionBar: true,
      noSwitching: true,
      disabled: this.disabled,
      stepsArray: this.stepConfigs?.map((e) => ({ value: e.value })),
      getPointerColor: (value: number): string => {
        return 'transparent'
      },
      getSelectionBarColor: (value: number, highValue: number): string => {
        return '#d8e0f3';
      },
      translate: (value: number, label: LabelType): string => {
        this.updateTickSelected();
        return '';
      }
    };

    return options;
  }

  protected override setDefaultValue() {
    this.sliderValue = this.sliderControl.value;
  }

  userChangeEnd(e: ChangeContext) {
    if (!this.pointerVisible) {
      this.pointerVisible = true;
      if (e.pointerType == PointerType.Min) {
        this.sliderValue = [e.value, e.value];
      } else {
        this.sliderValue = [e.highValue, e.highValue];
      }
    }
    this.sliderValueChange(this.sliderValue);
  }
}
