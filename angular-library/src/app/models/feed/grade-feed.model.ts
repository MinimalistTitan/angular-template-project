import { IHierarchyColumn } from '@shared/hierarchy-grid';
import { IAccordionSetting } from './../base.interface';
import {
  toCapacityDataDescriptor,
  ICapacityData,
  ICapacityDataDetail,
} from '../capacity/index';
import { formatNumber2 } from '@utilities';
import { first, last } from 'lodash';
import { IBaseHierarchyGridItem } from '../base.interface';
import { isNumber } from 'lodash';
import { IProductNodePath } from '../products';
import { CdmAccordionRoute } from '@core/capacity-data/capacity-data.enum';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { MATERIAL_ARROW } from '@shared/share.const';
import { toMaterialNodePath } from '../materials/material-node-path';

export class GradeFeedCapacityDataModel implements ICapacityData {
  modified: Date;
  hexn: number;
  hexx: number;
  constructor(init?: Partial<GradeFeedCapacityDataModel>) {
    Object.assign(this, init);
  }

  get isDefined(): boolean {
    return isNumber(this.hexn) && isNumber(this.hexx);
  }
}
export class GradeFeedModel extends ICapacityDataDetail<GradeFeedCapacityDataModel> {
  hexn?: number;
  hexx?: number;

  constructor(init?: Partial<GradeFeedModel>) {
    super();
    Object.assign(this, init);
  }
  toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined
        ? null
        : {
            hexn: this.hexn,
            hexx: this.hexx,
          },
    };
  }

  get isDefined(): boolean {
    return isNumber(this.hexn) && isNumber(this.hexx);
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && !this.hexn && !this.hexx;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.Feed,
      name: CdmAccordionRoute.FeedForGrade,
      displayName: 'Chip Thickness',
      pageName: CapacityDataPageEnum.FeedForGrade,
      productDetailSegment: CdmAccordionRoute.ChipThickness,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: mapToAccordionItem,
      validationTabName:TabsEnum.ChipThickness
    };
  }

  
  static mapToGridItemWithRounding3Digits(item: IBaseHierarchyGridItem<GradeFeedModel>){
    const nodes = item.data.materialPath?.nodes || [];
    const data = {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material: `${first(nodes)}${nodes.slice(1).join('.')}`,
      hexn: formatNumber2(item.data.capacityData?.hexn, 3),
      hexx: formatNumber2(item.data.capacityData?.hexx, 3),
      blank: '',
    };

    return data;
  };

  static get columns(): IHierarchyColumn[] {
    return [
      {
        id: 'hexn',
        name: 'HEXN',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'hexx',
        name: 'HEXX',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ];
  }
}

const mapToGridItem = (item: IBaseHierarchyGridItem<GradeFeedModel>) => {
  const nodes = item.data.materialPath?.nodes || [];
  const data = {
    path: item.productPath.nodes
      ?.slice(0, item.productPath?.nodes?.length - 1)
      .join(MATERIAL_ARROW),
    node: last(item.productPath.nodes),
    material: `${first(nodes)}${nodes.slice(1).join('.')}`,
    hexn: formatNumber2(item.data.capacityData?.hexn),
    hexx: formatNumber2(item.data.capacityData?.hexx),
    blank: '',
  };

  return data;
};

export const mapToAccordionItem = (
  response: GradeFeedModel,
  productPath?: IProductNodePath
): GradeFeedModel => {
  const model = new GradeFeedModel();
  if (response != null) {
    model.materialPath = toMaterialNodePath(response.materialPath);
    model.descriptor = toCapacityDataDescriptor(
      response.capacityDataDescriptor,
      productPath,
      model.materialPath
    );
    if (response.capacityData != null) {
      const capacityData = response.capacityData;
      model.hexn = capacityData.hexn;
      model.hexx = capacityData.hexx;
    } else {
      model.hexn = undefined;
      model.hexx = undefined;
    }
  }
  return model;
};
