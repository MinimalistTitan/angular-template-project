import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MultipleSelectBoxComponent } from "./components/multiple-select-box/multiple-select-box.component";
import { SelectSearchComponent } from "./components/select-search/select-search.component";
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
    declarations: [MultipleSelectBoxComponent, SelectSearchComponent],
    imports: [
      CommonModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      FormsModule,
      ScrollingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    exports: [MultipleSelectBoxComponent],
  })
  export class SelectModule {}