import { BusyComponent } from './busy.component';
import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[cdmBusy]',
})
export class BusyDirective {
  private _busy = false;
  private readonly _keepAliveClass = 'cdm-busy-keep-alive';
  @Input('cdmBusy') set busy(value: boolean) {
    this._busy = value;
    this._$busy.next(this._busy);
  }

  @Input('keepAlive') keepAlive: boolean;

  private _$busy = new Subject<boolean>();
  private _$busyCom: ComponentRef<BusyComponent>;
  private get _element() {
    return this.el.nativeElement.parentElement;
  }
  private get _busyEl(): HTMLElement {
    return this._$busyCom.location.nativeElement;
  }
  constructor(
    private el: ElementRef<HTMLElement>,
    _viewContainer: ViewContainerRef
  ) {
    this._$busyCom = _viewContainer.createComponent(BusyComponent);
    this._$busy.subscribe(() => this.handleValueChanged());
  }

  private handleValueChanged() {
    const busyEls = this.el.nativeElement.getElementsByTagName('cdm-busy');
    if (this._busy) {
      if (!busyEls.length) {
        this.showBusy();
      }
    } else {
      this.hideBusy();
    }
  }

  private showBusy() {
    this.el.nativeElement.classList.add('relative');
    if (this.keepAlive) {
      this.el.nativeElement.classList.add(this._keepAliveClass);
    }

    const busyEl = this._busyEl;
    busyEl.style.width = `100%`;
    busyEl.style.height = `100%`;
    this.el.nativeElement.appendChild(busyEl);
  }

  private hideBusy() {
    if (!this._element) return;
    const busyEls = this._element.getElementsByTagName('cdm-busy');

    for (let i = busyEls.length - 1; 0 <= i; i--) {
      if (
        busyEls[i].parentElement.classList.contains(this._keepAliveClass) &&
        !this.el.nativeElement.isSameNode(busyEls[i].parentElement)
      ) {
        continue;
      }

      busyEls[i]?.remove();
    }
    this.el.nativeElement.classList.remove('relative');
    this._$busyCom.destroy();
  }
}
