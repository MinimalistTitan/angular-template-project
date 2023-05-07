import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion2Component } from './accordion2.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoadingIndicatorModule } from '../loading-indicator';
import { AccordionService } from './accordion.service';
import { ProductDetailToolbarModule } from '../product-detail-toolbar/product-detail-toolbar.component.module';
import { AccordionItemContentDirective } from './accordion-item-content.directive';

@NgModule({
  declarations: [Accordion2Component],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    LoadingIndicatorModule,
    MatButtonModule,
    ProductDetailToolbarModule,
  ],
  exports: [Accordion2Component
    //AccordionItemContentDirective
  ],
  providers: [AccordionService],
})
export class Accordion2Module {}
