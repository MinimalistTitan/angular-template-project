import { ChangeDetectorRef, Component, Input, QueryList, TemplateRef } from '@angular/core';
import { delay } from 'lodash';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { HierarchyGridCellDirective } from './hierarchy-grid-cell.directive';
import { IHierarchyColumn, IHierarchyGridItem } from './hierarchy-grid.interface';
import { HierarchyGridGroupModel } from './hierarchy-grid.model';
import { IDictionary } from 'src/app/models/base.interface';

@Component({
  selector: 'app-hierarchy-grid',
  templateUrl: './hierarchy-grid.component.html',
  styleUrls: ['./hierarchy-grid.component.scss'],
})
export class HierarchyGridComponent {
  templates: IDictionary<TemplateRef<HTMLElement> | null> = {};
  displayedColumns: string[] = [];
  private _exportableColumnMapper: IDictionary<IHierarchyColumn>;
  public matDataSource = new TableVirtualScrollDataSource<
    any | HierarchyGridGroupModel
  >([]);
  private _templates!: QueryList<HierarchyGridCellDirective>;
  @Input() groups: string[] = [];
  private _columns: IHierarchyColumn[] = [];
  @Input() get columns(): IHierarchyColumn[] {
    return this._columns;
  }
  set columns(value: IHierarchyColumn[]) {
    this._columns = value || [];
    this.initColumns();
    delay(() => this.loadTemplates(), 500);
  }

  private _dataSource: IHierarchyGridItem[] = [];
  @Input() get dataSource(): IHierarchyGridItem[] {
    return this._dataSource;
  }
  set dataSource(value: IHierarchyGridItem[]) {
    this._dataSource = value || [];
    this.handleDataSourceChanged();
  }

  constructor(private cd: ChangeDetectorRef) {   
    
  }

  private handleDataSourceChanged() {
    this.initDataSource();
  }

  private getTemplateRefByName(
    name: string | undefined
  ): TemplateRef<any> | null {
    if (!name) return null;
    const dir = this._templates.find((dir) => dir.cell === name);
    return dir ? dir.template : null;
  }

  private loadTemplates(){
    this.templates = {};
    if (!this._templates.length) return;
    this.columns.forEach((column) => {
      if (!!column?.id) {
        this.templates[column.id] = this.getTemplateRefByName(column.id);
      }
    });
    this.cd.markForCheck();
  }

  private initDataSource() {}

  private initColumns() {
    if (!this._columns?.length) return;
    if (!!this.groups?.length && !this._columns.some((_) => _.id === 'blank')) {
      this._columns.unshift({
        id: 'blank',
        name: 'Blank',
        hidden: false,
        excludeFromExporting: true,
      });
    }

    this.displayedColumns = this._columns
      .filter((_) => !_.hidden)
      .map((_) => _.id || '');

    this._exportableColumnMapper = {};
    this._columns
      .filter((_) => !_.excludeFromExporting)
      .forEach((column) => {
        this._exportableColumnMapper[!!column.id ? column.id : ''] = column;
      });
  }

}
