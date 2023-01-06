import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/share/share.module';
import { EnvironmentBadgeComponent } from '../environment-badge/environment-badge.component';
import { HeaderComponent } from '../header/header.component';
import { ModuleNavigationModule } from '../module-navigation/module-navigation.module';
import { ShellComponent } from './shell.component';
@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    EnvironmentBadgeComponent,
    // UserInforComponent,
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    SharedModule,
    // SelectModule,
    // OverlayModule,
    ModuleNavigationModule
  ],
  exports: [ShellComponent],
  providers: [],
})
export class ShellModule {}
