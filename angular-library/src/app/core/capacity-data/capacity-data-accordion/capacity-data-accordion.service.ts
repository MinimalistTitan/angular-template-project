import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccordionItemModel } from 'src/app/share/accordion';
import { DialogService } from 'src/app/share/dialog/dialog.service';


export interface PreviewModeInfo {
  activated: boolean;
  isSingleObject?: boolean;
}

@Injectable()
export class CapacityDataAccordionService {
  accordionOpened$ = new BehaviorSubject<AccordionItemModel>(null);
  accordionSaveClicked$ = new Subject<{
    item: AccordionItemModel;
    isSingleObject: boolean;
  }>();
  accordionSaveWithCommentClicked$ = new Subject<{
    comment: string;
    deleteExceptions: boolean;
    item: AccordionItemModel;
    isSingleObject: boolean;
  }>();
  accordionDeleteWithCommentClicked$ = new Subject<any>();
  accordionPreviewModeChanged$ = new BehaviorSubject<PreviewModeInfo>(null);
  refreshPreviewList$ = new BehaviorSubject<boolean>(null);
  private _isPreviewModeEnabled = false;

  get isPreviewModeEnabled(): boolean {
    return this._isPreviewModeEnabled;
  }
  currentAccordion: AccordionItemModel;
  accordionDirtyChanged$ = new BehaviorSubject<boolean>(false);
  accordionLoadingChanged$ = new BehaviorSubject<boolean>(false);
  constructor(private _dialogService: DialogService) {}

  activatePreviewMode(isSingleObject?: boolean) {
    this._isPreviewModeEnabled = true;
    this.accordionPreviewModeChanged$.next({ activated: true, isSingleObject });
  }

  deactivatePreviewMode(isSingleObject?: boolean) {
    this._isPreviewModeEnabled = false;
    this.accordionPreviewModeChanged$.next({
      activated: false,
      isSingleObject,
    });
  }

  changePreviewMode(activated: boolean, isSingleObject?: boolean) {
    this._isPreviewModeEnabled = activated;
    this.accordionPreviewModeChanged$.next({ activated, isSingleObject });
  }

  memoizeAndNotifyOpened(item: AccordionItemModel) {
    this.currentAccordion = item;
    this.accordionOpened$.next(item);
  }

  confirmDiscardChanges(): Promise<boolean> {
    return this._dialogService
      .confirm({
        title: 'Warning',
        message:
          'There are unsaved changes of capacity data. Do you want to continue editing or leave without saving?',
        confirmText: 'Continue Editing',
        cancelText: 'Leave without saving',
      })
      .then((res) => new Promise((resolve) => resolve(res.isConfirmClick)));
  }
}
