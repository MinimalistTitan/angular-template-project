import { IBaseItem, ProductHierarchyType } from "src/app/models";

export interface IProductHierarchyFilterItem {
  level: number;
  type: ProductHierarchyType;
  items: IBaseItem[];
}

export interface IProductHierarchyToggleFilter {
  isActive: boolean;
  name: string;
  acronym: string;
  tooltip: string;
}

export interface ProductHierarchyFilterResult {
  values: string[];
  comparisonType: 'text' | 'value' | 'toggle';
  parameterName?: string;
  level?: number
}

export class FilterHierarchyModel {
  title: string
  items: IBaseItem[]

  constructor(items: IBaseItem[], title: string) {
    this.items = items;
    this.title = title;
  }
}
