import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { userRoleSegment } from './backend-segement.constant';
import { intersection } from 'lodash';
import { AppConfig, CDM_APP_CONFIG } from 'src/app/models';
import { isEmptyArray } from 'src/app/utilities/array';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _roleSubject: BehaviorSubject<{name: string, description: string}[]>;
  constructor(private http: HttpClient, @Inject(CDM_APP_CONFIG) public appConfig: AppConfig) {
    this._roleSubject = new BehaviorSubject<{name: string, description: string}[]>([]);
  }

  private _selectRoles(): string[] {
    return this._roleSubject.value.map(x => x.name);
  }

  getUrl(): string {
    return new URL(userRoleSegment, this.appConfig.appHost).toString();
  }

  initalize(): void {
    this.http.get<{name: string, description: string}[]>(this.getUrl()).subscribe(rs => this._roleSubject.next(rs || []));
  }

  selectRoles(): Observable<{name: string, description: string}[]> {
    return this._roleSubject.asObservable();
  }

  selectRoleNames(): Observable<string[]> {
    return this._roleSubject.asObservable().pipe(map(roles => roles.map(role => role.name)));
  }

  selectRoleDescription(): Observable<string[]> {
    return this._roleSubject.asObservable().pipe(map(roles => roles.map(role => role.description)));
  }

  canWrite(requiredRoles: string[]): boolean {
    return !isEmptyArray(requiredRoles) && intersection(this._selectRoles(), requiredRoles).length > 0;
  }

  canWriteAsync(requiredRoles: string[]): Observable<boolean> {
    return this.selectRoleNames().pipe(map(roles => !isEmptyArray(requiredRoles) && intersection(roles, requiredRoles).length > 0));
  }

  hasRole(requiredRoles: string[]): boolean {
    return !isEmptyArray(requiredRoles) && intersection(this._selectRoles(), requiredRoles).length > 0;
  }
}

@Injectable({ providedIn: 'root' })
export class UserRoleResolver implements Resolve<{name: string, description: string}[]> {
    constructor(private userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.userService.initalize();
        return of(true);
    }
}

