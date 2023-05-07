import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { APP_NAVIGATION } from 'src/app/app-config-factory';
import { ToolGuideVersionService } from 'src/app/core/services/toolguide-version.service';
import { TargetToolGuideRelease } from 'src/app/models/toolguide-validation';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
  isBusy = false;

  constructor(private toolGuideVersionSrv: ToolGuideVersionService) {
  }

  data$: Observable<TargetToolGuideRelease>;
  appNavigations: any;
  ngOnInit(): void {
    this.appNavigations = APP_NAVIGATION;
    let navigationWithoutChild = [...this.appNavigations].filter(x => x.children.length === 0 && x.id !== 'ProductAdministration');
    const newNavigationGroup = {
      id: 'Orther',
      name: 'Orther',
      text: 'Orther',
      textIntl: 'Orther',
      link: '',
      queryParams: null,
      active: false,
      children: navigationWithoutChild
    }
    this.appNavigations = [...this.appNavigations].filter(x => x.children.length > 0);
    this.appNavigations.push(newNavigationGroup);
    this.isBusy = true;
    this.data$ = this.toolGuideVersionSrv.getVersions().pipe(finalize(() => this.isBusy = false ));
  }
}
