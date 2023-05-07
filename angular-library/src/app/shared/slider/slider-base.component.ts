import { takeUntil, Subject } from 'rxjs';
import { Options } from '@angular-slider/ngx-slider';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNil, isEqual } from 'lodash';
import { SliderStepConfigs } from './models';
import { IDictionary } from 'src/app/models';

@Directive({
  selector: 'cdm-slider-base',
})
export abstract class SliderBaseComponent implements AfterViewInit, OnDestroy {
  @Input() stepConfigs: SliderStepConfigs[] = [];
  @Input() sliderControl: FormControl;
  @Input() disabled;
  @Output() valueChanged = new EventEmitter<number | number[]>();
  options: Options;
  pointerVisible = false;
  sliderValue: number | number[] | undefined;
  stepNames: IDictionary<string> = {};
  
  protected isRangeSlider = false;
  private readonly unsubcribed$ = new Subject();
  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    protected _cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (!!this.sliderControl) {
      this.pointerVisible = !isNil(this.sliderControl.value);
      if (!this.disabled) {
        this.disabled = this.sliderControl.disabled;
        this.options = this.buildOptions();
        this.updateTicks();
      }
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stepConfigs'] || changes['disabled']) {
      this.options = this.buildOptions();
      this.updateTicks();
      this.setDefaultValue();
      this.stepConfigs.forEach((e) => (this.stepNames[e.value] = e.name));
      this.sliderValueChange(this.sliderValue);
    }
  }

  ngOnDestroy(): void {
    this.unsubcribed$.next(true);
    this.unsubcribed$.complete();
  }

  protected sliderValueChange(value) {
    if (this.pointerVisible) {
      this.sliderControl.setValue(value);
      this.valueChanged.next(value);

    }
  }

  protected abstract setDefaultValue();

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

  protected abstract buildOptions(): Options;

  protected getDisabledTickIndex(): number | null {
    if (!this.stepConfigs?.length) {
      return null;
    }

    const result: number = this.stepConfigs?.findIndex((item) => item.disabled);

    return result >= 0 ? result : null;
  }

  protected updateTickSelected() {
    const tickSeleted = this._elementRef.nativeElement?.querySelectorAll('.ngx-slider-tick');
    if (!isNil(this.sliderValue)) {
      const minValue = this.sliderValue[0];
      const maxValue = this.sliderValue[1];

      const minValueIndex = this.stepConfigs.findIndex(x => x.value == minValue);
      const maxValueIndex = this.stepConfigs.findIndex(x => x.value == maxValue);
      const valueConfig = this.stepConfigs.map(x => x.value);
      const maxValueConfig = Math.max(...valueConfig);
      const minValueConfig = Math.min(...valueConfig);
      if (minValue === minValueConfig && maxValue === maxValueConfig) {
        Array.from(tickSeleted).forEach((el: any, index) => {
          const matched = this.stepConfigs[index];
          el.style.background = matched?.color;
        });
      }
      else {
        Array.from(tickSeleted).forEach((el: any, index) => {
          if (el.classList.contains('ngx-slider-selected')) {
            if (index == minValueIndex) {
              el.style.background = this.stepConfigs[minValueIndex].color;
            }

            if (index == maxValueIndex) {
              el.style.background = this.stepConfigs[maxValueIndex].color;
            }
          }
        });
      }
    }
    else {
      this.pointerVisible = false;
      Array.from(tickSeleted).forEach((el: any, index) => {
        el.style.background = '#d8e0f3';
      });
    }

  }
}
