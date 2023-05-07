import { CapacityDataTabsValidationModel } from "src/app/models/capacity/capacity-data-tabs-validation.model";

export interface ITreeFlatNode<TModel> {
    expandable: boolean;
    name?: string;
    level: number;
    selected?: boolean;
    valid?: boolean;
    released?: boolean;
    data?: TModel;
    paths?: string[];
    expanded?: boolean;
}
  
export interface IHierarchyDescriptor {
  hasAllCapacityData: boolean;
  capacityDataTabsValidations: CapacityDataTabsValidationModel[];
}
