import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IMaterial } from 'src/app/models/materials/material-node-path';
import { AppConfig, CDM_APP_CONFIG } from 'src/app/models';
import { CANCELLATION_HEADER } from '../interceptor/request-cancelling.interceptor';


@Injectable()
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    @Inject(CDM_APP_CONFIG) private appConfig: AppConfig
  ) {}

  getMaterials(): Observable<IMaterial[]> {
    return this.httpClient.post<IMaterial[]>(
      this.getRequestUrl(['materials']),
      null,
      { headers: CANCELLATION_HEADER }
    );
  }

  private getRequestUrl(routes: string[]): string {
    routes.unshift(...['api', 'product']);
    const url = routes.join('/');
    return new URL(url, this.appConfig.apiHost).toString();
  }
}
