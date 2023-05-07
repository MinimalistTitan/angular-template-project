import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { IDialogConfirm } from '../model';
import { ConfirmDialogModel } from './confirm-dialog.model';

@Component({
  selector: 'cdm-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
  form: FormGroup;
  setting: ConfirmDialogModel;

  constructor(
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.form = this.setting.showComment ? new FormGroup({
      comment: new FormControl('', Validators.required)
    }) : null;
  }

  cancelClicked() {
    this._dialogService.close({
      isConfirmClick: false,
    } as IDialogConfirm);
  }

  confirmClicked() {
    if (this.form?.invalid) {
      return;
    }

    this._dialogService.close({
      isConfirmClick: true,
      data: this.form ? this.form.value : undefined,
    } as IDialogConfirm);
  }
}
