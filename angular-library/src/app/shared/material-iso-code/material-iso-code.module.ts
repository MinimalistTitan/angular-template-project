import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmcLevelComponent } from './tmc-level/tmc-level.component';
import { MaterialIsoCodeComponent } from './material-iso-code.component';
import { MatIconModule } from '@angular/material/icon';
import { PopoverModule } from '../popover/popover.module';


@NgModule({
  declarations: [TmcLevelComponent, MaterialIsoCodeComponent],
  imports: [CommonModule, MatIconModule, PopoverModule],
  exports: [TmcLevelComponent, MaterialIsoCodeComponent],
})
export class MaterialIsoCodeModule {}
