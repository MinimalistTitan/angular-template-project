import { isNil } from 'lodash';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SliderStepConfigs } from '../../models';
import { IDictionary } from 'src/app/models';

@Component({
  selector: 'cdm-slider-step',
  templateUrl: './slider-step.component.html',
  styleUrls: ['./slider-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderStepComponent implements OnChanges {
  @Input() stepConfigs: SliderStepConfigs[] = [];
  @Input() showRankingLabel = false;
  @Input() showHeader = false;
  @Input() label: string;
  @Input() sliderControl: FormControl;
  @Input() disabled:boolean;
  options: Options;
  pointerVisible = false;
  sliderValue: number | undefined;
  stepNames: IDictionary<string> = {};

  constructor(private _elementRef: ElementRef<HTMLElement>,) {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!this.sliderControl){
      this.pointerVisible = !isNil(this.sliderControl.value);
      if (!this.disabled) {
        this.disabled = this.sliderControl.disabled;
      }
      this.options = this.buildOptions();
      this.updateTicks();
      this.setDefaultValue();
      this.stepConfigs.forEach((e) => (this.stepNames[e.value] = e.name));
    }
  }

  userChangeEnd(e: ChangeContext) {
    this.pointerVisible = true;
    this.sliderControl.setValue(e.value);
  }

  protected  buildOptions(): Options {
    const disabledItemIndex = this.getDisabledTickIndex();

    const options: Options = {
      showTicks: true,
      hideLimitLabels: true,
      hidePointerLabels: true,
      disabled: this.disabled,
      maxLimit: disabledItemIndex ? disabledItemIndex - 1 : undefined,
      stepsArray: this.stepConfigs?.map((e) => ({ value: e.value })),
      getPointerColor: (value: number): string => {
        const matched = this.stepConfigs?.find((e) => e.value === value);

        return matched?.color;
      },
    };

    return options;
  }

  private setDefaultValue() {
    if (!!this.sliderControl && !isNil(this.sliderControl.value)) {
      this.sliderValue = this.sliderControl.value;
    }
  }

  private getDisabledTickIndex(): number | null {
    if (!this.stepConfigs?.length) {
      return null;
    }

    const result: number = this.stepConfigs?.findIndex((item) => item.disabled);

    return result >= 0 ? result : null;
  }

  private updateTicks() {
    const disabledItemIndex: number = this.getDisabledTickIndex();
    if (!disabledItemIndex) {
      return;
    }

    const disabledTick: any =
      this._elementRef.nativeElement?.querySelectorAll('.ngx-slider-tick')?.[
        disabledItemIndex
      ];
    if (disabledTick) {
      disabledTick.style.cursor = 'no-drop';
    }
  }
}
