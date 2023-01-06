import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ShellModule } from './shell/shell.module';

const PROVIDERS: Provider[] = [
  // CommonService,
  //   {
  //     provide: UserService,
  //     useClass: environment.production ? UserService : UserNoopService,
  //   },
  //   UserRoleResolver,
  //   errorInterceptorProvider,
  //   noopInterceptorProvider,
  //   apiHostInterceptorProvider,
];
const MODULES = [
  CommonModule,
  //MatSnackBarModule,
  ShellModule,
  //AreaAppNewsReleasedLogModule,
];

@NgModule({
  declarations: [
    
  
  
  ],
  exports: MODULES,
//   providers: [
//     {
//       provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
//       useValue: {
//         duration: 2000,
//         verticalPosition: 'top',
//         horizontalPosition: 'right',
//       },
//     },
//   ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: PROVIDERS,
    } as ModuleWithProviders<CoreModule>;
  }
}
