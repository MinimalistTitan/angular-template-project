import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, CDM_APP_CONFIG } from 'src/app/models';
import { RelativeEngagementConfigurationSet, toRelativeEngagementConfigurationSet } from 'src/app/models/relative-engagement/relative-engagement-configuration-set.model';


@Injectable()
export class RelativeEngagementService {
  private _configurationURL: string =
    'api/milling/geometry/relative-engagement/config';
  constructor(
    private httpClient: HttpClient,
    @Inject(CDM_APP_CONFIG) private appConfig: AppConfig
  ) {}

  private getRequestUrl(): string {
    return new URL(this._configurationURL, this.appConfig.apiHost).toString();
  }

  get(): Observable<RelativeEngagementConfigurationSet> {
    return this.httpClient
      .post<any>(this.getRequestUrl(), null)
      .pipe(map((res) => toRelativeEngagementConfigurationSet(res)));
  }
}
