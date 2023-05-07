import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { MsalGuard } from '@azure/msal-angular/msal.guard';
import { UserRoleResolver } from './core/services/user.service';
import { CdmModule } from './share/shared.enum';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    canActivate: [MsalGuard],



    resolve: {
      roleLoaded: UserRoleResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/overview').then((m) => m.OverviewModule),
        data: { hideLeftMenuBar: true },
      },
      {
        path: 'milling/indexable',
        loadChildren: () =>
          import('./modules/milling/indexable/indexable.module').then(
            (m) => m.IndexableMillingModule
          ),
        data: { mainNavigation: CdmModule.IndexableMilling, title: 'Indexable Milling' },
      },
      // {
      //   path: 'milling/solid',
      //   loadChildren: () =>
      //     import('./modules/milling/solid/solid.module').then(
      //       (m) => m.SolidMillingModule
      //     ),
      //   data: { mainNavigation: CdmModule.SolidMilling, title: 'Solid Milling' },
      // },
      // {
      //   path: 'turning/general',
      //   loadChildren: () =>
      //     import('@cdm/modules/turning/general/general.module').then(
      //       (m) => m.GeneralModule
      //     ),
      //   data: { mainNavigation: CdmModule.GeneralTurning, title: 'General Turning' },
      // },
      // {
      //   path: 'turning/parting-grooving',
      //   loadChildren: () =>
      //     import(
      //       '@cdm/modules/turning/parting-grooving/parting-grooving.module'
      //     ).then((m) => m.PartingGroovingModule),
      //   data: { mainNavigation: CdmModule.PartingGrooving, title: 'Parting & Grooving' },
      // },
      // {
      //   path: 'turning/thread',
      //   loadChildren: () =>
      //     import('@cdm/modules/turning/thread/thread.module').then((m) => m.ThreadTurningModule),
      //   data: { mainNavigation: CdmModule.ThreadTurning, title: 'Thread Turning' },
      // },
      // {
      //   path: 'drilling/indexable',
      //   loadChildren: () =>
      //     import('@cdm/modules/drilling/indexable/indexable.module').then(
      //       (m) => m.IndexableDrillingModule
      //     ),
      //   data: { mainNavigation: CdmModule.IndexableDrilling, title: 'Indexable Drilling' },
      // },
      // {
      //   path: 'reaming',
      //   loadChildren: () =>
      //     import('./modules/reaming/reaming.module').then(
      //       (m) => m.ReamingModule
      //     ),
      //   data: { mainNavigation: CdmModule.Reaming, title: 'Reaming' },
      // },
      // {
      //   path: 'drilling/solid',
      //   loadChildren: () =>
      //     import('@cdm/modules/drilling/solid/solid.module').then(
      //       (m) => m.SolidDrillingModule
      //     ),
      //   data: { mainNavigation: CdmModule.SolidDrilling, title: 'Solid Drilling' },
      // },
      // {
      //   path: 'product-administration',
      //   loadChildren: () =>
      //     import('./modules/product-administration/product-administration.module').then(
      //       (m) => m.ProductAdministrationModule
      //     ),
      //   data: { mainNavigation: CdmModule.ProductAdministration, title:'Product Administration' },
      // },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
