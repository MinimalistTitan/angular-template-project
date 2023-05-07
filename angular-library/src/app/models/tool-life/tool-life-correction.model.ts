
import {
  toCapacityDataDescriptor,
  ICapacityData,
  ICapacityDataDetail,
} from '../capacity/index';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { isNumber } from 'lodash';
import { IProductNodePath } from '../products';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { toMaterialNodePath } from '../materials/material-node-path';
import { safeFormatNumber, toHierarchyObject } from 'src/app/utilities';

export class ToolLifeCorrectionCapacityDataModel implements ICapacityData {
  modified: Date;
  ctlcorr: number;
}

export class ToolLifeCorrectionModel extends ICapacityDataDetail<ToolLifeCorrectionCapacityDataModel> {
  ctlcorr?: number;

  constructor(init?: Partial<ToolLifeCorrectionModel>) {
    super();
    Object.assign(this, init);
  }
  toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined
        ? null
        : {
            ctlcorr: this.ctlcorr,
          },
    };
  }

  get isDefined(): boolean {
    return isNumber(this.ctlcorr);
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && !this.ctlcorr;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.ToolLifeCorrection,
      name: CdmAccordionRoute.ToolLifeCorrection,
      displayName: 'Tool life Correction',
      pageName: CapacityDataPageEnum.ToolLifeCorrection,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: mapToAccordionItem,
    };
  }

  static get columns(): IHierarchyColumn[] {
    return [
      {
        id: 'ctlcorr',
        name: 'CTLCORR',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ];
  }
}

const mapToAccordionItem = (
  response: ToolLifeCorrectionModel,
  productPath?: IProductNodePath
): ToolLifeCorrectionModel => {
  var model = new ToolLifeCorrectionModel();
  if (response != null) {
    model.materialPath = toMaterialNodePath(response.materialPath);
    model.descriptor = toCapacityDataDescriptor(
      response.capacityDataDescriptor,
      productPath,
      model.materialPath
    );

    if (response.capacityData != null) {
      var capacityData = response.capacityData;

      model.ctlcorr = capacityData.ctlcorr;
    } else {
      model.ctlcorr = undefined;
    }
  }

  return model;
};

const mapToGridItem = (
  item: IBaseHierarchyGridItem<ToolLifeCorrectionModel>
) => {
  return {
    ...toHierarchyObject(item),
    ctlcorr: safeFormatNumber(item.data.capacityData?.ctlcorr, 'en', '1.2-2'),
  };
};
