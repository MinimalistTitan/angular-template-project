import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { MODULE_NAME_TOKEN } from "src/app/core/services/common.service";
import { SharedModule } from "src/app/share/share.module";
import { CdmModule, CdmSubModule } from "src/app/share/shared.enum";
import { ProductAdministrationComponent } from "./product-administration.component";

const ROUTES: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: CdmSubModule.ProductAssignment,
        },
        {
          path: CdmSubModule.ProductAssignment,
          component: ProductAdministrationComponent,
          data: {
            subModule: CdmSubModule.ProductAssignment,
          },
        },     
      ],
    },
  ];
  
  @NgModule({
    declarations: [
    //   ProductAdministrationComponent,
    //   TargetToolGuideVersionComponent,
    //   ProductAdministrationComponent,
    //   MdmProductFilterComponent,
    //   IntgradeImportCtmsComponent,
    //   IntgradeImportCoatingComponent,
    //   MassDeleteProductComponent,
    //   IntgradeImportCoatingComponent,
    //   ToolguideExportScheduleComponent,
    //   ToolguideExportScheduleShowReportComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      //PipeModule,
      RouterModule.forChild(ROUTES),
      MatButtonModule,
    ],
    providers: [
      {
        provide: MODULE_NAME_TOKEN,
        useValue: CdmModule.ProductAdministration,
      },
    ],
  })
  export class ProductAdministrationModule {}
  