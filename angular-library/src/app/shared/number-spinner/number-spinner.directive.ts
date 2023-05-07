import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[cdmNumberSpinner]',
})
export class NumberSpinnerDirective {
  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    const { key } = event;
    if (this.isSpecialOperation(event) || !this.isKeyPrintable(event)) {
      return;
    }
    const newValue = this.getNewValue(event.target as HTMLInputElement, key);
    if (!this.valueIsValid(newValue)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  public onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData.getData('text');
    const newValue = this.getNewValue(
      event.target as HTMLInputElement,
      pastedText
    );
    if (!this.valueIsValid(newValue)) {
      event.preventDefault();
    }
  }

  private getNewValue(target: HTMLInputElement, str: string): string {
    const { value = '', selectionStart, selectionEnd } = target;
    return [
      ...value.split('').splice(0, selectionStart),
      str,
      ...value.split('').splice(selectionEnd),
    ].join('');
  }

  private valueIsValid(value: string): boolean {
    return /^-?\d*(,|\.)?\d*$/.test(value);
  }

  private isSpecialOperation(event: KeyboardEvent): boolean {
    const { keyCode, ctrlKey, metaKey } = event;
    // allow ctr-A/C/V/X/Y/Z
    const keysACVXYZ = [65, 67, 86, 88, 89, 90];
    if ((ctrlKey || metaKey) && keysACVXYZ.indexOf(keyCode) >= 0) {
      return true;
    }
    return false;
  }

  private isKeyPrintable(event: KeyboardEvent): boolean {
    const { keyCode } = event;
    return (
      (keyCode > 47 && keyCode < 58) || // number keys
      keyCode === 32 ||
      keyCode === 13 || // spacebar & return key(s)
      (keyCode > 64 && keyCode < 91) || // letter keys
      (keyCode > 95 && keyCode < 112) || // numpad keys
      (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
      (keyCode > 218 && keyCode < 223)
    ); // [\]' (in order)
  }
}
