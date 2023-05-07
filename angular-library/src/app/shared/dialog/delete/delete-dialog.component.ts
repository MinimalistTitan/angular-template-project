import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { IDialogConfirm } from '../model';


@Component({
    selector: 'cdm-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: []
})
export class DeleteDialogComponent implements OnInit {
    form: FormGroup;
    constructor(private dialogService: DialogService) {
    }
    ngOnInit(): void {
        this.form = new FormGroup({
            comment: new FormControl('')
        });
    }
    public cancel() {
        this.dialogService.close({
            isConfirmClick: false
        } as IDialogConfirm);
    }

    delete() {
        this.dialogService.close({
            data: this.form.get('comment').value,
            isConfirmClick: true
        } as IDialogConfirm);
    }
}