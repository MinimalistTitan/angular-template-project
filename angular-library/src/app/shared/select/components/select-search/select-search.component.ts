import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import {
  Subject,
  delay,
  takeUntil,
  tap,
  filter,
} from 'rxjs';
import {
  A,
  END,
  ENTER,
  ESCAPE,
  HOME,
  NINE,
  SPACE,
  Z,
  ZERO,
} from '@angular/cdk/keycodes';

@Component({
  selector: 'cdm-select-search',
  templateUrl: './select-search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSearchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  /** Label of the search placeholder */
  @Input() placeholderLabel = 'Search';

  /** Type of the search input field */
  @Input() type = 'text';

  /** Font-based icon used for displaying Close-Icon */
  @Input() closeIcon = 'backspace';

  /**
   * Whether or not the search field should be cleared after the dropdown menu is closed.
   * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
   */
  @Input() clearSearchInput = true;

  /** Whether to show the search-in-progress indicator */
  @Input() searching = false;

  /** Disables initial focusing of the input field */
  @Input() disableInitialFocus = false;

  /** Enable clear input on escape pressed */
  @Input() enableClearOnEscapePressed = false;

  /**
   * Prevents home / end key being propagated to mat-select,
   * allowing to move the cursor within the search input instead of navigating the options
   */
  @Input() preventHomeEndKeyPropagation = true;

  /** Disables scrolling to active options when option list changes. Useful for server-side search */
  @Input() disableScrollToActiveOnOptionsChanged = false;

  /** Adds 508 screen reader support for search box */
  @Input() ariaLabel = 'dropdown search';

  /** Reference to the search input field */
  @ViewChild('searchSelectInput', { read: ElementRef, static: true })
  searchSelectInput: ElementRef;

  /** Reference to the search input field */
  @ViewChild('innerSelectSearch', { read: ElementRef, static: true })
  innerSelectSearch: ElementRef;

  /** Current search value */
  get value(): string {
    return this._formControl.value;
  }
  private _lastExternalInputValue: string;

  onTouched: Function = (_: any) => {};

  /** Previously selected values when using <mat-select [multiple]="true">*/
  private previousSelectedValues: any[];

  public _formControl: FormControl<string> = new FormControl<string>('');

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  /** Reference to active descendant for ARIA Support. */
  private activeDescendant: HTMLElement;

  constructor(
    @Inject(MatSelect) public matSelect: MatSelect,
    public changeDetectorRef: ChangeDetectorRef,
    private _viewportRuler: ViewportRuler,
    @Optional() @Inject(MatFormField) public matFormField: MatFormField = null
  ) {}

  ngOnInit() {
    // when the select dropdown panel is opened or closed
    this.matSelect.openedChange
      .pipe(delay(1), takeUntil(this._onDestroy))
      .subscribe((opened) => {
        if (opened) {
          this.updateInputWidth();
          // focus the search field when opening
          if (!this.disableInitialFocus) {
            this._focus();
          }
        } else {
          // clear it when closing
          if (this.clearSearchInput) {
            this._reset();
          }
        }
      });

    // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
    this._viewportRuler
      .change()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.matSelect.panelOpen) {
          this.updateInputWidth();
        }
      });

    this.initMultipleHandling();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event: KeyboardEvent) {
    // Prevent propagation for all alphanumeric characters in order to avoid selection issues
    if (
      (event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      event.keyCode === SPACE ||
      (this.preventHomeEndKeyPropagation &&
        (event.keyCode === HOME || event.keyCode === END))
    ) {
      event.stopPropagation();
    }

    if (this.matSelect.multiple && event.key && event.keyCode === ENTER) {
      // Regain focus after multiselect, so we can further type
      setTimeout(() => this._focus());
    }

    // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
    if (
      this.enableClearOnEscapePressed === true &&
      event.keyCode === ESCAPE &&
      this.value
    ) {
      this._reset(true);
      event.stopPropagation();
    }
  }

  /**
   * Handles the key up event with MatSelect.
   * Allows e.g. the announcing of the currently activeDescendant by screen readers.
   */
  _handleKeyup(event: KeyboardEvent) {}

  writeValue(value: string) {
    this._lastExternalInputValue = value;
    this._formControl.setValue(value);
    this.changeDetectorRef.markForCheck();
  }

  onBlur() {
    this.unselectActiveDescendant();
    this.onTouched();
  }

  registerOnChange(fn: (value: string) => void) {
    this._formControl.valueChanges
      .pipe(
        filter((value) => value !== this._lastExternalInputValue),
        tap(() => (this._lastExternalInputValue = undefined)),
        takeUntil(this._onDestroy)
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  /**
   * Focuses the search input field
   */
  public _focus() {
    if (!this.searchSelectInput || !this.matSelect.panel) {
      return;
    }
    // save and restore scrollTop of panel, since it will be reset by focus()
    // note: this is hacky
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;

    // focus
    this.searchSelectInput.nativeElement.focus();

    panel.scrollTop = scrollTop;
  }

  /**
   * Resets the current search value
   * @param focus whether to focus after resetting
   */
  public _reset(focus?: boolean) {
    this._formControl.setValue('');
    if (focus) {
      this._focus();
    }
  }

  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  private initMultipleHandling() {
    if (!this.matSelect.ngControl) {
      if (this.matSelect.multiple) {
        // note: the access to matSelect.ngControl (instead of matSelect.value / matSelect.valueChanges)
        // is necessary to properly work in multi-selection mode.
        console.error(
          'the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true'
        );
      }
      return;
    }
    // if <mat-select [multiple]="true">
    // store previously selected values and restore them when they are deselected
    // because the option is not available while we are currently filtering
    this.previousSelectedValues = this.matSelect.ngControl.value;

    this.matSelect.ngControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((values) => {
        let restoreSelectedValues = false;
        if (this.matSelect.multiple) {
          if (
            this._formControl.value &&
            this._formControl.value.length &&
            this.previousSelectedValues &&
            Array.isArray(this.previousSelectedValues)
          ) {
            if (!values || !Array.isArray(values)) {
              values = [];
            }
            const optionValues = this.matSelect.options.map(
              (option) => option.value
            );
            this.previousSelectedValues.forEach((previousValue) => {
              if (
                !values.some((v) =>
                  this.matSelect.compareWith(v, previousValue)
                ) &&
                !optionValues.some((v) =>
                  this.matSelect.compareWith(v, previousValue)
                )
              ) {
                // if a value that was selected before is deselected and not found in the options, it was deselected
                // due to the filtering, so we restore it.
                values.push(previousValue);
                restoreSelectedValues = true;
              }
            });
          }
        }
        this.previousSelectedValues = values;

        if (restoreSelectedValues) {
          this.matSelect._onChange(values);
        }
      });
  }

  /**
   *  Set the width of the innerSelectSearch to fit even custom scrollbars
   *  And support all Operation Systems
   */
  public updateInputWidth() {
    if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
      return;
    }
    let element: HTMLElement = this.innerSelectSearch.nativeElement;
    let panelElement: HTMLElement;
    while ((element = element.parentElement)) {
      if (element.classList.contains('mat-select-panel')) {
        panelElement = element;
        break;
      }
    }
    if (panelElement) {
      this.innerSelectSearch.nativeElement.style.width =
        panelElement.clientWidth + 'px';
    }
  }

  private unselectActiveDescendant() {
    this.activeDescendant?.removeAttribute('aria-selected');
    this.searchSelectInput.nativeElement.removeAttribute(
      'aria-activedescendant'
    );
  }
}
