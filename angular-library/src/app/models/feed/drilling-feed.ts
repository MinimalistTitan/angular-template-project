import { isNumber } from 'lodash';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import {
  toCapacityDataDescriptor,
  ICapacityData,
  ICapacityDataDetail,
} from '../capacity';
import { IProductNodePath } from '../products';
import { getLevel, toMaterialNodePath } from '../materials/material-node-path';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { ChartType } from '../enums/chart-type.enum';

export class DrillingFeedCapacityData implements ICapacityData {
  modified: Date;
  fnn: number;
  fnnom: number;
  fnx: number;
  calculatedByMaterialFeedProfile: boolean;
  calculatedBySizeFeedProfile: boolean;
  productLeafString: string;
}
export class DrillingFeed extends ICapacityDataDetail<DrillingFeedCapacityData> {
  fnn?: number;
  fnnom?: number;
  fnx?: number;
  calculatedByMaterialFeedProfile?: boolean;
  calculatedBySizeFeedProfile?: boolean;
  productLeafString?: string;
  constructor(init?: Partial<DrillingFeed>) {
    super();
    Object.assign(this, init);
  }
  toJson(): any {
    return {
      data: {
        materialPath: { nodes: this.materialPath.nodes },
        capacityData: !this.isDefined
          ? null
          : {
              fnn: this.fnn,
              fnnom: this.fnnom,
              fnx: this.fnx,
              calculatedByMaterialFeedProfile:
                this.calculatedByMaterialFeedProfile,
              calculatedBySizeFeedProfile: this.calculatedBySizeFeedProfile,
            },
      },
      productPath: { nodes: this.productPath.nodes },
    };
  }

  get isDefined(): boolean {
    return isNumber(this.fnn) && isNumber(this.fnx);
  }

  get isValid(): boolean {
    return this.isDefined && this.fnn <= this.fnx;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && !this.fnn && !this.fnx;
  }
}

export function mapToProductDetail(
  response: any,
  productPath?: IProductNodePath
): DrillingFeed {
  if (!response) {
    return new DrillingFeed();
  }
  const mappedProductPath = response.productPath ||
    productPath || { nodes: [] };
  const { data } = response;
  const { materialPath, capacityDataDescriptor, capacityData } = data || {};
  const materialNodePath = toMaterialNodePath(materialPath);
  const descriptor = toCapacityDataDescriptor(
    capacityDataDescriptor,
    mappedProductPath,
    materialNodePath
  );
  const productLeafString = getLevel(
    mappedProductPath,
    mappedProductPath.nodes.length - 1
  );
  const {
    fnnom,
    fnn,
    fnx,
    calculatedByMaterialFeedProfile,
    calculatedBySizeFeedProfile,
  } = capacityData || {};
  return new DrillingFeed({
    materialPath: materialNodePath,
    descriptor,
    fnnom,
    fnn,
    fnx,
    productLeafString,
    calculatedByMaterialFeedProfile,
    calculatedBySizeFeedProfile,
    productPath: mappedProductPath,
  });
}

export const CAPACITY_DETAIL_CONFIG: IAccordionSetting = {
  id: TabsEnum.Feed,
  name: CdmAccordionRoute.Feeds,
  productDetailSegment: CdmAccordionRoute.ChipThickness,
  displayName: 'Feed',
  pageName: CapacityDataPageEnum.DrillingGeometryFeed,
  productList: {
    graphMode: true,
    chartType: ChartType.feed,
  },
  mapToGridItem: (item: IBaseHierarchyGridItem<DrillingFeed>) => {},
  mapToAccordionItem: mapToProductDetail,
};
