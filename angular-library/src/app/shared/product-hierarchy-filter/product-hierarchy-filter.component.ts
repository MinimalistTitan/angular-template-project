import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductHierarchies, ProductHierarchyType } from 'src/app/models/hierarchy';
import { IProductMaterialSelection } from 'src/app/models/products/product-material-selection';
import { ProductHierarchyFilterResult } from './models/product-hierarchy.model';

export type ProductHierarchiesFilter = Record<
  ProductHierarchyType,
  ProductHierarchyFilterResult
>;

@Component({
  selector: 'cdm-product-hierarchy-filter',
  templateUrl: './product-hierarchy-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHierarchyFilterComponent implements OnChanges {
  @Input()
  set filterParams(value: string[]) {
    this._filterParams = value;
    this.initToggleFilters();
  };
  @Input() productHierarchies: ProductHierarchies;
  @Input() productMaterialSelection: IProductMaterialSelection;

  @Output()
  filterChange = new EventEmitter<Partial<ProductHierarchiesFilter>>();

  private _filterParams: string[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    const myMap = new Map<string, string>();
    throw new Error('Method not implemented.');
  }

  private initToggleFilters() {
    // if (!this.toggleFilterAllowed) return;
    // this.productToggleFilters = [];
    // if (!!this._filterParams?.length) {
    //   Object.keys(PRODUCT_TOGGLE_FILTER)
    //     .filter((k) => this._filterParams.includes(k))
    //     .forEach((k) => {
    //       this.productToggleFilters.push(PRODUCT_TOGGLE_FILTER[k]);
    //     });
    // }
  }
}
