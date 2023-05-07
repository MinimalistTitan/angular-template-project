import {
  
  ICapacityData,
  ICapacityDataDetail,
} from '../capacity/index';

import { first, last } from 'lodash';
import { IBaseHierarchyGridItem } from '../base.interface';
import { isNumber } from 'lodash';
import { ENGAGEMENT_TYPES, EngagementTypeEnum } from '../enums';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { safeFormatNumber } from 'src/app/utilities';
import { IProductNodePath } from '../products/product-node-path';
import { toMaterialNodePath } from '../materials/material-node-path';
import { toCapacityDataDescriptor } from '../capacity/capacity-data-descriptor.model';


export class IndexableMillingRelativeEngagementCapacityDataModel
  implements ICapacityData
{
  modified: Date;
  engagementType: EngagementTypeEnum;
  engagementTypeName: string;
  dcap: number;
  ae: number;
}
export class IndexableMillingRelativeEngagementModel extends ICapacityDataDetail<IndexableMillingRelativeEngagementCapacityDataModel> {
  dcap?: number;
  ae?: number;
  engagementType?: EngagementTypeEnum;
  engagementTypeName?: string;

  constructor(init?: Partial<IndexableMillingRelativeEngagementModel>) {
    super();
    Object.assign(this, init);
  }
  toJson(): any {
    return !this.isDefined
      ? null
      : {
          engagementType: this.engagementType,
          dcap: this.dcap,
          ae: this.ae,
        };
  }

  get isDefined(): boolean {
    return (
      isNumber(this.ae) && isNumber(this.dcap) && isNumber(this.engagementType)
    );
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return (
      this.descriptor.isOptional &&
      !this.engagementType &&
      !this.dcap &&
      !this.ae
    );
  }

  static mapToGridItem(
    item: IBaseHierarchyGridItem<IndexableMillingRelativeEngagementModel>
  ) {
    const nodes = item.data.materialPath?.nodes || [];
    const engagementTypeDes = ENGAGEMENT_TYPES.find(
      (ite) => ite.value == item.data.capacityData?.engagementType
    );
    const data = {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material:
        nodes.length > 0 ? `${first(nodes)}${nodes.slice(1).join('.')}` : 'All',
      dcap: safeFormatNumber(item.data.capacityData?.dcap, 'en', '1.2-2'),
      ae: safeFormatNumber(item.data.capacityData?.ae, 'en', '1.2-2'),
      engagementType: item.data.capacityData?.engagementType,
      engagementTypeName: !!engagementTypeDes ? engagementTypeDes.name : '',
      blank: '',
    };

    return data;
  }

  static mapToAccordionItem = (
    response: IndexableMillingRelativeEngagementModel,
    productPath?: IProductNodePath
  ): IndexableMillingRelativeEngagementModel => {
    var model = new IndexableMillingRelativeEngagementModel();
    if (response != null) {
      model.materialPath = toMaterialNodePath(response.materialPath);
      model.descriptor = toCapacityDataDescriptor(
        response.capacityDataDescriptor,
        productPath,
        model.materialPath
      );

      if (response.capacityData != null) {
        var capacityData = response.capacityData;

        model.engagementType = capacityData.engagementType;
        model.dcap = capacityData.dcap;
        model.ae = capacityData.ae;
      } else {
        model.engagementType = undefined;
        model.dcap = undefined;
        model.ae = undefined;
      }
    }
    return model;
  };
}
