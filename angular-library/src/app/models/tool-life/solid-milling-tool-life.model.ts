
import { isNumber } from 'lodash';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import { safeFormatNumber, toHierarchyObject } from 'src/app/utilities';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';


export class SolidMillingToolLifeCapacityDataModel implements ICapacityData {
  modified: Date;
  att: number;
  tlifelnom: number;
  get tlifetnom(): number {
    return this.tlifelnom;
  }
  fvcn: number;
  fvcx: number;
  fvcnt: number;

  get isDefined(): boolean {
    return (
      isNumber(this.att) &&
      isNumber(this.tlifelnom) &&
      isNumber(this.fvcn) &&
      isNumber(this.fvcx) &&
      isNumber(this.fvcnt)
    );
  }

  get isOptionalEmpty(): boolean {
    return (
      !this.att && !this.tlifelnom && !this.fvcn && !this.fvcx && !this.fvcnt
    );
  }

  get isDefinedForVcNormalization(): boolean {
    return (
      isNumber(this.att) &&
      isNumber(this.tlifelnom) &&
      isNumber(this.fvcn) &&
      isNumber(this.fvcx) &&
      isNumber(this.fvcnt)
    );
  }

  constructor(init?: Partial<SolidMillingToolLifeCapacityDataModel>) {
    Object.assign(this, init);
  }
}

const mapToGridItem = (
  item: IBaseHierarchyGridItem<SolidMillingToolLifeModel>
) => {
  const data = toHierarchyObject(item);
  const toolLifeData = {
    tlifetnom: safeFormatNumber(item.data.capacityData?.tlifetnom, 'en', '1.2-2'),
    att: safeFormatNumber(item.data.capacityData?.att, 'en', '1.2-2'),
    tlifelnom: safeFormatNumber(item.data.capacityData?.tlifelnom, 'en', '1.2-2'),
    fvcn: safeFormatNumber(item.data.capacityData?.fvcn, 'en', '1.2-2'),
    fvcx: safeFormatNumber(item.data.capacityData?.fvcx, 'en', '1.2-2'),
    fvcnt: safeFormatNumber(item.data.capacityData?.fvcnt, 'en', '1.2-2'),
  };

  return { ...data, ...toolLifeData };
};

export class SolidMillingToolLifeModel extends ICapacityDataDetail<SolidMillingToolLifeCapacityDataModel> {
  constructor(init?: Partial<SolidMillingToolLifeModel>) {
    super();
    Object.assign(this, init);
  }
  toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: this.capacityData,
    };
  }

  get isDefined(): boolean {
    return this.capacityData?.isDefined;
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && this.capacityData?.isOptionalEmpty;
  }

  static get columns(): IHierarchyColumn[] {
    return [
      {
        id: 'tlifelnom',
        name: 'TLIFETNOM',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'fvcn',
        name: 'FVCN',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'fvcx',
        name: 'FVCX',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'fvcnt',
        name: 'FVCNT',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'att',
        name: 'ATT',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ];
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.ToolLife,
      name: CdmAccordionRoute.SolidMillingToolLife,
      productDetailSegment: CdmAccordionRoute.ToolLife,
      displayName: 'Tool life',
      pageName: CapacityDataPageEnum.SolidMillingTooLife,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: (res) => new SolidMillingToolLifeModel(res),
    } as IAccordionSetting;
  }
}
