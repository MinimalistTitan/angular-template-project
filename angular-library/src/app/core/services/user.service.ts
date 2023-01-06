import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { intersection } from 'lodash';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from 'src/app/models/app-config';
import { isEmptyArray } from 'src/app/utilities/array';
import { userRoleSegment } from './backend-segement.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private _roleSubject : BehaviorSubject<{name: string, description: string}[]>

    constructor(@Inject(APP_CONFIG) public appConfig: AppConfig, private http: HttpClient) {
        this._roleSubject = new BehaviorSubject<{name: string, description: string}[]>([]);
    }

    private _selectRoles(): string[] {
        return this._roleSubject.value.map(x => x.name);
    }

    getUrl(): string {
        return new URL(userRoleSegment, this.appConfig.appHost).toString();
    }

    canWrite(requiredRoles: string[]): boolean {
        return !isEmptyArray(requiredRoles) && intersection(this._selectRoles(), requiredRoles).length > 0;
    }

    hasRole(requiredRoles: string[]): boolean {
        return !isEmptyArray(requiredRoles) && intersection(this._selectRoles(), requiredRoles).length > 0;
    }

    selectRoleNames(): Observable<string[]> {
        return this._roleSubject.asObservable().pipe(map(roles => roles.map(role => role.name)));
    }
}
