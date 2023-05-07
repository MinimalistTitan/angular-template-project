import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CapacityDataAccordionService } from '../capacity-data-accordion.service';
import { ProductDetailToolbarComponent } from 'src/app/share/product-detail-toolbar/product-detail-toolbar.component';
import { AccordionItemModel, PageHierarchyLevel } from 'src/app/share/accordion';
import { CapacityDataPageEnum, ProductHierarchyTypeEnum, TabsEnum } from 'src/app/models/enums';
import { UserService } from 'src/app/core/services/user.service';
import { IDialogConfirm } from 'src/app/share/dialog/model';
import { checkRoleForHierarchyType } from 'src/app/models/user/role';

export interface ISecurityRoles {
  roles: any;
}
@Component({
  selector: 'cdm-capacity-data-base',
  templateUrl: './capacity-data-base.component.html',
})
export class CapacityDataBaseComponent {
  @ViewChild(ProductDetailToolbarComponent)
  toolbarInstance: ProductDetailToolbarComponent;

  @Input() defaultHierarchyLevel: PageHierarchyLevel[];
  @Input() form: FormGroup;
  @Input() hasFormValidation = true; // TODO define logic
  @Input() hierarchyType: ProductHierarchyTypeEnum;
  @Input() isCurrentHierarchyLevelDefault: boolean;
  @Input() isModelValidForDelete: boolean;
  @Input() isModelValidForSave: boolean;
  @Input() isDirty: boolean;
  @Input() isSingleObject: boolean = false;
  @Input() toolbarTpl: TemplateRef<HTMLElement>;
  @Input() invisibleContent: TemplateRef<HTMLElement>;
  @Input() isPreviewVisible: boolean = true;
  @Input() canShowInheritanceIcon: boolean = false;
  @Input() canShowValidationTooltip: boolean = false;
  @Input() canShowEditingDisabledTooltip: boolean = false;
  @Input() inheritancePopoverContent: any;
  @Input() isOverrideDefaultButton: boolean = false;
  @Input() canShowHierarchyLevelDefault: boolean = true;
  @Input() validationTooltipContent: any;
  @Input() isReleased: false;
  @Input() leftContentTemplate: TemplateRef<any>;
  @Input() shouldShowDelete: boolean = true;
  @Input() invisible: boolean;
  @Input() invisibleReason: string;
  @Input() willSubmitOverrideExceptions: boolean = false;
  @Input() savePermittedRoles = [];

  accordion: AccordionItemModel;
  capacityDataPage = CapacityDataPageEnum;
  exportInfoHtmlContent: string;

  get isPreviewDisabled(): boolean {
    if (this.hasFormValidation) {
      if (!this.form) return false;
      return this.form.invalid || !this.isModelValidForSave;
    } else {
      return !this.isModelValidForSave;
    }
  }

  get TabEnumKey() {
    return TabsEnum[this.accordion?.id];
  }

  get isSaveDisabled(): boolean {
    if (this.hasFormValidation) {
      if (!this.form) return false;
      return (
        this.form.invalid ||
        !this.isModelValidForSave ||
        !this.isSavePermittedForHierarchyType
      );
    } else {
      return !this.isModelValidForSave || !this.isSavePermittedForHierarchyType;
    }
  }

  get isDeleteDisabled(): boolean {
    return !this.isModelValidForDelete || !this.isSavePermittedForHierarchyType;
  }

  get isSavePermittedForHierarchyType(): boolean {
    return checkRoleForHierarchyType(
      this.savePermittedRoles,
      this.hierarchyType,
      this.userService.hasRole.bind(this.userService)
    );
  }

  private _sub$ = new Subscription();
  accordionLoading$: Observable<boolean>;
  constructor(
    protected accordionService: CapacityDataAccordionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._sub$.add(
      this.accordionService.accordionOpened$.subscribe((item) => {
        this.accordionService.currentAccordion = item;
        this.accordion = item;
        this.willSubmitOverrideExceptions = false;
      })
    );

    this.accordionLoading$ = this.accordionService.accordionLoadingChanged$.asObservable();
  }

  ngOnDestroy(): void {
    if (!!this._sub$) {
      this._sub$.unsubscribe();
    }
  }

  onSaveWithComment(event: IDialogConfirm) {
    if (!event) {
      this.toolbarInstance.commentAndSave();
    } else if (!!event && event.isConfirmClick) {
      this.accordionService.accordionSaveWithCommentClicked$.next({
        comment: event.data,
        deleteExceptions: event.willSubmitOverrideExceptions,
        item: this.accordion,
        isSingleObject: this.isSingleObject,
      });
    }
  }

  refreshPreviewList() {
    this.accordionService.refreshPreviewList$.next(this.isSingleObject);
  }

  onSave() {
    this.accordionService.accordionSaveClicked$.next({
      item: this.accordion,
      isSingleObject: this.isSingleObject,
    });
  }

  onDeleteWithComment(event: IDialogConfirm) {
    if (event.isConfirmClick) {
      this.accordionService.accordionDeleteWithCommentClicked$.next({
        comment: event.data,
        deleteExceptions: false,
        item: this.accordion,
        isSingleObject: this.isSingleObject,
      });
    }
  }
}
