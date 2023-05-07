import { isEqual } from 'lodash';
import { CapacityDataStatusEnum } from '../enums/capacity-data-status.enum';
import { ReadOnlyCauseEnum } from '../enums/read-only-cause.enum';
import { IMaterialNodePath, toMaterialNodePath } from '../materials/material-node-path';
import { IProductNodePath, toProductNodePath } from '../products/product-node-path';

export class CapacityDataDescriptorModel {
  isUpdated: boolean;
  isInherited: boolean;
  status: CapacityDataStatusEnum;
  inheritedFromProduct: IProductNodePath;
  inheritedFromMaterial: IMaterialNodePath;
  isCurrentProduct: boolean;
  isCurrentMaterial: boolean;
  isRootMaterial: boolean;
  readOnlyCause: ReadOnlyCauseEnum;

  get isReadOnly(): boolean {
    return this.status === CapacityDataStatusEnum.ReadOnly;
  }

  get isRequired(): boolean {
    return this.status === CapacityDataStatusEnum.Editable;
  }

  get isOptional(): boolean {
    return this.status === CapacityDataStatusEnum.Optional;
  }
  constructor(init?: Partial<CapacityDataDescriptorModel>) {
    Object.assign(this, init);
  }
}

export const toCapacityDataDescriptor = (
  raw: any,
  productPath: IProductNodePath,
  materialPath: IMaterialNodePath
): CapacityDataDescriptorModel => {
  const model = new CapacityDataDescriptorModel();
  if (raw != null) {
    if (!materialPath) {
      materialPath = {} as IMaterialNodePath;
    }
    if (!productPath) {
      productPath = {} as IProductNodePath;
    }
    model.isUpdated = raw.isUpdated;
    model.isInherited = raw.isInherited;
    model.status = raw.capacityDataStatus;
    model.inheritedFromProduct = toProductNodePath(raw.inheritedFromProduct);
    model.inheritedFromMaterial = toMaterialNodePath(raw.inheritedFromMaterial);
    model.isCurrentProduct = isEqual(
      model.inheritedFromProduct.nodes,
      productPath.nodes
    );
    model.isCurrentMaterial = isEqual(
      model.inheritedFromMaterial.nodes,
      materialPath.nodes
    );
    model.isRootMaterial = model.inheritedFromMaterial.pathString === 'All';
    model.readOnlyCause = raw.readOnlyCause;
  }
  return model;
};
