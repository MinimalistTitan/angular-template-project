import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverDirective } from './popover.directive';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TypePopoverComponent } from './typed-popover/typed-popover.component';
import { InheritancePopoverComponent } from './inheritance-popover/inheritance-popover.component';
import { InheritanceComponent } from './inheritance-popover/inheritance.component';
import { OriginPopoverComponent } from './origin-popover/origin-popover.component';
import { Cd2cValidationPopoverComponent } from './cd2c-validation-popover/cd2c-validation-popover.component';
import { OriginComponent } from './origin-popover/origin.component';

@NgModule({
  declarations: [
    PopoverComponent,
    PopoverDirective,
    TypePopoverComponent,
    InheritancePopoverComponent,
    InheritanceComponent,
    OriginComponent,
    OriginPopoverComponent,
    Cd2cValidationPopoverComponent,
  ],
  imports: [CommonModule, OverlayModule, MatIconModule, MatButtonModule],
  exports: [
    PopoverComponent,
    PopoverDirective,
    TypePopoverComponent,
    InheritancePopoverComponent,
    InheritanceComponent,
    OriginComponent,
    OriginPopoverComponent,
    Cd2cValidationPopoverComponent,
  ],
  providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class PopoverModule {}
