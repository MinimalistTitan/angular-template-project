import { formatNumber2, toHierarchyObject } from "src/app/utilities";
import { IAccordionSetting, IBaseHierarchyGridItem } from "../base.interface";
import { ICapacityData, ICapacityDataDetail } from "../capacity";
import { CapacityDataPageEnum, RangeEnum, TabsEnum } from "../enums";
import { CoolantCvcCapacityDataModel, CoolantCvcModel } from "./coolant-cvc.model";
import { CdmAccordionRoute } from "src/app/core/capacity-data/capacity-data.enum";


const mapToGridItem = (item: IBaseHierarchyGridItem<CoolantToolLifeModel>) => {
  const data = toHierarchyObject(item);
  const capacityData = new CoolantToolLifeCapacityDataModel(
    item.data.capacityData as Object
  );

  const coolantData = {
    dry: formatNumber2(capacityData?.dryColctlcor),
    air: formatNumber2(capacityData?.airColctlcor),
    em10: formatNumber2(capacityData?.em10Colctlcor),
    em5: formatNumber2(capacityData?.em5Colctlcor),
    mql: formatNumber2(capacityData?.mqlColctlcor),
    oil: formatNumber2(capacityData?.oilColctlcor),
  };

  return { ...data, ...coolantData };
};

const mapToAccordionItem = (response: ICapacityDataDetail<ICapacityData>) => {
  const capacityData = new CoolantToolLifeCapacityDataModel(
    response.capacityData as Object
  );
  return new CoolantToolLifeModel({
    materialPath: response.materialPath,
    descriptor: response.descriptor,
    capacityData: new CoolantCvcCapacityDataModel({
      dry: capacityData.dryColctlcor,
      air: capacityData.airColctlcor,
      em5: capacityData.em5Colctlcor,
      em10: capacityData.em10Colctlcor,
      mql: capacityData.mqlColctlcor,
      oil: capacityData.oilColctlcor,
    }),
  });
};

export class CoolantToolLifeCapacityDataModel implements ICapacityData {
  dryColctlcor: RangeEnum;
  airColctlcor: RangeEnum;
  mqlColctlcor: RangeEnum;
  em5Colctlcor: RangeEnum;
  em10Colctlcor: RangeEnum;
  oilColctlcor: RangeEnum;

  constructor(init?: Partial<CoolantToolLifeCapacityDataModel>) {
    Object.assign(this, init);
  }
  modified: Date;
}

export class CoolantToolLifeModel extends CoolantCvcModel {
  constructor(init?: Partial<CoolantToolLifeModel>) {
    super();
    Object.assign(this, init);
  }

  static override get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.CoolantToolLifeCorrection,
      name: CdmAccordionRoute.CoolantToolLifeCorrection,
      displayName: 'Coolant Tool Life Factor',
      pageName: CapacityDataPageEnum.CoolantToolLifeCorrection,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: mapToAccordionItem,
    };
  }

  override toJson(): {
    materialPath: { nodes: string[] };
    capacityData: CoolantCvcCapacityDataModel;
  } {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      // @ts-ignore
      capacityData: !this.isDefined
        ? null
        : new CoolantToolLifeCapacityDataModel({
            dryColctlcor: this.capacityData.dry,
            airColctlcor: this.capacityData.air,
            mqlColctlcor: this.capacityData.mql,
            em5Colctlcor: this.capacityData.em5,
            em10Colctlcor: this.capacityData.em10,
            oilColctlcor: this.capacityData.oil,
          }),
    };
  }
}
