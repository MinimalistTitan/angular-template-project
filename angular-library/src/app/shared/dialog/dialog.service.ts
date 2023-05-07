import { Injectable, Injector, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { IDialogConfig, IDialogConfirm } from './model';
import { DialogComponent } from './dialog.component';
import { ConfirmDialogModel } from './confirm-dialog/confirm-dialog.model';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<DialogComponent>;
  public open(config: IDialogConfig): MatDialogRef<DialogComponent> {
    this.dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'cdm-dialog-container',
      width: config.width,
      minHeight: config.minHeight,
      data: config,
      position: {
        top: config.position?.top,
      },
      disableClose: config.disableClose,
    });

    return this.dialogRef;
  }

  public openFromTemplate(
    templateRef: TemplateRef<any>,
    config?: IDialogConfig
  ): MatDialogRef<DialogComponent> {
    this.dialogRef = this.dialog.open(templateRef, {
      panelClass: 'cdm-dialog-container',
      position: {
        top: config?.position?.top,
      },
    });
    return this.dialogRef;
  }

  public close(result?: any) {
    this.dialogRef.close(result);
  }

  confirm(data: ConfirmDialogModel): Promise<IDialogConfirm> {
    const injector = Injector.create({
      providers: [
        {
          provide: ConfirmDialogModel,
          useValue: data,
          deps: [],
        },
      ],
    });

    this.dialogRef = this.open({
      title: data.title,
      component: ConfirmDialogComponent,
      injector: injector,
      disableClose: true,
    });

    return new Promise((resolve) => {
      this.dialogRef
        .afterClosed()
        .subscribe((event: IDialogConfirm) => resolve(event));
    });
  }

  confirmAsync(data: ConfirmDialogModel): Observable<IDialogConfirm> {
    const injector = Injector.create({
      providers: [
        {
          provide: ConfirmDialogModel,
          useValue: data,
          deps: [],
        },
      ],
    });

    this.dialogRef = this.open({
      title: data.title,
      component: ConfirmDialogComponent,
      injector: injector,
      disableClose: true,
    });

    return this.dialogRef.afterClosed();
  }

  confirmDiscardChanges = (): Observable<boolean> => this.confirmAsync({
    title: 'Warning',
    message: 'There are unsaved changes of capacity data. Do you want to continue editing or leave without saving?',
    confirmText: 'Continue Editing',
    cancelText: 'Leave without saving',
  }).pipe(map(evt => !evt.isConfirmClick));
}
