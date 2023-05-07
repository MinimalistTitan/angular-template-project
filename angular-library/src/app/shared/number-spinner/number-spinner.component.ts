import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { isNil, isNumber, round } from 'lodash';
import { Key } from 'ts-keycode-enum';

const IGNORE_CHARACTERS = ['-', ',', '-0', '-0,', '-0.'];
@Component({
  selector: 'cdm-number-spinner',
  templateUrl: 'number-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cdm-number-spinner',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumberSpinnerComponent,
    },
  ],
})
export class NumberSpinnerComponent
  implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit
{
  //#region variables
  @Input() controlName: string;
  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() significantDigits: number;
  @Input() stepSize: number = 1;
  @Input() unit: string;
  @Input() disabled = false;
  @Input() showValueWhenDisabled = false;
  @Input() hideStepButtons = false;
  @ViewChild('input') _input: ElementRef<HTMLInputElement>;
  @Input()
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this.handleValueChanged(value);
  }
  private _value: number = undefined;

  @Output() valueChange = new EventEmitter<number>();
  control: AbstractControl;
  touched = false;
  private _sub$ = new Subscription();
  private onChange = [(_: number) => {}];
  private onTouch = [() => {}];
  viewValue: string;
  get _stringifiedValue(): string {
    const isComma = this._input?.nativeElement.value.includes(',');
    const val = (this._input?.nativeElement.value || '').replace('.', ',');
    if (IGNORE_CHARACTERS.includes(val)) return val;
    const safeValue = this.stringify(this.safeValue(this.value));
    return isComma ? safeValue.replace('.', ',') : safeValue.replace(',', '.');
  }

  //#endregion
  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private _cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.controlContainer) {
      if (this.controlName) {
        this.control = this.controlContainer.control.get(this.controlName);
        if (!!this.control) {
          this._sub$.add(
            this.control.valueChanges.subscribe((val) => {
              this._value = val;
              this._cd.markForCheck();
            })
          );

          // TODO avoid reset value if it's already be set from html template instead of setting when create the form(set from type script file)
          if (!this.disabled) {
            this.disabled = this.control.disabled;
          }

          if (!this.disabled || this.showValueWhenDisabled) {
            this._input.nativeElement.value = (
              isNil(this._value) ? '' : this.roundValue(this._value)
            ).toString();
          } else {
            this._input.nativeElement.value = '';
          }
        }
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  ngOnDestroy(): void {
    if (!!this._sub$) {
      this._sub$.unsubscribe();
    }
  }

  ngOnInit() {
    this.significantDigits = isNumber(this.significantDigits)
      ? this.significantDigits
      : 3;
  }

  _onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = this.safeValue(target.value);
  }

  _onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    let val = this.safeValue(target.value);
    if (val > this.maxValue) {
      val = this.maxValue;
    }
    if (val < this.minValue) {
      val = this.minValue;
    }

    this.value = val;
    this.valueChange.emit(this.value);
  }

  _onTouch(): void {
    this.viewValue = isNumber(this.value) ? this.roundValue(this.value).toString() : '';
    this.onTouch.forEach((fn) => fn());
  }

  public registerOnChange(fn: any): void {
    this.onChange.push(fn);
  }

  public registerOnTouched(fn: any): void {
    this.onTouch.push(fn);
  }

  public writeValue(inputValue: number): void {
    this.value = this.safeValue(inputValue);
    this.viewValue = this.roundValue(inputValue).toString();
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  updateValueByStep(direction: number) {
    let newValue = (this.value || 0) + direction * this.stepSize;
    let roundedValue = this.roundValue(newValue);
    if (roundedValue < this.minValue) {
      roundedValue = this.minValue;
    } else if (roundedValue > this.maxValue) {
      roundedValue = this.maxValue;
    }
    this.viewValue = roundedValue.toString();
    this.value = roundedValue;
  }

  inputKeydown(e: any) {
    switch (e.keyCode) {
      case Key.UpArrow:
        this.updateValueByStep(1);
        break;
      case Key.DownArrow:
        this.updateValueByStep(-1);
        break;
      case Key.Enter:
        e.preventDefault();
        this._onChange((e.target.value || '').toString());
    }
    return;
  }

  //#region privates
  private safeValue(val: string | number): number {
    const safeValue = parseFloat(this.stringify(val).replace(',', '.'));
    return isNaN(safeValue) ? undefined : safeValue;
  }

  private stringify(val: string | number): string {
    return val === undefined || val === null ? '' : `${val}`;
  }

  private handleValueChanged(value: number) {
    const safeValue = this.safeValue(value);

    if (safeValue !== this._value) {
      this._value = safeValue;
      this.onChange.forEach((fn) => {
        try {
          fn(safeValue);
        } catch (error) {}
      });
    }

    if (
      !!this._input &&
      (!this._input.nativeElement.value ||
        (isNil(this._value) &&
          !IGNORE_CHARACTERS.includes(this._input.nativeElement.value)))
    ) {
      this._input.nativeElement.value = (
        isNil(this._value) ? '' : this._value
      ).toString();
    }
  }

  private roundValue = (value: number): number =>
    round(value, this.significantDigits);

  //#endregion
}
