import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    // canActivate: [MsalGuard],
    // resolve: {
    //   roleLoaded: UserRoleResolver,
    // },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/overview/overview.module').then((m) => m.OverviewModule),
       
      },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
