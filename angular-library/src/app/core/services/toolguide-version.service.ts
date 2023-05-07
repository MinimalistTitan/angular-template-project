import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, CDM_APP_CONFIG } from 'src/app/models';
import { TargetToolGuideVersion, toTargetToolGuideRelease } from 'src/app/models/toolguide-validation';
import { toolGuideVersionSegment } from './backend-segement.constant';

@Injectable()
export class ToolGuideVersionService {
  private _baseUrl = 'api/target-tool-guide-version';
  constructor(private httpClient: HttpClient,  @Inject(CDM_APP_CONFIG) private appConfig: AppConfig) {}

  getVersions = (): Observable<any> =>
    this.httpClient
      .post(new URL(toolGuideVersionSegment, this.appConfig.apiHost).toString(), null)
      .pipe(map(toTargetToolGuideRelease));

  getList = (): Observable<TargetToolGuideVersion[]> =>
    this.httpClient.post<TargetToolGuideVersion[]>(
      new URL(`${this._baseUrl}/list`, this.appConfig.apiHost).toString(),
      null
    );

  set = (payload: TargetToolGuideVersion): Observable<TargetToolGuideVersion> =>
    this.httpClient.post<TargetToolGuideVersion>(
      new URL(`${this._baseUrl}/set`, this.appConfig.apiHost).toString(),
      payload
    );

  remove = (
    payload: TargetToolGuideVersion
  ): Observable<TargetToolGuideVersion> =>
    this.httpClient.post<TargetToolGuideVersion>(
      new URL(`${this._baseUrl}/delete`, this.appConfig.apiHost).toString(),
      payload
    );
}
