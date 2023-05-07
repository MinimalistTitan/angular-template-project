
import { IFilterModel } from '../filter/filter';
import { IMaterialNodePath, toJsonFromMaterialNodePathModel } from '../materials/material-node-path';
import {
  IProductNodePath,
  toJsonFromProductNodePath,
} from './product-node-path';

export interface IProductMaterialSelection {
  productPath: IProductNodePath;
  materials: Array<IMaterialNodePath>;
  filters: Array<IFilterModel>;
}
export function toFilterJson(
  filters: Array<IFilterModel>
): { key: string; value: string }[] {
  if (!filters) {
    return null;
  }

  const selectedFilters = flattenFilter(filters.map((f) => f.selectedItems));

  return selectedFilters
    .filter((f) => !!f)
    .map((f) => ({ key: f.id.toString(), value: f.name }));
}
export function flattenFilter<T>(items: Array<Array<T>>) {
  return items.reduce((result, subArrays) => {
    result.push(...subArrays);
    return result;
  }, [] as Array<T>);
}

export function toJsonFromProductMaterialSelection(
  data: IProductMaterialSelection
) {
  return {
    productPath: toJsonFromProductNodePath(data.productPath),
    materials: data.materials.map((model) =>
      toJsonFromMaterialNodePathModel(model)
    ),
    filters: toFilterJson(data.filters),
  };
}
