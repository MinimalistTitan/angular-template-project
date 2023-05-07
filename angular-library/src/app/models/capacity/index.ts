import { PageHierarchyLevel, PageTmcLevel } from "src/app/share/accordion/accordion.model";
import { CapacityDataPageEnum, DetailContentType, ProductHierarchyTypeEnum, TmcLevelEnum } from "../enums";
import { IMaterialNodePath, toMaterialNodePath } from "../materials/material-node-path";
import { IProductNodePath } from "../products/product-node-path";
import { CapacityDataDescriptorModel, toCapacityDataDescriptor } from "./capacity-data-descriptor.model";
import { IServerSerializable } from "./server-serializable.interface";

export * from './capacity-data-descriptor.model';
export * from './capacity-data-tabs-validation.model';

export interface ICapacityData {
  modified: Date;
}

export abstract class ICapacityDataDetail<TCapacityModel extends ICapacityData>
  implements IServerSerializable
{
  abstract toJson();
  capacityDataDescriptor: CapacityDataDescriptorModel;
  materialPath: IMaterialNodePath;
  capacityData?: TCapacityModel;
  descriptor: CapacityDataDescriptorModel;
  productPath: IProductNodePath;
  abstract get isDefined(): boolean;
  abstract get isValid(): boolean;
  abstract get isOptionalEmpty(): boolean;
}

export interface ITmcLevelChange {
  type: ProductHierarchyTypeEnum;
  isAllowed: boolean;
  maxAllowedTmcLevel?: TmcLevelEnum;
}

export interface ICapacityDataPage {
  type: CapacityDataPageEnum;
  name: string;
  tmcLevel: PageTmcLevel[];
  isTmcLevelChangeAllowed?: ITmcLevelChange[] | boolean;
  isMultiselectDisabledOnAllLevels?: boolean;
  initialContentType: DetailContentType;
  defaultHierarchyLevel: PageHierarchyLevel[];
  listTemplate: string; // TODO Remove
  includedInFilterEnabled?: ProductHierarchyTypeEnum[];
  maxAllowedTmcLevel?: number;
  defaultTmcLevel?: TmcLevelEnum;
}

export function toCapacityData(
  data: ICapacityDataDetail<ICapacityData>[],
  productPath: IProductNodePath
) {
  data.forEach((model) => {
    model.materialPath = toMaterialNodePath(model.materialPath);
    model.descriptor = toCapacityDataDescriptor(
      model.capacityDataDescriptor,
      productPath,
      model.materialPath
    );
  });

  return data;
}