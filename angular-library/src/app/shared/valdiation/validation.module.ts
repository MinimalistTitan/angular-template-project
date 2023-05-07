import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapacityValidatorDirective } from './capacity-validator.required.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CapacityValidatorDirective
  ],
  exports: [CapacityValidatorDirective],
})
export class ValidationModule {}
