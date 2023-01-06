import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { SUB_NAVIGATION } from 'src/app/share/share.const';
import { CdmModule } from 'src/app/share/shared.enum';
import { HTMLHelper } from 'src/app/utilities/html.helper';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements AfterViewInit {
  hideLeftMenuBar: boolean = false;
  subNavigationList: any = [];
  moduleActiveRoute!: ActivatedRoute;
  constructor(private _el: ElementRef, private router: Router, public activatedRoute: ActivatedRoute) {
    this.listenToRouter();
  }

  ngAfterViewInit(): void {
    //? find all tag name match condition and remove them
    const els = (this._el.nativeElement as HTMLElement).getElementsByTagName(
      'target_tag_name'
    );
    HTMLHelper.setChild(els, (element) => {
      element.remove();
    });
  }

  private listenToRouter() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary')
      )
      .subscribe((route) => {
        this.moduleActiveRoute = route;
        this.hideLeftMenuBar = route.snapshot.data['hideLeftMenuBar'];
        let mainNavigation = route.parent?.snapshot.data['mainNavigation'];
        this.subNavigationList = this.getSubModuleRoutes(mainNavigation);
      });
  }

  private getSubModuleRoutes(mainNavigation: CdmModule) {
    const item = SUB_NAVIGATION.find((obj) => {
      return obj.parent === mainNavigation;
    });
    return item?.children || [];
  }
}
