import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogConfig } from './model';
@Component({
    selector: 'cdm-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: []
})
export class DialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public config: IDialogConfig, private mdDialogRef: MatDialogRef<DialogComponent>) { }

    @HostListener("keydown.esc")
    public onEsc() {
        this.mdDialogRef.close();
    }
}