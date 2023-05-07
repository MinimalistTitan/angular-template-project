import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { cloneDeep, find, isArray, omit, isEqualWith, isEqual } from 'lodash';
import { Subscription, map, debounceTime } from 'rxjs';
import { CapacityDataAccordionService } from '../capacity-data-accordion.service';
import { ICapacityData, ICapacityDataDetail } from 'src/app/models/capacity';
import { AccordionItemModel, PageHierarchyLevel } from 'src/app/share/accordion';
import { IProductMaterialSelection, IProductNodePath } from 'src/app/models/products';
import { ROLE_ASSIGNMENT, RoleAssignment, Roles } from 'src/app/models/user/role';
import { ReadOnlyCauseEnum } from 'src/app/models/enums';
import { RESOURCES } from 'src/app/models';
import { ignoreUndefinedAndNull } from 'src/app/utilities/array';
export const NONE_VALUE_FIELD = [
  'descriptor',
  'isDefined',
  'isOptionalEmpty',
  'isValid',
  'materialPath',
  'capacityDataDescriptor',
  'tmc5dataSource',
  'engagementType'
];
@Directive({
  selector: '[cdmCapacityDataBase]',
})
export class CapacityDataBaseDirective<
  TModel extends ICapacityDataDetail<ICapacityData>
> implements AfterViewInit, OnChanges
{
  willSubmitOverrideExceptions: boolean = false;
  accordion: AccordionItemModel;
  @Input() busyDetail = false;
  @Input() defaultHierarchyLevel: PageHierarchyLevel[];
  form: FormGroup = new FormGroup({
    capacityData: new FormArray([]),
  });
  private _value: TModel[] = [];
  protected clonedValue: TModel[] = [];
  @Input() get value(): TModel[] {
    return this._value;
  }
  set value(value: TModel[]) {
    this._value = value || [];
    this.clonedValue = cloneDeep(this._value);
    const form = this.createForm(this._value);
    if (
      !isEqual(this.productSelection, this._clonedProductSelection) &&
      !!this._value.length
    ) {
      this.form = form;
      this.emitDataChanges(this._value);
      this.registerValueChanges();
      this._clonedProductSelection = cloneDeep(this.productSelection);
    } else {
      this.form.patchValue(form.getRawValue(), { emitEvent: true });
      this.valuePatched(value);
    }
    this.willSubmitOverrideExceptions = false;
    this.accordionService.accordionDirtyChanged$.next(false);
    this.cloneRawValue();
    this.valueChange.next(value);
  }

  @Output() capacityDataChanged = new EventEmitter<
    ICapacityDataDetail<ICapacityData>[]
  >();
  @Input() productSelection: IProductMaterialSelection;
  protected _clonedProductSelection: IProductMaterialSelection;

  @Output() valueChange = new EventEmitter<TModel[]>();
  get productPath(): IProductNodePath {
    return this.productSelection?.productPath;
  }

  get capacityData() {
    return this.form.get('capacityData') as FormArray;
  }

  get isCurrentHierarchyLevelDefault(): boolean {
    if (!this.productPath?.nodes?.length) return false;

    const found = find(
      this.defaultHierarchyLevel,
      (p) =>
        (p.type !== null && p.type === this.productPath.hierarchyType) ||
        p.type === null
    );

    if (!found) return false;

    return found.value + 1 === this.productPath.nodes.length;
  }

  rawValue: TModel[] = [];

  get isModelValidForDelete(): boolean {
    return this.validateModel(
      this.rawValue,
      this.clonedValue,
      (model, origModel) => {
        if (origModel?.descriptor?.isReadOnly) return true;
        return !(!origModel?.isDefined || origModel?.descriptor?.isInherited);
      }
    );
  }
  get isModelValidForSave(): boolean {
    return this.validateModel(
      this.rawValue,
      this.clonedValue,
      (model, origModel) => {
        return (
          (model.isDefined && model.isValid) ||
          origModel?.descriptor?.isReadOnly ||
          model.isOptionalEmpty
        );
      }
    );
  }

  invisible: boolean;
  invisibleReason: string;

  protected isDirty: boolean;
  protected isNestedCapacityData = false;
  protected hasFormValidation = true;

  savePermittedRoles: Roles;
  protected _sub$ = new Subscription();
  protected _valueChanges$: Subscription;
  constructor(
    protected fb: FormBuilder,
    protected accordionService: CapacityDataAccordionService,
    @Inject(ROLE_ASSIGNMENT) roleAssignment: RoleAssignment
  ) {
    this.extractRoleAssignment(roleAssignment);
  }

  ngAfterViewInit(): void {
    this._sub$.add(
      this.accordionService.accordionOpened$.subscribe((item) => {
        this.accordionService.currentAccordion = item;
        this.accordion = item;
      })
    );
  }

  createForm(value: TModel[]) {
    let controlsConfig: any = {
      capacityData: this.fb.array(value.map((ite) => this.setSubForm(ite))),
    };
    return this.fb.group(controlsConfig);
  }

  valuePatched(data: TModel[]) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (!!this._sub$) {
      this._sub$.unsubscribe();
    }
    if (!!this._valueChanges$) {
      this._valueChanges$.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  mapModel(data): TModel[] {
    return data;
  }
  get canShowValidationTooltip(): boolean {
    return false;
  }
  get canShowInheritanceIcon(): boolean {
    return false;
  }
  get inheritancePopoverContent(): any {
    return null;
  }
  get canShowEditingDisabledTooltip(): boolean {
    return false;
  }
  valueChanged(data: TModel[]) {}

  cloneRawValue() {
    const original = cloneDeep(this.clonedValue);
    const rawValue = this.capacityData?.getRawValue();
    this.rawValue =
      !rawValue.flat(1).length || !original.flat().length
        ? []
        : rawValue.map((item, index) => {
            if (this.isNestedCapacityData) {
              Object.assign(
                original[index].capacityData,
                omit(item, NONE_VALUE_FIELD)
              );
            } else {
              Object.assign(original[index], item);
            }

            return original[index];
          });
  }

  protected checkDirty = () => {  
    return !isEqualWith(
      this.rawValue.flatMap((_) => omit(_, NONE_VALUE_FIELD)),
      this.clonedValue.flatMap((_) => omit(_, NONE_VALUE_FIELD)),
      ignoreUndefinedAndNull
    );
  };

  prepareAccordionData = (data: TModel[]) => data;

  getReadOnlyCauseTooltip(descriptor): string {
    const { readOnlyCause } = descriptor.value || {};
    if (!readOnlyCause || readOnlyCause === ReadOnlyCauseEnum.None)
      return RESOURCES['EditingDisabledTooltip'];
    let enumValueName = ReadOnlyCauseEnum[readOnlyCause];
    return enumValueName
      ? RESOURCES[`EditingDisabledTooltip_${enumValueName}`]
      : RESOURCES['EditingDisabledTooltip'];
  }

  private extractRoleAssignment(roleAssignment: RoleAssignment) {
    this.savePermittedRoles = (
      roleAssignment || { savePermittedRoles: [] }
    ).savePermittedRoles;
  }

  protected registerValueChanges() {
    if (!!this._valueChanges$) {
      this._valueChanges$.unsubscribe();
    }
    this._valueChanges$ = this.capacityData.valueChanges
      .pipe(
        debounceTime(300),
        map((data) => this.mapModel(data))
      )
      .subscribe((data) => {
        this.valueChanged(data);
        this.cloneRawValue();
        this.emitDirtyChanged();
        this.emitDataChanges(data);
      });
  }

  protected emitDataChanges(data: TModel[]) {
    this._value = data;
    if (!!this.accordion) {
      this.accordion.data = this.prepareAccordionData(data);
      this.capacityDataChanged.next(this.accordion.data);
    }
  }

  protected validateModel(currentModel, originalModel, validateFn): boolean {
    if (!originalModel?.length || !currentModel?.length) return false;

    function isReadOnly(modelPerMaterial) {
      return modelPerMaterial?.descriptor?.isReadOnly;
    }

    function isOptionalEmpty(modelPerMaterial) {
      return modelPerMaterial.isOptionalEmpty;
    }

    if (isArray(currentModel)) {
      if (originalModel.every(isReadOnly)) return false;
      if (currentModel.length === 1 && isOptionalEmpty(currentModel[0]))
        return false;

      return currentModel.every((modelPerMaterial, idx) =>
        validateFn(modelPerMaterial, originalModel[idx])
      );
    } else {
      if (isReadOnly(originalModel)) return false;
      if (isOptionalEmpty(currentModel)) return false;
      return validateFn(currentModel, originalModel);
    }
  }

  private setSubForm(capacity: TModel) {
    return this.fb.group({
      ...capacity,
    });
  }

  private emitDirtyChanged() {
    if (this.hasFormValidation) {
      this.isDirty = this.checkDirty();
      this.accordionService.accordionDirtyChanged$.next(this.isDirty);
    }
  }
}

