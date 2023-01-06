import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/share/share.module";
import { OverviewComponent } from "./overview.component";


const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  }
];

@NgModule({
    declarations: [
        OverviewComponent,
    ],
   
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    SharedModule

  ],
  exports: [
    OverviewComponent
  ],
  providers: [
    
  ]
})
export class OverviewModule { }