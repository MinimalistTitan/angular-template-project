import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { CoreModule } from "./core/core.module";
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from "./share/share.module";
import { ProductAdministrationComponent } from './modules/product-administration/product-administration.component';
//const appConfig = appConfigFactory();
@NgModule({
  declarations: [AppComponent, AppMainComponent, ProductAdministrationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    CoreModule.forRoot(),
    // AuthModule.forRoot({
    //   ...(window['AUTH_CONFIG'] || environment.auth), redirectUri: appConfig.appHost, protectedResources: [
    //     { resource: appConfig.apiHost, scopes: null },
    //     { resource: new URL('api', appConfig.appHost).toString(), scopes: null }
    //   ]
    // }),
    // AppStoreModule,
  ],
  bootstrap: [AppComponent,
     //MsalRedirectComponent
    ],
  // providers: [
  //   { provide: CDM_APP_CONFIG, useValue: appConfig },
  // ]
})

export class AppModule { }