import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TreeViewItemComponent } from "./tree-view-item/tree-view-item.component";
import { TreeViewComponent } from "./tree-view.component";

@NgModule({
    declarations: [
        TreeViewComponent, 
        TreeViewItemComponent
    ],
    imports: [
      CommonModule,
      MatIconModule,
      MatButtonModule,
      //ScrollingModule,
      //LoadingIndicatorModule
    ],
    exports: [TreeViewComponent],
  })
  export class TreeViewModule {}
  