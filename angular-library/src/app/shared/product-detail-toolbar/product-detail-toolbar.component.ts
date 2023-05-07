import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';
import { IDialogConfirm } from '../dialog/model';
import { DialogService } from '../dialog/dialog.service';
import { DeleteDialogComponent } from '../dialog/delete/delete-dialog.component';
import { SAVE_WITH_COMMENT_TOKEN } from '../dialog/dialog.module';
import { SaveWithCommentDialogComponent } from '../dialog/save-with-comment/save-comment-dialog.component';


@Component({
  selector: 'cdm-product-detail-toolbar',
  templateUrl: './product-detail-toolbar.component.html',
  styleUrls: ['./product-detail-toolbar.component.scss'],
})
export class ProductDetailToolbarComponent implements OnChanges {
  @Input() isPreviewDisabled: boolean = false;
  @Input() isPreviewMode: boolean;
  @Input() isSaveDisabled: boolean = false;
  @Input() isCurrentHierarchyLevelDefault: boolean = false;
  @Input() isDeleteDisabled: boolean = false;
  @Input() isSavePermittedForHierarchyType: boolean = true;
  @Input() canShowEditingDisabledTooltip: boolean = false;
  @Input() editingDisabledTooltipContent: string;
  @Input() inheritancePopoverContent: any;
  @Input() canShowValidationTooltip: boolean = false;
  @Input() canShowInheritanceIcon: boolean = false;
  @Input() isDirty: boolean = false;
  @Input() isPreviewVisible: boolean = true;
  @Input() isOverrideDefaultButton: boolean = false;
  @Input() canShowHierarchyLevelDefault: boolean = true;
  @Input() validationTooltipContent: any;
  @Input() isReleased: boolean = false;
  @Input() leftContentTemplate: TemplateRef<any>;
  @Input() shouldShowDelete: boolean = true;
  @Input() get willSubmitOverrideExceptions(): boolean {
    return this._willSubmitOverrideExceptions;
  }
  set willSubmitOverrideExceptions(value: boolean) {
    this._willSubmitOverrideExceptions = value;
    this.willSubmitOverrideExceptionsChange.next(value);
  }
  @Output() onSaveWithComment = new EventEmitter<IDialogConfirm>();
  @Output() onSave = new EventEmitter();
  @Output() onDelete = new EventEmitter<IDialogConfirm>();
  @Output() isPreviewModeChange = new EventEmitter<boolean>();
  @Output() refreshPreviewList = new EventEmitter<any>();
  @Output() willSubmitOverrideExceptionsChange = new EventEmitter<boolean>();

  private _willSubmitOverrideExceptions: boolean = false;
  shouldShowWarningIndicator: boolean;

  constructor(private dialogService: DialogService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.shouldShowWarningIndicator =
      this.canShowHierarchyLevelDefault && !this.isCurrentHierarchyLevelDefault;
  }

  delete() {
    const config = {
      title: 'Confirmation',
      component: DeleteDialogComponent,
    };

    this.dialogService
      .open(config)
      .afterClosed()
      .subscribe((rs: IDialogConfirm) => {
        this.onDelete.emit({
          ...rs,
          willSubmitOverrideExceptions: this.willSubmitOverrideExceptions,
        });
        this.willSubmitOverrideExceptions = false;
      });
  }

  save() {
    this.onSave.emit();
  }

  previewChange() {
    this.isPreviewModeChange.next(!this.isPreviewMode);
  }
  commentAndSave() {
    const injector = Injector.create({
      providers: [
        {
          provide: SAVE_WITH_COMMENT_TOKEN,
          useValue:
            this.canShowInheritanceIcon && this.isDirty
              ? 'You are overriding inherited value, please state your reason for this change:'
              : 'Please state your reason for this change:',
          deps: [],
        },
      ],
    });
    const config = {
      title: 'Infor',
      injector: injector,
      component: SaveWithCommentDialogComponent,
    };
    this.dialogService
      .open(config)
      .afterClosed()
      .subscribe((rs: IDialogConfirm) => {
        this.onSaveWithComment.emit({
          ...rs,
          willSubmitOverrideExceptions: this.willSubmitOverrideExceptions,
        });
        this.willSubmitOverrideExceptions = false;
      });
  }
}
