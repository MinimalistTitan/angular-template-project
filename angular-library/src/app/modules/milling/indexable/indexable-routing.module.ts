import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdmSubModule } from 'src/app/share/shared.enum';
import { IndexableMillingComponent } from './indexable.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: CdmSubModule.Geometry },
      {
        path: CdmSubModule.Geometry,
        component: IndexableMillingComponent,
        data: {
          subModule: CdmSubModule.Geometry,
        },
      },
      {
        path: CdmSubModule.Grade,
        component: IndexableMillingComponent,
        data: {
          subModule: CdmSubModule.Grade,
        },
      },
      {
        path: CdmSubModule.Body,
        component: IndexableMillingComponent,
        data: {
          subModule: CdmSubModule.Body,
        },
      },
      {
        path: CdmSubModule.ProductData,
        component: IndexableMillingComponent,
        data: {
          subModule: CdmSubModule.ProductData,
        },
      },
      {
        path: CdmSubModule.FirstChoice,
        //component: FirstChoiceComponent,
        data: {
          subModule: CdmSubModule.FirstChoice,
        }
      },
      {
        path: CdmSubModule.Report,
        //component: ReportComponent,
      },
      {
        path: CdmSubModule.ProfileCalculation,
        //component: ProfileCalculationComponent,
        data: {
          //profileCalculationType: ProfileCalculationHierarchyEnum.MillingHierarchy,
        },
      },
      {
        path: CdmSubModule.CVCDefault,
        //component: CvcTmcDefaultComponent,

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexableMillingRoutingModule {}
