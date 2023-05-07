import { Injectable, Injector } from '@angular/core';
import { switchMap, of, Observable } from 'rxjs';
import { CapacityDataConflictDialogModel, toCapacityDataConflictDialogModel } from 'src/app/models/capacity/capacity-data-conflict-dialog.model';
import { CapacityDataSetResultModel } from 'src/app/models/capacity/capacity-data-set-result.model';
import { ConflictResolutionDialogComponent } from 'src/app/share/dialog/conflict-resolution/conflict-resolution.component';
import { DialogService } from 'src/app/share/dialog/dialog.service';
import { IDialogConfirm } from 'src/app/share/dialog/model';

@Injectable()
export class CapacityDataService {
  constructor(private _dialogService: DialogService) {}

  resolveDeleteConflicted = (
    setResult: CapacityDataSetResultModel
  ): Observable<CapacityDataSetResultModel> => {
    return this.openConflictDialog(
      setResult,
      'Capacity data conflict viewer',
      true,
      false
    ).pipe(
      switchMap((rs: IDialogConfirm) => {
        return of(setResult);
      })
    );
  };

  resolveSaveConflicted = (
    setResult: CapacityDataSetResultModel,
    callback: (data: any) => Observable<CapacityDataSetResultModel>
  ): Observable<CapacityDataSetResultModel> => {
    return this.openConflictDialog(
      setResult,
      'Capacity data conflict resolver'
    ).pipe(
      switchMap((rs: IDialogConfirm) => {
        if (rs.isConfirmClick) {
          return callback(rs.data);
        }
        return of(setResult);
      })
    );
  };

  resolvePreviewConflicted = (
    setResult: CapacityDataSetResultModel
  ): Observable<CapacityDataSetResultModel> => {
    return this.openConflictDialog(
      setResult,
      'Capacity data conflict viewer',
      true,
      true
    ).pipe(
      switchMap((rs: IDialogConfirm) => {
        return of(setResult);
      })
    );
  };

  private openConflictDialog(
    setResult: CapacityDataSetResultModel,
    title: string,
    readOnly = false,
    preview = false
  ): Observable<any> {
    const injector = Injector.create({
      providers: [
        {
          provide: CapacityDataConflictDialogModel,
          useValue: toCapacityDataConflictDialogModel(
            setResult,
            readOnly,
            preview
          ),
          deps: [],
        },
      ],
    });
    const config = {
      title: title,
      component: ConflictResolutionDialogComponent,
      injector: injector,
    };

    return this._dialogService.open(config).afterClosed();
  }
}
