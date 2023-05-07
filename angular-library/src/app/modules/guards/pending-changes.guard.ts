import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { DialogService } from 'src/app/share/dialog/dialog.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private dialogService: DialogService) { }
  canDeactivate = (component: ComponentCanDeactivate): boolean | Observable<boolean> => {
    if (!component.canDeactivate) {
        return of(true);
    }
    return component.canDeactivate().pipe(switchMap(valid => !valid ? this.dialogService.confirmDiscardChanges() : of(true)));
  }
}
