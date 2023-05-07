import { ActivationEnd, Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { HttpCancellationPublisher } from '../services/http-cancellation.publisher';


export const CANCELLATION_TOKEN = 'CDM-CancelableRequest';

const headers = {};
headers[CANCELLATION_TOKEN] = 'Active';
export const CANCELLATION_HEADER = headers;

@Injectable()
export class RequestCancellingInterceptor implements HttpInterceptor {
  constructor(
    private _cancellationPublisher: HttpCancellationPublisher,
    _router: Router
  ) {
    _router.events.subscribe((event) => {
      // An event triggered at the end of the activation part of the Resolve phase of routing.
      if (event instanceof ActivationEnd) {
        // Cancel pending calls
        this._cancellationPublisher.publishCancellationSignal();
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!!req.headers.has(CANCELLATION_TOKEN)) {
      return next
        .handle(req.clone({ headers: req.headers.delete(CANCELLATION_TOKEN) }))
        .pipe(takeUntil(this._cancellationPublisher.cancellationPublished));
    }

    return next.handle(req);
  }
}

