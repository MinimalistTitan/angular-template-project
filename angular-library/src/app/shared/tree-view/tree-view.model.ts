import { IParameter } from "src/app/models/base.interface";
import { IHierarchyDescriptor } from "./tree-view.interface";

export class HierarchyTreeItemModel {
    id?: number;
    label?: string;
    parameters?: IParameter;
    type?: number;
    parentIndex: number = -1;
    descriptor?: IHierarchyDescriptor;
    // UI only
    index: number = 0;
    constructor(init?: Partial<HierarchyTreeItemModel>) {
      Object.assign(this, init);
    }
  }