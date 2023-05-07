import { IProductNodePath } from './product-node-path';

export * from './product-material-selection';
export * from './product-node-path';
export * from './tab-validation';
export * from './release/product-data-cd2c-validation-item.model';
export * from './release/product-data-released-validation-item.model';
export * from './release/product-data-released.model';

export interface IHierarchyProduct {
  hierarchyNodePath: IProductNodePath;
  productPath?: string;
  orderCode: string;
  materialId: number;
  lcs: string;
  tpc: string;
}
