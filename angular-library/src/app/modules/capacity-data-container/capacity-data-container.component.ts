import {
  Observable,
  of,
  TeardownLogic,
  catchError,
  BehaviorSubject,
  takeUntil,
  Subscription,
  finalize,
  map,
  forkJoin,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { ComponentCanDeactivate } from '../guards/pending-changes.guard';
import { IHierarchyColumn, IHierarchyGridItem } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { CdmSubModule } from 'src/app/share/shared.enum';
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { CapacityDataGridComponent } from 'src/app/core/capacity-data/capacity-data-grid/capacity-data-grid.component';
import { AccordionItemModel, getProductDataUrlSegment } from 'src/app/share/accordion/accordion.model';
import { HierarchyTreeItemModel } from 'src/app/share/tree-view/tree-view.model';
import { IProductMaterialSelection } from 'src/app/models/products/product-material-selection';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { Hierarchy, IAccordionSetting, IDictionary, ProductHierarchies } from 'src/app/models';
import { IHierarchyProduct, toProductNodePath } from 'src/app/models/products';
import { IAuditLog } from 'src/app/models/audit-log';
import { CapacityDataGridType } from 'src/app/core/capacity-data/capacity-data-grid/capacity-data-grid.enum';
import { cloneDeep, first, isEqual } from 'lodash';
import { TreeViewComponent } from 'src/app/share/tree-view/tree-view.component';
import { CapacityDataTabsValidationModel, ICapacityData, ICapacityDataDetail } from 'src/app/models/capacity';
import { IMaterial, IMaterialNodePath } from 'src/app/models/materials/material-node-path';
import { CAPACITY_DATA_GRID_COLUMN, isAuditLogSupported, isHierarchyProductSupported } from 'src/app/core/capacity-data/capacity-data.const';
import { MaterialIsoCodeComponent } from 'src/app/share/material-iso-code/material-iso-code.component';
import { CapacityDataStore } from 'src/app/core/capacity-data';
import { MaterialCode } from 'src/app/share/material-iso-code/material.interface';
import { ITreeFlatNode } from 'src/app/share/tree-view/tree-view.interface';
import { CommonService } from 'src/app/core/services/common.service';
import { CapacityDataService } from 'src/app/core/capacity-data/capacity-data.service';
import { CapacityDataAccordionService, PreviewModeInfo } from 'src/app/core/capacity-data/capacity-data-accordion/capacity-data-accordion.service';
import { Store } from '@ngrx/store';
import { Accordion2Component } from 'src/app/share/accordion/accordion2.component';
import { AccordionItemContentDirective } from 'src/app/share/accordion/accordion-item-content.directive';
import { HttpCancellationPublisher } from 'src/app/core/services/http-cancellation.publisher';
import { ProductService } from 'src/app/core/services/product.service';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { CollapseExpandGridState } from 'src/app/share/hierarchy-grid/hierarchy-grid.model';
import { GetGridRowCollapseExpandState } from 'src/app/store/actions/grid-row-collapse-expand-state.actions';
import { ProductHierarchiesFilter } from 'src/app/share/product-hierarchy-filter/product-hierarchy-filter.component';
import { CapacityDataSetResultModel } from 'src/app/models/capacity/capacity-data-set-result.model';
import { ProductHierarchyFilterResult } from 'src/app/share/product-hierarchy-filter/models/product-hierarchy.model';
import { transformGridRowColorForStartValue } from 'src/app/models/start-values/start-values.model';
import { ProductDataOperationAreaGraphModel } from 'src/app/models/operation-area-graph/operation-area-graph.model';
import { PRODUCT_PARAMETER_FILTER } from 'src/app/share/product-hierarchy-filter/product-hierarchy-filter.const';
import { toPreviewGridItem } from 'src/app/core/capacity-data/capacity-data-grid';

@Component({
  selector: 'cdm-capacity-data-container',
  templateUrl: './capacity-data-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CapacityDataStore],
  styles: [':host{.accordion-panel{ max-width: calc(100vw - 395px)}}'],
})
export class CapacityDataContainerComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  readonly CdmSubModule = CdmSubModule;

  @Input() accordionsDictionary: IDictionary<IAccordionSetting[]>;
  @Input() columnsDictionary: IDictionary<IHierarchyColumn[]>;
  @Input() subModulesDictionary: IDictionary<ProductHierarchyTypeEnum>;
  @Input() moduleOwnAccordion: boolean = false;
  @ViewChild(Accordion2Component) accordionInstance: Accordion2Component;
  @ContentChildren(AccordionItemContentDirective)
  externalTemplates: QueryList<AccordionItemContentDirective>;
  @ViewChild(TreeViewComponent) treeViewCrl: TreeViewComponent;
  @ViewChild(CapacityDataGridComponent) gridViewCrl: CapacityDataGridComponent;
  @ViewChild(MaterialIsoCodeComponent)
  materialFilterCtrl: MaterialIsoCodeComponent;
  isAuditLogVisible = true;
  isProductVisible = true;
  accordionItems: AccordionItemModel[] = [];
  treeViewData?: HierarchyTreeItemModel[] = [];
  clonedTreeViewData?: HierarchyTreeItemModel[] = [];
  subModule: CdmSubModule;
  productDataDetail: ICapacityDataDetail<ICapacityData>[];
  tabs = CdmAccordionRoute;
  productMaterialSelection: IProductMaterialSelection = {
    materials: [],
    productPath: {},
    filters: null,
  };
  fileNameToExport = 'Export';
  currentTab: AccordionItemModel;
  materials: IMaterial[];
  productHierarchies: ProductHierarchies;
  hierarchyFilterParams: string[] = [];
  contentExpanded: boolean;
  gridDataSource: Array<IHierarchyGridItem | IHierarchyProduct | IAuditLog>;
  materialsValidation: IMaterial[] = [];
  isMaterialFirstLoad: boolean = false;
  private _capacityGridDataSources: IDictionary<
    Array<IHierarchyGridItem | IHierarchyProduct | IAuditLog>
  > = {
      [CapacityDataGridType.Hierarchy]: [],
      [CapacityDataGridType.Product]: [],
      [CapacityDataGridType.AuditLog]: [],
    };
  capacityGridColumns = cloneDeep(CAPACITY_DATA_GRID_COLUMN);
  private _capacityGridDataRequested: IDictionary<boolean> = {
    [CapacityDataGridType.Hierarchy]: false,
    [CapacityDataGridType.Product]: false,
    [CapacityDataGridType.AuditLog]: false,
  };
  capacityPreviewDataSource: IHierarchyGridItem[];
  private _capacityDataReloading = false;

  previewMode$: Observable<boolean>;
  accordionDirty$: Observable<boolean>;
  accordionLoading$: Observable<boolean>;
  treeLoading$: Observable<boolean>;
  gridLoading$: Observable<boolean>;
  protected _isGridBusy = false;
  protected _treeLoadingChanged$ = new BehaviorSubject<boolean>(true);
  protected _gridLoadingChanged$ = new BehaviorSubject<boolean>(true);
  isColumnValueRequired = false;
  private get _isPayloadRequestChanged(): boolean {
    return !isEqual(
      this._clonedProductMaterialSelection,
      this.productMaterialSelection
    );
  }

  private get _isGridDataBlank(): boolean {
    return !this._capacityGridDataSources[this.gridViewCrl?.currentMode].length;
  }

  private get _isDataSourceLoaded(): boolean {
    return this._capacityGridDataRequested[this.gridViewCrl?.currentMode];
  }

  private get _ignoreReloadGrid(): boolean {
    return (
      !this.currentTab ||
      this._isGridBusy ||
      !this.productMaterialSelection.materials?.length
    );
  }

  private get _isInputValid(): boolean {
    return (
      !!this.accordionsDictionary &&
      !!this.columnsDictionary &&
      !!this.subModulesDictionary
    );
  }

  protected get _hierarchyGridData$(): Observable<IHierarchyGridItem[]> {
    if (this.commonService.isChartSupported(this.currentTab?.name))
      return of([]);
    //
    return this.commonService
      .getList(
        getProductDataUrlSegment(this.currentTab),
        this.productMaterialSelection
      )
      .pipe(
        map((data) =>
          data.map((_) =>
            !!this.currentTab.mapToGridItem
              ? this.currentTab.mapToGridItem(_)
              : _
          )
        ),
        catchError(this.continueOnError)
      );
  }

  private get _accordionData$(): Observable<
    ICapacityDataDetail<ICapacityData>[]
  > {
    const isDataOnProduct = this.commonService.isActivatedOn(
      CdmSubModule.ProductData
    );
    if (
      isDataOnProduct &&
      !this.treeViewCrl.isLeafSelected &&
      !(this.currentTab.name === this.tabs.OperationArea)
    )
      return of([]);

    return this.getAccordionRequest(isDataOnProduct).pipe(
      map((data) =>
        data.map((_) =>
          !!this.currentTab.mapToAccordionItem
            ? this.currentTab.mapToAccordionItem(
              _,
              this.productMaterialSelection?.productPath,
              this.commonService.module
            )
            : _
        )
      ),
      catchError(this.continueOnError)
    );
  }

  private get _productData$(): Observable<IHierarchyProduct[]> {
    if (!!this._capacityGridDataRequested[CapacityDataGridType.Product]) {
      return of(
        this._capacityGridDataSources[
        CapacityDataGridType.Product
        ] as IHierarchyProduct[]
      );
    }
    return this.commonService.getProducts(
      this.productMaterialSelection.productPath
    );
  }

  private get _auditLogsData$(): Observable<IAuditLog[]> {
    if (!this.isAuditLogVisible) {
      return of([]);
    }
    return this.commonService.getAuditLogs(
      this.currentTab.id,
      this.productMaterialSelection
    );
  }

  protected get _hierarchyTree$(): Observable<Hierarchy> {
    return this.commonService.getHierarchy().pipe(
      finalize(() => {
        this._gridLoadingChanged$.next(false);
        this.accordionService.accordionLoadingChanged$.next(false);
        this._treeLoadingChanged$.next(false);
        this.accordionService.accordionDirtyChanged$.next(false);
        this.cd.detectChanges();
      }),
      map((data) => {
        const { tree, ...productHierarchies } = data;
        this.treeViewData = tree.map((node, index) => {
          if (!!node.parameters && node.parameters.isReleased !== undefined) {
            node.parameters.isNotReleased = !node.parameters.isReleased;
          }
          node.index = index;
          return node;
        });
        this.clonedTreeViewData = cloneDeep(this.treeViewData);
        this.productHierarchies = productHierarchies;

        this.initToggleFilterParams();
        return data;
      })
    );
  }

  private _skipConflictsResolving = false; // TODO check
  //#endregion

  private _clonedProductMaterialSelection: IProductMaterialSelection;
  private _subscriptions$ = new Subscription();

  constructor(
    protected commonService: CommonService,
    protected productService: ProductService,
    protected snackBar: MatSnackBar,
    protected cd: ChangeDetectorRef,
    protected _capacityService: CapacityDataService,
    protected accordionService: CapacityDataAccordionService,
    protected capacityDataStore: CapacityDataStore,
    protected store: Store,
    protected _cancellationPublisher: HttpCancellationPublisher
  ) { }
  ngOnDestroy(): void {
    if (!!this._subscriptions$) {
      this._subscriptions$.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this._isInputValid) {
      this.initSubs();
      this.getMaterials();
    } else {
      this.snackBar.open('Required inputs have not specified yet', 'Close', {
        panelClass: ['!bg-red-500', 'text-white'],
      });
    }
  }

  canDeactivate = () => this.accordionDirty$.pipe(map(dirty => !dirty));

  treeNodeSelected(node: ITreeFlatNode<HierarchyTreeItemModel>) {
    this.isMaterialFirstLoad = true;
    this._capacityDataReloading = isEqual(
      this.productMaterialSelection.productPath.nodes,
      node.paths
    );
    this.productMaterialSelection.productPath.nodes = node.paths;
    this.resetGridDataSource();
    this.updateAccordion(node.data.descriptor.capacityDataTabsValidations);
    this.accordionService.deactivatePreviewMode();
  }

  materialsChanged(values: IMaterialNodePath[]) {
    if (this.productMaterialSelection.materials.length == 0) {
      this.isMaterialFirstLoad = true
    }
    else if (!isEqual(this.productMaterialSelection.materials, values)) {
      this.isMaterialFirstLoad = false;
    }
    this.productMaterialSelection.materials = values;
    if (this.currentTab?.expanded && !this._capacityDataReloading) {
      this.resetGridDataSource();
      this.loadDataByNode();
    }
  }

  gridRowCollapseExpandStateEvent(value: CollapseExpandGridState[]) {
    const productPath = toProductNodePath(
      this.productMaterialSelection.productPath
    );
    const payload = this.buildPayLoadStoreGridState(
      this.commonService.module,
      this.subModule,
      this.currentTab.displayName,
      productPath.pathString,
      value
    );
    this.store.dispatch(GetGridRowCollapseExpandState({ payload }));
  }

  private buildPayLoadStoreGridState(
    module: string,
    subModule: string,
    accordion: string,
    productPath: string,
    gridRowState: CollapseExpandGridState[]
  ) {
    const payload: { [id: string]: boolean } = {};
    gridRowState.forEach((ite) => {
      const path = ite.path.split(MATERIAL_ARROW).join('>>');
      payload[`${module}-${subModule}-${accordion}-${productPath}-${path}`] =
        ite.expanded;
    });

    return payload;
  }

  accordionOpened(accordion: AccordionItemModel) {
    this.isMaterialFirstLoad = true;
    if (!!this.currentTab && !isEqual(this.currentTab.name, accordion.name)) {
      this.resetGridDataSource(true);
    }

    if (this._capacityDataReloading) {
      this._capacityDataReloading = isEqual(
        this.currentTab.name,
        accordion.name
      );
    }

    this.accordionService.deactivatePreviewMode();
    this.accordionService.memoizeAndNotifyOpened(accordion);
    this.currentTab = accordion;
    this.capacityDataStore.activateCapacityData(accordion);
    if (
      !isEqual(
        this.capacityGridColumns[CapacityDataGridType.Hierarchy],
        this.columnsDictionary[accordion.name]
      )
    ) {
      this.initColumnsBySubModule(accordion.name);
    }

    this.isAuditLogVisible = isAuditLogSupported(
      getProductDataUrlSegment(this.currentTab)
    );

    if (!this._capacityDataReloading) {
      this.loadDataByNode();
    }
  }

  performSavingChanges(
    accordion: { item: AccordionItemModel; isSingleObject: boolean },
    comment?: string,
    deleteExceptions: boolean = false,
    conflictData: any = null
  ) {
    this.accordionService.deactivatePreviewMode();
    const item = accordion.item;
    if (!item.data) return;
    this.setAccordionLoading(true);
    this.setCapacityData(
      item,
      comment,
      deleteExceptions,
      conflictData,
      accordion.isSingleObject
    )
      .pipe(finalize(() => this.setAccordionLoading(false)))
      .subscribe((res) => {
        if (res.hasConflicts) {
          this.handleSaveConflicted(res, item, comment, deleteExceptions);
        } else {
          if (res.data instanceof Array) {
            this.reloadCapacityData(res.data);
          } else {
            this.reloadCapacityData([
              res.data,
            ] as ICapacityDataDetail<ICapacityData>[]);
          }
        }
      });
  }

  performSaveChangesWithComment(saveWithCommentModel: {
    comment: string;
    deleteExceptions: boolean;
    item: AccordionItemModel;
    isSingleObject: boolean;
  }) {
    if (!saveWithCommentModel.item.data) return;
    this.performSavingChanges(
      {
        item: saveWithCommentModel.item,
        isSingleObject: saveWithCommentModel.isSingleObject,
      },
      saveWithCommentModel.comment,
      saveWithCommentModel.deleteExceptions
    );
  }

  performDeleteWithComment(deleteWithCommentModel: {
    comment: string;
    deleteExceptions: boolean;
    item: AccordionItemModel;
  }) {
    this.setLoading(true);
    this.commonService
      .remove(
        getProductDataUrlSegment(deleteWithCommentModel.item),
        this.productMaterialSelection,
        deleteWithCommentModel.comment
      )
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe((res) => {
        if (res.hasConflicts) {
          this.handleDeleteConflicted(res);
        } else {
          if (res.data instanceof Array) {
            this.reloadCapacityData(res.data);
          } else {
            this.reloadCapacityData([
              res.data,
            ] as ICapacityDataDetail<ICapacityData>[]);
          }
        }
      });
  }

  hierarchyFilterChanged(filter: Partial<ProductHierarchiesFilter>) {
    const selectedKeys = Object.keys(filter)
      .map((k) => filter[k] as ProductHierarchyFilterResult)
      .flat(1);

    if (this.subModule !== CdmSubModule.ProductAssignment) {
      const gradeFilters = selectedKeys.filter(
        (_) =>
          _.parameterName === PRODUCT_PARAMETER_FILTER['InternalGrade'] ||
          _.parameterName === PRODUCT_PARAMETER_FILTER['ExternalGrade']
      );
      gradeFilters.forEach((filter) => (filter.comparisonType = 'text'));
    }

    this.treeViewCrl.performFilter(selectedKeys);
  }

  gridDataRequested(data: { type: CapacityDataGridType; isRefresh: boolean }) {
    if (!!this.currentTab) {
      if (data.isRefresh) {
        this.accordionService.deactivatePreviewMode();
      }
    }
    if (
      this._isGridDataBlank ||
      data.isRefresh ||
      this._isPayloadRequestChanged ||
      !this._isDataSourceLoaded
    ) {
      this._capacityGridDataRequested[data.type] = false;
      this.setLoading(true);
      const currentViewMode = this.gridViewCrl?.currentMode;
      this.getGridData(data.type)
        .pipe(finalize(() => this.setLoading(false)))
        .subscribe((res) => {
          this.setGridDataSource(currentViewMode, res);
        });
    } else {
      this.gridDataSource = this._capacityGridDataSources[data.type];
    }
  }

  performGetPreviewList(isSingleObject = false) {
    const isDataOnProduct = this.commonService.isActivatedOn(
      CdmSubModule.ProductData
    );
    if (
      !this.currentTab ||
      this._isGridBusy ||
      isSingleObject === null ||
      this.commonService.isChartSupported(this.currentTab.name)
    )
      return;
    //
    this._gridLoadingChanged$.next(true);
    this.commonService
      .getPreviewList(
        getProductDataUrlSegment(this.currentTab),
        this.productMaterialSelection,
        this.currentTab.data,
        false,
        isSingleObject
      )
      .pipe(
        finalize(() => {
          this._gridLoadingChanged$.next(false);
          this.clonePayloadRequest();
        }),
        map((res) => {
          res.data = res.data.map((_) =>
            !!this.currentTab.mapToGridItem
              ? this.currentTab.mapToGridItem(_)
              : _
          );

          return res;
        })
      )
      .subscribe((res) => {
        if (!this._skipConflictsResolving && res.hasConflicts) {
          if (!!this.currentTab) {
            this.accordionService.changePreviewMode(!res.hasConflicts);
          }
          this.handlePreviewConflicted(res);
        } else {
          if (isDataOnProduct) {
            this.gridDataSource = res.data.map((ite) => ({ ...ite, rowClass: transformGridRowColorForStartValue(ite.isPublished) }));
          } else {
            this.gridDataSource = this.toPreviewGridItem(
              this._capacityGridDataSources[
              CapacityDataGridType.Hierarchy
              ] as IHierarchyGridItem[],
              res.data
            );
          }
        }
      });
  }

  get skipConflictResolving() {
    return this._skipConflictsResolving;
  }

  get capacityGridDataSources() {
    return this._capacityGridDataSources;
  }

  protected toPreviewGridItem(
    originalSource: IHierarchyGridItem[],
    data: IHierarchyGridItem[]
  ) {
    return toPreviewGridItem(originalSource, data);
  }

  validationsTabChange(tabValidations: CapacityDataTabsValidationModel[]) {
    const safelyTabValidations = tabValidations || [];
    this.accordionItems.forEach((item) => {
      item.disabled = false;
      const validationTabName = !!item.validationTabName
        ? item.validationTabName
        : item.id;
      const validatedResult = safelyTabValidations.find(
        (x) => x.tab === validationTabName
      );
      item.valid = !validatedResult || validatedResult.isValid;
    });
  }
  //#region  privates

  updateAccordion(tabValidations: CapacityDataTabsValidationModel[]) {
    this.validationsTabChange(tabValidations);

    let expandedItemIndex = this.accordionItems.findIndex((_) => !!_.expanded);
    if (expandedItemIndex < 0) {
      expandedItemIndex = this.accordionItems.length - 1;
    }
    setTimeout(
      () =>
        this.accordionInstance?.expandItem(
          this.accordionItems[expandedItemIndex],
          true
        ),
      50
    );
  }

  protected getGridData(
    viewMode: CapacityDataGridType
  ): Observable<Array<IHierarchyGridItem | IHierarchyProduct | IAuditLog>> {
    switch (viewMode) {
      case CapacityDataGridType.Hierarchy:
        return this._hierarchyGridData$;
      case CapacityDataGridType.Product:
        return this._productData$;
      case CapacityDataGridType.AuditLog:
        return this._auditLogsData$;
    }
  }

  protected initSubs() {
    this._subscriptions$.add(
      this.commonService.subModuleChange$.subscribe((subModule) => {
        this.subModule = subModule as CdmSubModule;
        this.getHierarchyTree();
        this.initAccordion(subModule);
        this.isProductVisible = isHierarchyProductSupported(subModule);
      })
    );
    this._subscriptions$.add(
      this.accordionService.accordionSaveClicked$
        .asObservable()
        .subscribe((data) => this.performSavingChanges(data))
    );
    this._subscriptions$.add(
      this.accordionService.accordionSaveWithCommentClicked$
        .asObservable()
        .subscribe((data) => this.performSaveChangesWithComment(data))
    );
    this._subscriptions$.add(
      this.accordionService.accordionDeleteWithCommentClicked$
        .asObservable()
        .subscribe((data) => this.performDeleteWithComment(data))
    );
    this._subscriptions$.add(
      this.accordionService.refreshPreviewList$.subscribe((data) =>
        this.performGetPreviewList(data)
      )
    );

    this.initObservableValues();
  }

  protected initObservableValues() {
    this.previewMode$ = this.accordionService.accordionPreviewModeChanged$
      .asObservable()
      .pipe(map((previewModeInfo) => this.previewModeChanged(previewModeInfo)));
    this.accordionDirty$ = this.accordionService.accordionDirtyChanged$.asObservable();
    this.treeLoading$ = this._treeLoadingChanged$.asObservable();
    this.gridLoading$ = this._gridLoadingChanged$.asObservable().pipe(map((value) => {
      this._isGridBusy = value;
      return value;
    }));
    this.accordionLoading$ = this.accordionService.accordionLoadingChanged$.asObservable();
  }

  protected addSubscription(teardown: TeardownLogic) {
    this._subscriptions$.add(teardown);
  }

  private initAccordion(subModule: string) {
    const items = this.accordionsDictionary[subModule].map(
      (_) =>
        new AccordionItemModel({
          name: _.name,
          productDetailSegment: _.productDetailSegment,
          displayName: _.displayName,
          disabled: true,
          id: _.id,
          pageName: _.pageName,
          productList: _.productList,
          mapToGridItem: _.mapToGridItem,
          mapToAccordionItem: _.mapToAccordionItem,
          validationTabName: _.validationTabName,
          activeTabName: _.activeTabName
        })
    );

    items.reverse();
    this.accordionItems = items;
    this.productMaterialSelection.productPath.hierarchyType =
      this.subModulesDictionary[subModule];
  }

  protected getHierarchyTree() {
    this._gridLoadingChanged$.next(false);
    this.accordionService.accordionLoadingChanged$.next(true);
    this._treeLoadingChanged$.next(true);
    this.cd.detectChanges();
    this._hierarchyTree$.subscribe((data) => { });
  }

  protected getMaterials() {
    this.productService
      .getMaterials()
      .subscribe((materials) => (this.materials = materials));
  }

  protected initToggleFilterParams() {
    const firstItem = first(this.treeViewData);
    if (!!firstItem?.parameters) {
      this.hierarchyFilterParams = Object.keys(firstItem.parameters);
    } else {
      this.hierarchyFilterParams = [];
    }
  }

  public reloadCapacityData(
    productDataDetail?: ICapacityDataDetail<ICapacityData>[]
  ) {
    if (!!productDataDetail && !!this.currentTab?.mapToAccordionItem) {
      this.productDataDetail = productDataDetail.map((_) =>
        this.currentTab.mapToAccordionItem(
          _,
          this.productMaterialSelection?.productPath,
          this.commonService.module
        )
      );
    }
    if (this.canValidateMaterials()) {
      this.validateMaterials().subscribe();
    }
    this._capacityDataReloading = true;
    const currentViewMode = this.gridViewCrl?.currentMode;
    this.setHierarchyLoading(true);
    forkJoin([this.getGridData(currentViewMode), this._hierarchyTree$])
      .pipe(
        finalize(() => {
          this.setHierarchyLoading(false);
          this._capacityDataReloading = false;
        })
      )
      .subscribe((res) => {
        this.setGridDataSource(currentViewMode, res[0]);
      });

  }

  protected clonePayloadRequest() {
    this._clonedProductMaterialSelection = cloneDeep(
      this.productMaterialSelection
    );
  }

  protected resetGridDataSource(ignoreProduct = false) {
    Object.keys(this._capacityGridDataRequested)
      .filter(
        (key) =>
          !ignoreProduct ||
          (ignoreProduct && key != CapacityDataGridType.Product.toString())
      )
      .forEach((key) => (this._capacityGridDataRequested[key] = false));
  }

  private validateMaterials(): Observable<IMaterial[]> {
    if (!this.currentTab) {
      return of(this.materialsValidation);
    }

    return this.commonService
      .validateMaterials(this.currentTab.id, this.productMaterialSelection)
      .pipe(finalize(() => this.cd.detectChanges()), map(materials => {
        this.materialsValidation = materials;
        return materials;
      }));
  }

  protected setLoading = (value: boolean) => {
    this._gridLoadingChanged$.next(value);
    this.setAccordionLoading(value);
    this.clonePayloadRequest();
    this.cd.markForCheck();
    this.cd.detectChanges();
  };

  private setHierarchyLoading = (value: boolean) => {
    this._gridLoadingChanged$.next(value);
    this._treeLoadingChanged$.next(value);
    this.clonePayloadRequest();
    this.cd.markForCheck();
    this.cd.detectChanges();
  };

  protected loadDataByNode() {
    this._cancellationPublisher.publishCancellationSignal();
    if (this._ignoreReloadGrid) {
      return;
    }
    this.productDataDetail = [];
    const currentViewMode = this.gridViewCrl?.currentMode;
    //
    this.accordionService.deactivatePreviewMode();
    const isSwitchNode = !isEqual(this.productMaterialSelection.productPath, this._clonedProductMaterialSelection?.productPath);
    const isSwitcAccoridon = !this._capacityDataReloading;
    const _materilas$ = this.canValidateMaterials() && this.isMaterialFirstLoad && (isSwitchNode || isSwitcAccoridon) ? this.validateMaterials() : of(this.materialsValidation)
    this.setLoading(true);
    forkJoin([this.getGridData(currentViewMode), this._accordionData$, _materilas$])
      .pipe(
        takeUntil(this._cancellationPublisher.cancellationPublished),
        finalize(() => {
          this.setLoading(false);
          this.accordionService.accordionDirtyChanged$.next(false);
        })
      )
      .subscribe((res) => {
        this.setGridDataSource(currentViewMode, res[0]);
        this.productDataDetail = res[1];
      });
  }

  private setCapacityData = (
    item: AccordionItemModel,
    comment?: string,
    deleteExceptions: boolean = false,
    conflictData: any = null,
    isSingleObject: boolean = false
  ): Observable<CapacityDataSetResultModel> => {
    return this.commonService.set(
      getProductDataUrlSegment(item),
      this.productMaterialSelection,
      item.data,
      comment,
      deleteExceptions,
      conflictData,
      isSingleObject
    );
  };

  private handleSaveConflicted = (
    setResult: CapacityDataSetResultModel,
    item: AccordionItemModel,
    comment?: string,
    deleteExceptions: boolean = false
  ) => {
    this._capacityService
      .resolveSaveConflicted(setResult, (solvedData) => {
        this.setAccordionLoading(true);
        return this.setCapacityData(item, comment, deleteExceptions, solvedData)
      })
      .pipe(finalize(() => this.setAccordionLoading(false)))
      .subscribe((res) => {
        if (res.data instanceof Array) {
          this.reloadCapacityData(res.data);
        } else {
          this.reloadCapacityData([
            res.data,
          ] as ICapacityDataDetail<ICapacityData>[]);
        }
      });
  };

  private handleDeleteConflicted = (setResult: CapacityDataSetResultModel) => {
    this._capacityService
      .resolveDeleteConflicted(setResult)
      .subscribe((res) => {
        if (res.data instanceof Array) {
          this.reloadCapacityData(res.data);
        } else {
          this.reloadCapacityData([
            res.data,
          ] as ICapacityDataDetail<ICapacityData>[]);
        }
      });
  };

  protected handlePreviewConflicted = (
    setResult: CapacityDataSetResultModel
  ) => {
    this._capacityService
      .resolvePreviewConflicted(setResult)
      .subscribe((res) => this.accordionService.deactivatePreviewMode());
  };

  private setAccordionLoading(value: boolean) {
    this.accordionItems = this.accordionItems.map((ite) => {
      ite.disabled = value;
      return ite;
    });
    this.accordionService.accordionLoadingChanged$.next(value);
    this.cd.markForCheck();
  }

  private canValidateMaterials(): boolean {
    return !this.commonService.isSkipMaterialValidation(
      getProductDataUrlSegment(this.currentTab)
    );
  }

  public setGridDataSource(
    currentViewMode = CapacityDataGridType.Hierarchy,
    data: Array<IHierarchyGridItem | IHierarchyProduct | IAuditLog>
  ) {
    this.isColumnValueRequired = [
      CdmAccordionRoute.Cd2cValidation,
      CdmAccordionRoute.ReleaseProduct,
      CdmAccordionRoute.Suboperation,
    ].includes(this.currentTab?.name);
    this._capacityGridDataSources[currentViewMode] = data;
    this._capacityGridDataRequested[currentViewMode] = true;
    this.gridDataSource = data;
  }

  protected previewModeChanged(previewModeInfo: PreviewModeInfo) {
    if (!previewModeInfo) return false;
    if (this.gridViewCrl?.currentMode === CapacityDataGridType.Hierarchy) {
      if (previewModeInfo.activated) {
        this.performGetPreviewList(previewModeInfo.isSingleObject);
      } else {
        this.gridDataSource =
          this._capacityGridDataSources[CapacityDataGridType.Hierarchy];
      }
    } else if (!!this.gridViewCrl) {
      const currentMode = this.gridViewCrl?.currentMode;
      this.gridDataSource = this._capacityGridDataSources[currentMode];
      return false;
    } else {
      this.gridDataSource = [];
    }
    return previewModeInfo.activated;
  }

  protected continueOnError = (error) => {
    this.snackBar.open(error, '', {
      panelClass: ['!bg-red-500', 'text-white'],
    });
    return of([]);
  };

  //#region stop propagation to show confirm box
  async accordionOpeningStopped(stoppedItem: AccordionItemModel) {
    const isContinueEditing =
      await this.accordionService.confirmDiscardChanges();
    if (!isContinueEditing) {
      const itemIndex = this.accordionItems.findIndex(
        (_) => _.id === stoppedItem.id
      );
      this.accordionInstance?.expandItem(this.accordionItems[itemIndex], true);
    }
  }

  async treeNodeSelectingStopped(
    stoppedItem: ITreeFlatNode<HierarchyTreeItemModel>
  ) {
    const isContinueEditing =
      await this.accordionService.confirmDiscardChanges();
    if (!isContinueEditing) {
      this.treeViewCrl.nodeSelected(stoppedItem);
    }
  }

  async materialChangingStopped(payload: {
    data: IMaterialNodePath | MaterialCode;
    type: 'root' | 'sub' | 'all';
    event?: MouseEvent;
  }) {
    const isContinueEditing =
      await this.accordionService.confirmDiscardChanges();
    if (!isContinueEditing) {
      this.materialFilterCtrl.selectMaterial(payload);
    }
  }

  private getAccordionRequest(isDataOnProduct: boolean) {
    let accordionRequest$: Observable<ICapacityDataDetail<ICapacityData>[]>;
    const accordionRoute = getProductDataUrlSegment(this.currentTab);
    if (isDataOnProduct) {
      const model = new ProductDataOperationAreaGraphModel(
        this.productMaterialSelection
      );
      const isChartSupported = this.commonService.isChartSupported(
        this.currentTab.name
      );
      const payload = isChartSupported
        ? model
        : this.productMaterialSelection.productPath;

      accordionRequest$ = this.commonService.getDataOnProduct(
        accordionRoute,
        payload
      );
    } else {
      accordionRequest$ = this.commonService.get(
        accordionRoute,
        this.productMaterialSelection
      );
    }

    return accordionRequest$;
  }

  get subscriptions() {
    return this._subscriptions$;
  }

  private initColumnsBySubModule(accordionName: CdmAccordionRoute) {
    const columns =
      this.columnsDictionary[accordionName]?.filter(
        (_) =>
          !_.visibleInSubModule || _.visibleInSubModule.includes(this.subModule)
      ) || [];

    const firstColumn = first(columns);
    if (!!firstColumn) {
      switch (this.subModule) {
        case CdmSubModule.Geometry:
        case CdmSubModule.Body:
          firstColumn.name = 'RecCode';
          break;
        case CdmSubModule.Grade:
          firstColumn.name = 'IntGrade';
          break;
        case CdmSubModule.ProductData:
          firstColumn.name = 'Product';
          break;
        case CdmSubModule.Diameter:
          firstColumn.name = 'Product Family';
          break;
        case CdmSubModule.FirstChoice:
          firstColumn.name = 'Operation Type';
          break;
        case CdmSubModule.ProductAssignment:
          firstColumn.name = 'Internal Grade';
          break;
        default:
          firstColumn.name = 'RefCode';
          break;
      }
    }
    this.capacityGridColumns[CapacityDataGridType.Hierarchy] = columns;
  }
  //#endregion
}
