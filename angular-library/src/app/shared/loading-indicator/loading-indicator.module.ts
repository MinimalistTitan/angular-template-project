import { NgModule } from '@angular/core';
import { BusyComponent } from './busy/busy.component';
import { BusyDirective } from './busy/busy.directive';

@NgModule({
  declarations: [BusyDirective, BusyComponent],
  exports: [BusyDirective],
})
export class LoadingIndicatorModule {}
