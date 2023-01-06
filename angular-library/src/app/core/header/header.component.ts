import { Component, OnInit } from '@angular/core';
import { APP_NAVIGATION } from 'src/app/app-config-factory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUserName: string = 'Guest';
  environmentName: string;
  appNavigations: any;
  ngOnInit(): void {
    this.appNavigations = APP_NAVIGATION;
    // this.loggedInUserName = this.authService.getUserName();
    // this.roles$ = this.userService.selectRoleDescription();
    // this.store.dispatch(GetAppNewsReleaseLogData());
    // this.store.dispatch(GetAppVersionData());
  }
  showAppNewsDialog(){

  }
}
