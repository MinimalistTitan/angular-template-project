import { HierarchyTreeItemModel } from "../share/tree-view/tree-view.model";
import { IBaseItem } from "./base.interface";

export type ProductHierarchyType =
  | 'productFamilies'
  | 'chipbreakDesigns'
  | 'recCodes'
  | 'sizes'
  | 'tolerances'
  | 'toggle'
  | 'ctmGroups'
  | 'all';

export type ProductHierarchies = Record<ProductHierarchyType, IBaseItem[]>;

export type Hierarchy = {
  tree?: HierarchyTreeItemModel[];
} & ProductHierarchies;