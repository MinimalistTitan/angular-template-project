import { MatDialogModule } from '@angular/material/dialog';
import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete/delete-dialog.component';
import { ConflictResolutionDialogComponent } from './conflict-resolution/conflict-resolution.component';
import { MatTableModule } from '@angular/material/table';
import { SaveWithCommentDialogComponent } from './save-with-comment/save-comment-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommaSeparatedValuesToIndividualLinesPipe } from './conflict-resolution/comma-separated-calues-to-individual-lines.pipe';
import { PopoverModule } from '../popover/popover.module';
export const SAVE_WITH_COMMENT_TOKEN = new InjectionToken<string>('SAVE_WITH_COMMENT_TOKEN');
@NgModule({
  declarations: [
    DialogComponent,
    SaveWithCommentDialogComponent,
    DeleteDialogComponent,
    ConflictResolutionDialogComponent,
    ConfirmDialogComponent,
    CommaSeparatedValuesToIndividualLinesPipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    PopoverModule,
  ],
  exports: [
    DialogComponent,
    SaveWithCommentDialogComponent,
    DeleteDialogComponent,
    ConflictResolutionDialogComponent,
  ],
  providers: [DialogService],
})
export class DialogModule {}
