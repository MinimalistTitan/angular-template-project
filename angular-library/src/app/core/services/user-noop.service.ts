import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserNoopService extends UserService {
  override getUrl(): string {
    return new URL('role-mock.json', this.appConfig.appHost).toString();
  }
}
