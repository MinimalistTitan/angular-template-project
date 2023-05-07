import { IProductNodePath, toProductNodePath } from './../../../models/products/product-node-path';
import { cloneDeep, first, isEqual } from 'lodash';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CapacityDataGridType } from './capacity-data-grid.enum';
import { IHierarchyColumn, IHierarchyGridItem } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { IDictionary } from 'src/app/models';
import { IHierarchyProduct } from 'src/app/models/products';
import { IAuditLog } from 'src/app/models/audit-log';
import { AccordionItemModel, getProductDataUrlSegment } from 'src/app/share/accordion/accordion.model';
import { CdmModule, CdmSubModule } from 'src/app/share/shared.enum';
import { HierarchyGridComponent } from 'src/app/share/hierarchy-grid/hierarchy-grid.component';
import { CdmAccordionRoute } from '../capacity-data.enum';
import { CAPACITY_DATA_GRID_EXPORT_FILENAME } from '../capacity-data.const';
import { CommonService } from '../../services/common.service';
import { CapacityDataStore } from '../capacity-data.store';
import { CollapseExpandGridState } from 'src/app/share/hierarchy-grid/hierarchy-grid.model';

@Component({
  selector: 'cdm-capacity-data-grid',
  templateUrl: './capacity-data-grid.component.html',
  styleUrls: ['./capacity-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapacityDataGridComponent implements OnInit, OnChanges {
  @Input() columnDictionary: IDictionary<IHierarchyColumn[]>;
  @Input() dataSource: Array<IHierarchyGridItem | IHierarchyProduct | IAuditLog>;
  @Input() previewModeEnabled = false;
  @Input() accordion: AccordionItemModel;
  @Input() productPathNode: IProductNodePath;
  @Input() currentModule: CdmModule;
  @Input() currentSubModule: CdmSubModule;
  @Input() isColumnValueRequired = false;
  @Input() isProductVisible = true;
  @Input() isAuditLogVisible = true;

  @Output() contentExpandedChange = new EventEmitter<boolean>();
  @Output() dataRequested = new EventEmitter<{
    type: CapacityDataGridType;
    isRefresh: boolean;
  }>();
  @Output() gridCollapseExpandStateEvent : EventEmitter<CollapseExpandGridState[]> = new EventEmitter<CollapseExpandGridState[]>();
  @ViewChild(HierarchyGridComponent) hierarchyGrid: HierarchyGridComponent;
  currentActiveScreenInformation: string;
  columns: IHierarchyColumn[] = [];
  groups: string[] = ['path', 'node'];
  contentExpanded = false;
  currentMode = CapacityDataGridType.Hierarchy;
  tabs = CdmAccordionRoute;
  isChartVisible: boolean;
  activatedCapacityData$: Observable<AccordionItemModel>;

  private _exportNameDictionary = cloneDeep(CAPACITY_DATA_GRID_EXPORT_FILENAME);
  keepSortingAlive = false;
  get isAuditLogShowing(): boolean {
    return this.currentMode === CapacityDataGridType.AuditLog;
  }
  get isProductShowing(): boolean {
    return this.currentMode === CapacityDataGridType.Product;
  }
  get isHierarchyShowing(): boolean {
    return this.currentMode === CapacityDataGridType.Hierarchy;
  }
  isExportDisabled: boolean;
  accordionRoute: CdmAccordionRoute;
  exportFileName: string;
  constructor(
    private _cd: ChangeDetectorRef,
    private _commonService: CommonService,
    private _capacityDataStore: CapacityDataStore
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.currentActiveScreenInformation = `${this.currentModule}-${this.currentSubModule}-${this.accordion?.displayName}-${toProductNodePath(this.productPathNode).pathString}`;
    if (changes['dataSource'] || changes['columnDictionary']) {
      this.initColumns();
      if (!!this.accordion) {
        this.loadSettingByAccordion();
      }
    }
    if (changes['accordion']?.currentValue) {
      this.loadSettingByAccordion();
    }
    if (!!changes['isAuditLogVisible']) {
      if (this.isAuditLogShowing) {
        this.resetViewMode(CapacityDataGridType.AuditLog, true);
      }
    }
  }

  ngOnInit(): void {
    this.activatedCapacityData$ = this._capacityDataStore.selectActivatedCapacityData.pipe(tap((r) => console.debug(r)));
  }

  contentExpandedChanged() {
    this.contentExpanded = !this.contentExpanded;
    this.contentExpandedChange.next(this.contentExpanded);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 1000);
  }

  auditLogButtonClicked() {
    this.resetViewMode(CapacityDataGridType.AuditLog, this.isAuditLogShowing);
  }

  productButtonClicked() {
    this.resetViewMode(CapacityDataGridType.Product, this.isProductShowing);
  }

  refreshClicked() {
    this.keepSortingAlive = true;
    this.dataRequested.next({ type: this.currentMode, isRefresh: true });
  }

  gridRowCollapseExpandStateEvent(value: any){
    this.gridCollapseExpandStateEvent.emit(value);
  }

  private resetViewMode(viewMode: CapacityDataGridType, condition: boolean) {
    if (condition) {
      this.currentMode = CapacityDataGridType.Hierarchy;
    } else {
      this.currentMode = viewMode;
    }

    this.keepSortingAlive = false;
    this.dataRequested.next({ type: this.currentMode, isRefresh: true });
    this._cd.detectChanges();
  }

  private initColumns() {
    const dataSource = this.dataSource;

    if (
      this.currentMode === CapacityDataGridType.Hierarchy &&
      !!dataSource?.length &&
      this.isColumnValueRequired
    ) {
      const firstItem = first(dataSource);

      if (!!firstItem) {
        this.columnDictionary[this.currentMode]
          .filter((col) => col.id !== 'node')
          .forEach((column) => {
            if (firstItem.hasOwnProperty(column.id)) {
              column.hidden = false;
            }
          });
      }
    }

    const newColumns =
      this.columnDictionary[this.currentMode].filter(
        (col) => !col.hidden || col.id === 'node'
      ) || [];
    this.keepSortingAlive = isEqual(
      this.columns,
      newColumns
    );
    if (!this.keepSortingAlive) {
      this.columns = newColumns;
    }

    this.isExportDisabled = !this.dataSource?.length;
    if (this.isProductShowing || this.isAuditLogShowing) {
      this.groups = [];
    } else {
      this.groups = ['path', 'node'];
    }
  }

  private loadSettingByAccordion() {
    this.isChartVisible =
      this._commonService.isChartSupported(this.accordion.name) &&
      this.currentMode === CapacityDataGridType.Hierarchy;
    this.exportFileName = !!this._exportNameDictionary[this.currentMode]
      ? this._exportNameDictionary[this.currentMode]
      : this.accordion.displayName;
    this.accordionRoute = getProductDataUrlSegment(this.accordion);
  }
}
