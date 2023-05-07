
import { isNumber, lowerFirst, startCase } from 'lodash';
import { ICoolantCapacityData } from '.';
import { IAccordionSetting, IBaseHierarchyGridItem, IDictionary } from '../base.interface';
import {
  ICapacityData,
  ICapacityDataDetail,
  toCapacityDataDescriptor,
} from '../capacity';
import { IProductNodePath } from '../products';
import { CapacityDataPageEnum, CooltEnum, RangeEnum, TabsEnum } from '../enums';
import { populateRankValue, toHierarchyObject } from 'src/app/utilities';
import { toMaterialNodePath } from '../materials/material-node-path';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';

export type CoolantRankingCapacityDetail =
  ICapacityDataDetail<CoolantRankingCapacityDataModel>;

export const COOLANT_RANKING_STYLES: IDictionary<{
  color: string;
  icon: string;
  hexColor?: string;
}> = {
  [RangeEnum.Ok]: {
    color: 'bg-green-400',
    hexColor: '#34D399',
    icon: 'icon-ranking-basic',
  },
  [RangeEnum.NotRecommended]: {
    color: 'bg-yellow-300',
    hexColor: '#FCD34D',
    icon: 'icon-ranking-complementary',
  },
  [RangeEnum.NotAllowed]: {
    color: 'bg-red-600',
    hexColor: '#DC2626',
    icon: 'icon-ranking-not-published',
  },
};

function mapToGridItem(item: IBaseHierarchyGridItem<CoolantRankingModel>) {
  const rankData = item.data.capacityData;
  const data = toHierarchyObject(item);
  populateRankValue(data, RangeEnum, CooltEnum, rankData);

  return data;
}

function mapToAccordionItem(
  response: CoolantRankingCapacityDetail,
  productPath?: IProductNodePath
): CoolantRankingModel {
  const model = new CoolantRankingModel();

  if (response != null) {
    model.materialPath = toMaterialNodePath(response.materialPath);
    model.descriptor = toCapacityDataDescriptor(
      response.capacityDataDescriptor,
      productPath,
      model.materialPath
    );
    model.capacityData = new CoolantRankingCapacityDataModel(response.capacityData);
  }

  return model;
}

export class CoolantRankingCapacityDataModel
  implements ICapacityData, ICoolantCapacityData
{
  dry: number;
  air: number;
  mql: number;
  em5: number;
  em10: number;
  oil: number;
  modified: Date;
  masterCoolant: number;
  hasOil: boolean;

  get masterCoolantName(): string {
    return CooltEnum[this.masterCoolant];
  }

  get isDefined(): boolean {
    return (
      isNumber(this.dry) &&
      isNumber(this.air) &&
      isNumber(this.mql) &&
      isNumber(this.em5) &&
      isNumber(this.em10) &&
      (!this.hasOil || isNumber(this.oil))
    );
  }

  get isOptionalEmpty(): boolean {
    return (
      !this.dry &&
      !this.air &&
      !this.mql &&
      !this.em5 &&
      !this.em10 &&
      (!this.hasOil || !this.oil)
    );
  }

  get isDefinedForVcNormalization(): boolean {
    return this.isDefined;
  }

  constructor(init?: Partial<CoolantRankingCapacityDataModel>) {
    Object.assign(this, init);
  }
}

export class CoolantRankingModel extends ICapacityDataDetail<CoolantRankingCapacityDataModel> {
  get isDefined(): boolean {
    return this.capacityData?.isDefined;
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor?.isOptional && this.capacityData?.isOptionalEmpty;
  }

  constructor(init?: Partial<CoolantRankingModel>) {
    super();
    Object.assign(this, init);
  }

  toJson(): any {
    const { dry, air, mql, em5, em10, oil, masterCoolant } =
      this.capacityData ?? {};
    const payloadCapacityData = { dry, air, mql, em5, em10, oil };
    if (masterCoolant) {
      payloadCapacityData['masterCoolant'] = masterCoolant;
    }

    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: this.capacityData
        ? payloadCapacityData
        : null,
    };
  }

  static get columns(): IHierarchyColumn[] {
    const columns: IHierarchyColumn[] = [];
    const rankFields = Object.keys(RangeEnum).filter((k) =>
      isNumber(RangeEnum[k])
    );
    Object.keys(CooltEnum)
      .filter((k) => isNumber(CooltEnum[k]))
      .forEach((field) => {
        rankFields.forEach((rank) => {
          const rankStyle = COOLANT_RANKING_STYLES[RangeEnum[rank]];
          columns.push({
            id: `${lowerFirst(field)}_${rank}`,
            name: `${field} - ${startCase(rank)}`,
            isCheckbox: true,
            backgroundClass: rankStyle.color,
            customClass: 'text-center',
            headerIcon: rankStyle.icon,
          });
        });
      });

    return columns;
  }

  static get indexableMillingGradeColumns(): IHierarchyColumn[] {
    const columns: IHierarchyColumn[] = [];
    const rankFields = Object.keys(RangeEnum).filter((k) =>
      isNumber(RangeEnum[k])
    );
    Object.keys(CooltEnum)
      .filter((k) => isNumber(CooltEnum[k]) && CooltEnum[k] !== CooltEnum.Oil)
      .forEach((field) => {
        rankFields.forEach((rank) => {
          const rankStyle = COOLANT_RANKING_STYLES[RangeEnum[rank]];
          columns.push({
            id: `${lowerFirst(field)}_${rank}`,
            name: `${field} - ${startCase(rank)}`,
            isCheckbox: true,
            backgroundClass: rankStyle.color,
            customClass: 'text-center',
            headerIcon: rankStyle.icon,
          });
        });
      });

    return columns;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.CoolantRanking,
      name: CdmAccordionRoute.CoolantRanking,
      displayName: 'Coolant',
      pageName: CapacityDataPageEnum.CoolantRanking,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: mapToAccordionItem,
    };
  }
}
