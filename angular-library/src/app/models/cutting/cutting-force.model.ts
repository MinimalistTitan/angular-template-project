
import { first, isNumber, last } from 'lodash';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import {
  toCapacityDataDescriptor,
  ICapacityData,
  ICapacityDataDetail,
} from '../capacity';
import { IProductNodePath } from '../products';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { safeFormatNumber } from 'src/app/utilities';
import { toMaterialNodePath } from '../materials/material-node-path';


export class CuttingForceCapacityDataModel implements ICapacityData {
  modified: Date;
  ckc: number;
}
export class CuttingForceModel extends ICapacityDataDetail<CuttingForceCapacityDataModel> {
  ckc?: number;
  constructor(init?: Partial<CuttingForceModel>) {
    super();
    Object.assign(this, init);
  }
  toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined
        ? null
        : {
            ckc: this.ckc,
          },
    };
  }

  get isDefined(): boolean {
    return isNumber(this.ckc);
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && !this.ckc;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.CorrectionFactor,
      name: CdmAccordionRoute.CorrectionFactor,
      displayName: 'cutting force',
      pageName: CapacityDataPageEnum.CKC,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: mapToAccordionItem,
    };
  }

  static get columns(): IHierarchyColumn[] {
    return [
      { id: 'ckc', name: 'CKC', isCheckbox: false, customClass: 'text-center' },
    ];
  }
}

const mapToGridItem = (item: IBaseHierarchyGridItem<CuttingForceModel>) => {
  const nodes = item.data.materialPath?.nodes || [];
  const data = {
    path: item.productPath.nodes
      ?.slice(0, item.productPath?.nodes?.length - 1)
      .join(MATERIAL_ARROW),
    node: last(item.productPath.nodes),
    material: `${first(nodes)}${nodes.slice(1).join('.')}`,
    ckc: safeFormatNumber(item.data.capacityData?.ckc, 'en', '1.2-2'),
    blank: '',
  };

  return data;
};
const mapToAccordionItem = (
  response: CuttingForceModel,
  productPath?: IProductNodePath
): CuttingForceModel => {
  var model = new CuttingForceModel();
  if (response != null) {
    model.materialPath = toMaterialNodePath(response.materialPath);
    model.descriptor = toCapacityDataDescriptor(
      response.capacityDataDescriptor,
      productPath,
      model.materialPath
    );

    if (response.capacityData != null) {
      var capacityData = response.capacityData;

      model.ckc = capacityData.ckc;
    } else {
      model.ckc = undefined;
    }
  }

  return model;
};
