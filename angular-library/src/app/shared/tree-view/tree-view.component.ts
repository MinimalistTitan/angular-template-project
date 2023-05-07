import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  forkJoin,
  map,
  Observable,
} from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HierarchyTreeItemModel } from './tree-view.model';
import { ITreeFlatNode } from './tree-view.interface';
import {
  cloneDeep,
  maxBy,
  chunk,
  sortBy,
  uniqBy,
  uniq,
  remove,
  first,
} from 'lodash';
import { CapacityDataTabsValidationModel } from 'src/app/models/capacity';
import { ProductHierarchyFilterResult } from '../product-hierarchy-filter/models/product-hierarchy.model';
import { processFilter } from './tree-view.helper';


@Component({
  selector: 'cdm-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewComponent implements OnInit, OnDestroy {
  //#region variables
  private _filteredData: HierarchyTreeItemModel[] = [];
  private _hierarchyTreeData: HierarchyTreeItemModel[] = [];
  @Input() get hierarchyTreeData(): HierarchyTreeItemModel[] {
    return this._hierarchyTreeData;
  }

  set hierarchyTreeData(value: HierarchyTreeItemModel[] | undefined) {
    this._hierarchyTreeData = value || [];
    this._leafLevel = maxBy(value, (_) => _.type)?.type || 0;
    this._performFilter(this._treeState.filters);
    this.cloneOriginalTree();
    this.reselectNode();
    this.hierarchyTreeDataChange.next(this._hierarchyTreeData);
  }

  @Output() validationsTabChange = new EventEmitter<
    CapacityDataTabsValidationModel[]
  >();
  @Output() hierarchyTreeDataChange = new EventEmitter<
    HierarchyTreeItemModel[]
  >();
  @Output() treeNodeSelected = new EventEmitter<
    ITreeFlatNode<HierarchyTreeItemModel>
  >();
  @Input() isStopPropagation: boolean;
  @Output() propagationStopped = new EventEmitter<
    ITreeFlatNode<HierarchyTreeItemModel>
  >();
  private _treeState: {
    selectedNodeIndex: number;
    expandedNodeIndexes: number[];
    filters: ProductHierarchyFilterResult[];
    isLeafSelected: boolean;
  } = {
    selectedNodeIndex: null,
    expandedNodeIndexes: [],
    filters: [],
    isLeafSelected: false,
  };
  private _transformer = (
    node: HierarchyTreeItemModel,
    level: number
  ): ITreeFlatNode<HierarchyTreeItemModel> => {
    return {
      expandable: node.type !== this._leafLevel,
      name: node.label,
      level: level,
      data: node,
      selected:
        this._treeState.selectedNodeIndex === node?.index ? true : false,
      valid: node?.descriptor?.hasAllCapacityData,
      released: node?.parameters?.isReleased,
    };
  };

  treeControl = new FlatTreeControl<ITreeFlatNode<HierarchyTreeItemModel>>(
    (node) => node.level,
    (node) => node.expandable
  );
  private _clonedTreeNodes: ITreeFlatNode<HierarchyTreeItemModel>[];

  private _treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => this._filteredData.filter((_) => _.parentIndex === node.index)
  );

  dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this._treeFlattener,
    []
  );
  private _leafLevel: number;
  get isLeafSelected(): boolean {
    return this._treeState.isLeafSelected;
  }
  //#endregion

  //#region Web Worker
  private _worker: Worker;
  private _workerChunkSize = 10000;
  private workerFunc = (op) => {
    if (!!this._worker) {
      return this._runAsThread(op);
    }

    return new Promise((res, rej) => {
      res(processFilter(op));
    });
  };
  private _runAsThread = (op) => {
    // we create a new MessageChannel
    const channel = new MessageChannel();
    // we transfer one of its ports to the Worker thread
    this._worker.postMessage(op, [channel.port1]);

    return new Promise((res, rej) => {
      // we listen for a message from the remaining port of our MessageChannel
      channel.port2.onmessage = (evt) => res(evt.data);
      channel.port2.onmessageerror = (evt) => rej(evt.data);
    });
  };
  private _filter$ = new BehaviorSubject<ProductHierarchyFilterResult[]>(null);
  private _sub$ = new Subscription();
  //#endregion
  _isLoading$ = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean>;

  constructor(private _ngZone: NgZone) {
    if (typeof Worker !== 'undefined') {
      this._worker = new Worker(new URL('./tree-view.worker', import.meta.url));
    }
  }

  ngOnDestroy(): void {
    if (!!this._sub$) {
      this._sub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this._isLoading$.asObservable();
    this._sub$.add(
      this._filter$.pipe(debounceTime(500)).subscribe((data) => {
        if (!data) return;
        this._isLoading$.next(true);
        this._performFilter(data);
      })
    );
  }

  hasChild = (_: number, node: ITreeFlatNode<HierarchyTreeItemModel>) =>
    node.expandable;

  nodeSelecting(node: ITreeFlatNode<HierarchyTreeItemModel>) {
    if (!this.isStopPropagation) {
      this.nodeSelected(node);
    } else {
      this.propagationStopped.emit(node);
    }
  }

  nodeSelected(node: ITreeFlatNode<HierarchyTreeItemModel>) {
    if (node.selected) {
      return;
    }
    (this.dataSource as any)._flattenedData.value.forEach((item: any) => {
      item.selected = false;
    });
    node.selected = true;
    node.paths = this.getNotePaths(node);
    this._treeState.selectedNodeIndex = node.data.index;
    this._treeState.isLeafSelected = node.level === this._leafLevel;
    this.treeNodeSelected.next(node);
  }

  private _performFilter(filters: ProductHierarchyFilterResult[]) {
    const start = performance.now();
    this._treeState.filters = filters;
    const _resetData = () => {
      this._filteredData = cloneDeep(this._hierarchyTreeData);
      this.reloadTreeWithExpandState();
    };
    const textFilters = filters.filter(
      (_) => _.comparisonType === 'text' && !!_.values?.length
    );
    const valueFilters = filters
      .filter((_) => _.comparisonType === 'value' && !!_.values?.length)
      .map((_) => {
        return { values: _.values, parameterName: _.parameterName };
      });
    const toggleFilters = filters
      .filter((_) => _.comparisonType === 'toggle')
      .map((_) => _.values)
      .flat(1);
    //
    if (toggleFilters.length == 2) {
      toggleFilters.length = 0;
    }
    if (!toggleFilters.length && !textFilters.length && !valueFilters.length) {
      _resetData();
    } else {
      //
      this.processFilter(textFilters, valueFilters, toggleFilters).subscribe(
        (res) => {
          this._filteredData = sortBy(uniqBy(res, 'index'), 'index');
          this.reloadTreeWithExpandState();
        }
      );
    }
  }

  performFilter(filters: ProductHierarchyFilterResult[]) {
    this._filter$.next(filters);
  }

  trackByIdentity = (
    index: number,
    item: ITreeFlatNode<HierarchyTreeItemModel>
  ) => {
    return item.data.index;
  };

  nodeStateChanged(data: {
    event: PointerEvent;
    node: ITreeFlatNode<HierarchyTreeItemModel>;
  }) {
    this.toggleNodeState(
      data.node,
      data.event.ctrlKey,
      this.treeControl.isExpanded(data.node) ? 'collapse' : 'expand'
    );

    this.cachingExpandingState();
  }

  expandAll() {
    this._ngZone.runOutsideAngular(() => {
      this.treeControl.dataNodes
        .filter((_) => _.expandable && !this.treeControl.isExpanded(_))
        .forEach((node) => this.toggleNodeState(node, true, 'expand'));
    });

    this.cachingExpandingState();
  }

  collapseAll() {
    this.treeControl.collapseAll();
    this.cachingExpandingState();
  }

  //#region privates

  private toggleNodeState(
    node: ITreeFlatNode<HierarchyTreeItemModel>,
    includeNested = false,
    action: 'expand' | 'collapse'
  ) {
    this.treeControl[`${action}${includeNested ? 'Descendants' : ''}`](node);
  }

  private loadTreeData() {
    this.dataSource.data = [];
    const treeNodes = this.toTreeFlatNodes(this._filteredData);
    const chunks = chunk(treeNodes, this._workerChunkSize);
    chunks.forEach((c) => this.treeControl.dataNodes.push(...c));
    const selectedNode = treeNodes.find(
      (_) => _.data.index === this._treeState.selectedNodeIndex
    );

    if (!!selectedNode) {
      selectedNode.selected = true;
    }

    if (!this.treeControl.dataNodes.length) return;
    // trick to make the tree be rendered properly
    this.treeControl.expand(this.treeControl.dataNodes[0]);
    this.treeControl.collapse(this.treeControl.dataNodes[0]);
  }

  private getNotePaths(node: ITreeFlatNode<HierarchyTreeItemModel>): string[] {
    let data = node.data;
    const nodes: string[] = [data.label];
    while (!!data && data.parentIndex >= 0) {
      const parent = this._hierarchyTreeData.find(
        (_) => _.index === data.parentIndex
      );
      if (!!parent) {
        data = parent;
        nodes.unshift(data.label);
      } else {
        data = null;
      }
    }

    return nodes;
  }

  private expandNodesFromCache() {
    if (!this._treeState.expandedNodeIndexes.length) return;

    const start = performance.now();
    const nodes = this.treeControl.dataNodes.filter((_) =>
      this._treeState.expandedNodeIndexes.some((a) => a === _.data.index)
    );
    this.treeControl.expansionModel.select(...nodes);
  }

  private cachingExpandingState(): void {
    if (!this.treeControl.dataNodes || !this.treeControl.dataNodes.length)
      return;

    this._treeState.expandedNodeIndexes = this.treeControl.dataNodes
      .filter((_) => _.expandable && this.treeControl.isExpanded(_))
      .map((_) => _.data.index);
  }

  private processFilter(
    textFilters: ProductHierarchyFilterResult[],
    valueFilters: { values: string[]; parameterName?: string }[],
    flagFilters: string[]
  ): Observable<HierarchyTreeItemModel[]> {
    let treeNodes = this._clonedTreeNodes;

    //#region basic filter
    if (!!valueFilters.length) {
      valueFilters
        .filter((_) => !!_.values?.length)
        .forEach((filter) => {
          treeNodes = treeNodes.filter(
            (_) =>
              !!_.data.parameters[filter.parameterName] &&
              filter.values.includes(
                _.data.parameters[filter.parameterName].toString()
              )
          );
        });
    }
    if (!!flagFilters.length) {
      flagFilters.forEach((parameterName) => {
        treeNodes = treeNodes.filter(
          (_) =>
            _.level === this._leafLevel &&
            _.data.parameters[parameterName] === true
        );
      });
    }
    if (!!textFilters.length && !flagFilters.length && !valueFilters.length) {
      const firstFilter = first(textFilters.sort((_) => _.level));

      treeNodes = treeNodes.filter(
        (_) =>
          firstFilter.level === _.level && firstFilter.values.includes(_.name)
      );
    }
    //#endregion
    const requests: Promise<any>[] = [];
    const levels = uniq(treeNodes.map((_) => _.level));
    //
    //#region populate relevant nodes
    const populateChildren = (level: number) => {
      treeNodes
        .filter((node) => node.level === level)
        .forEach((node) => {
          requests.push(
            this.workerFunc({
              node,
              _clonedTreeNodes: this._clonedTreeNodes,
              isParent: false,
              textFilters,
            })
          );
        });
    };

    const populateParent = (level: number) => {
      chunk(
        treeNodes.filter((node) => node.level === level),
        500
      ).forEach((nodes) => {
        requests.push(
          this.workerFunc({
            node: nodes,
            _clonedTreeNodes: this._clonedTreeNodes,
            isParent: true,
            textFilters,
          })
        );
      });
    };
    //#endregion

    levels.forEach((level) => {
      if (!level) {
        populateChildren(level);
      } else {
        populateParent(level);
        if (level !== this._leafLevel) {
          populateChildren(level);
        }
      }
    });

    return forkJoin(requests).pipe(
      map((res) => {
        const invalid = res
          .flat()
          .filter((_) => !_.data.length)
          .map((i) => i.node);
        const valid = res
          .flat()
          .filter((_) => !!_.data.length)
          .map((i) => i.data)
          .flat();
        remove(valid, invalid);
        let result = valid.map((i) => i.data);
        return result;
      })
    );
  }

  private reloadTreeWithExpandState() {
    this.loadTreeData();
    const max = maxBy(this.treeControl.dataNodes, (_) => _.level);
    if (max?.level < this._leafLevel && !!this._filteredData.length) {
      this._filteredData.length = 0;
      this.loadTreeData();
    }

    this.expandNodesFromCache();
    this._isLoading$.next(false);
  }
  private toTreeFlatNodes = (
    data: HierarchyTreeItemModel[]
  ): ITreeFlatNode<HierarchyTreeItemModel>[] =>
    data.map((node) => this._transformer(node, node.type));

  private cloneOriginalTree() {
    this._clonedTreeNodes = this.toTreeFlatNodes(this._hierarchyTreeData);
  }

  private reselectNode() {
    if (this._treeState.selectedNodeIndex < 0 || !this.treeControl.dataNodes)
      return;
    const node = this.treeControl.dataNodes.find(
      (_) => _.data.index === this._treeState.selectedNodeIndex
    );
    if (!!node) {
      this.nodeSelected(node);
      this.validationsTabChange.emit(
        node.data.descriptor.capacityDataTabsValidations
      );
    }
  }
  //#endregion
}
