import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SAVE_WITH_COMMENT_TOKEN } from '../dialog.module';
import { DialogService } from '../dialog.service';
import { IDialogConfirm } from '../model';


@Component({
    selector: 'cdm-save-comment-dialog',
    templateUrl: './save-comment-dialog.component.html',
    styleUrls: []
})
export class SaveWithCommentDialogComponent implements OnInit {
    form: FormGroup;
    inform:string
    constructor(@Inject(SAVE_WITH_COMMENT_TOKEN) private subTitle: string, private dialogService: DialogService) {
        this.inform = subTitle;
    }
    ngOnInit(): void {
        this.form = new FormGroup({
            comment: new FormControl('', Validators.required)
        });
    }
    public cancel() {
        this.dialogService.close({
            isConfirmClick: false
        } as IDialogConfirm);
    }

    saveWithComment() {
        this.dialogService.close({
            data: this.form.get('comment').value,
            isConfirmClick: true
        } as IDialogConfirm);
    }
}