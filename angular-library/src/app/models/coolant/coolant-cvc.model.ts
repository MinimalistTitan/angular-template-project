
import { first, isNumber, last } from 'lodash';
import { CoolantModel, ICoolantCapacityData } from '.';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { formatNumber2 } from 'src/app/utilities';
import { CapacityDataPageEnum, RangeEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';

export type CoolantSpeedFactorCapacityDetail =
  ICapacityDataDetail<CoolantCvcCapacityDataModel>;

const COLUMNS_WITHOUT_OIL: IHierarchyColumn[] = [
  {
    id: 'dry',
    name: 'Dry',
    isCheckbox: false,
    customClass: 'text-center',
  },
  {
    id: 'air',
    name: 'Air',
    isCheckbox: false,
    customClass: 'text-center',
  },
  {
    id: 'mql',
    name: 'Mql',
    isCheckbox: false,
    customClass: 'text-center',
  },
  {
    id: 'em5',
    name: 'Em5',
    isCheckbox: false,
    customClass: 'text-center',
  },
  {
    id: 'em10',
    name: 'Em10',
    isCheckbox: false,
    customClass: 'text-center',
  },
];

const mapToGridItem = (item: IBaseHierarchyGridItem<CoolantCvcModel>) => {
  const nodes = item.data.materialPath?.nodes || [];
  const data = {
    path: item.productPath.nodes
      ?.slice(0, item.productPath?.nodes?.length - 1)
      .join(MATERIAL_ARROW),
    node: last(item.productPath.nodes),
    material: `${first(nodes)}${nodes.slice(1).join('.')}`,
    dry: formatNumber2(item.data.capacityData?.dry),
    air: formatNumber2(item.data.capacityData?.air),
    em10: formatNumber2(item.data.capacityData?.em10),
    em5: formatNumber2(item.data.capacityData?.em5),
    mql: formatNumber2(item.data.capacityData?.mql),
    oil: formatNumber2(item.data.capacityData?.oil),
    blank: '',
  };

  return data;
};

export class CoolantCvcCapacityDataModel
  implements ICapacityData, ICoolantCapacityData
{
  dry: RangeEnum;
  air: RangeEnum;
  mql: RangeEnum;
  em5: RangeEnum;
  em10: RangeEnum;
  oil: RangeEnum;
  isDryReadOnly: boolean;
  isAirReadOnly: boolean;
  isMqlReadOnly: boolean;
  isEm5ReadOnly: boolean;
  isEm10ReadOnly: boolean;
  isOilReadOnly: boolean;
  modified: Date;
  hasOil: boolean;

  get isDefined(): boolean {
    return (
      (isNumber(this.dry) || this.isDryReadOnly) &&
      (isNumber(this.air) || this.isAirReadOnly) &&
      (isNumber(this.mql) || this.isMqlReadOnly) &&
      (isNumber(this.em5) || this.isEm5ReadOnly) &&
      (isNumber(this.em10) || this.isEm10ReadOnly) &&
      (!this.hasOil || isNumber(this.oil) || this.isOilReadOnly)
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

  constructor(init?: Partial<CoolantCvcCapacityDataModel>) {
    Object.assign(this, init);
  }
}

export class CoolantCvcModel extends CoolantModel<CoolantCvcCapacityDataModel> {
  constructor(init?: Partial<CoolantCvcModel>) {
    super();
    Object.assign(this, init);
    this.capacityData = new CoolantCvcCapacityDataModel(this.capacityData);
  }

  static get columns(): IHierarchyColumn[] {
    return [
      ...COLUMNS_WITHOUT_OIL,
      {
        id: 'oil',
        name: 'Oil',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ];
  }

  static get indexableMillingGradeColumns(): IHierarchyColumn[] {
    return COLUMNS_WITHOUT_OIL;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.CoolantCvc,
      name: CdmAccordionRoute.CoolantCvc,
      displayName: 'Coolant Speed Factor',
      pageName: CapacityDataPageEnum.CoolantCvc,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: (res, productPath) => new CoolantCvcModel(res),
    };
  }
}
