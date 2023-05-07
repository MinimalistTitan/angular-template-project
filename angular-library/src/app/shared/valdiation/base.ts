import { AbstractControl } from '@angular/forms';
export function deleteValidateControl(
  controls: AbstractControl[],
  validationKey: string,
  onlySelf = true,
  emitEvent = false
) {
  controls.forEach((control) => {
    if (control.hasError(validationKey)) {
      delete control.errors[validationKey];
      control.updateValueAndValidity({ onlySelf, emitEvent });
    }
  });
}
