import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HttpCancellationPublisher {
  private _pendingRequests$ = new Subject<void>();
  constructor() {}
  
  publishCancellationSignal() {
    this._pendingRequests$.next();
  }

  get cancellationPublished() {
    return this._pendingRequests$.asObservable();
  }
}
