import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SelectModule } from "../select/select.module";
import { ProductHierarchyFilterComponent } from "./product-hierarchy-filter.component";

@NgModule({
    imports: [CommonModule, SelectModule, MatIconModule],
    declarations: [
      ProductHierarchyFilterComponent,
    //   HierarchyFilterComponent,
    //   StatusFilterComponent,
    ],
    exports: [ProductHierarchyFilterComponent],
  })
  export class ProductHierarchyFilterModule {}