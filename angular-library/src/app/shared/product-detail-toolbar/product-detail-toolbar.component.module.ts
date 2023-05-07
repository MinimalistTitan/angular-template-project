import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from '../popover/popover.module';
import { DialogModule } from '../dialog/dialog.module';
import { ProductDetailToolbarComponent } from './product-detail-toolbar.component';


@NgModule({
  declarations: [ProductDetailToolbarComponent],
  imports: [CommonModule, MatIconModule, PopoverModule, DialogModule],
  exports: [ProductDetailToolbarComponent],
})
export class ProductDetailToolbarModule {}
