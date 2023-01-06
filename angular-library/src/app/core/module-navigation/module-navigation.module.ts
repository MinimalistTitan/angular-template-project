import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";

import { ModuleNavigationComponent } from './module-navigation.component'

@NgModule({
  declarations: [ModuleNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [ModuleNavigationComponent],
})

export class ModuleNavigationModule {
}
