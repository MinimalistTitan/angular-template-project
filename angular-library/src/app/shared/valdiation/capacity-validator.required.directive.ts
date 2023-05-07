import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[capacityValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CapacityValidatorDirective,
        multi: true
    }]
})
export class CapacityValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        const descriptor = control.parent.get('descriptor').value;
        if (descriptor && descriptor.isRequired && !!!control.value) {
            return { 'capacityIsRequired': true };
        }
        return null;
    }

}