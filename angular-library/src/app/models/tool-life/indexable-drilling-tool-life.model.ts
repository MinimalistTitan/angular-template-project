
import { isNumber } from 'lodash';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { safeFormatNumber, toHierarchyObject } from 'src/app/utilities';
import { IProductNodePath } from '../products';

export class DrillingGradeToolLifeCapacityDataModel implements ICapacityData {
  modified: Date;
  att: number;
  alphf: number;
  tlifenom: number;
  //please double check on cutting speed
  //confuse tlifenom and tlifetnom
  tlifetnom: number;

  constructor(init?: Partial<DrillingGradeToolLifeCapacityDataModel>) {
    Object.assign(this, init);
  }

  get isDefined(): boolean {
    return (
      isNumber(this.att) && isNumber(this.alphf) && (isNumber(this.tlifenom) || isNumber(this.tlifetnom))
    );
  }

  get isOptionalEmpty(): boolean {
    return !this.att && !this.alphf && (!this.tlifenom || !this.tlifetnom);
  }

  get isDefinedForVcNormalization(): boolean {
    return this.isDefined;
  }
}
export class DrillingGradeToolLifeModel extends ICapacityDataDetail<DrillingGradeToolLifeCapacityDataModel> {
  constructor(init?: Partial<DrillingGradeToolLifeModel>) {
    super();
    Object.assign(this, init);
    this.capacityData = new DrillingGradeToolLifeCapacityDataModel(
      init?.capacityData
    );
  }
  toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined ? null : this.capacityData,
    };
  }

  get isDefined(): boolean {
    return this.capacityData.isDefined;
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && this.capacityData.isOptionalEmpty;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.ToolLife,
      name: CdmAccordionRoute.IndexableDrillingToolLife,
      displayName: 'Tool Life',
      pageName: CapacityDataPageEnum.DrillingGradeTooLife,
      productDetailSegment: CdmAccordionRoute.ToolLife,
      mapToGridItem: mapToGridItem,
      mapToAccordionItem: mapToAccordionItem,
    };
  }

  static get columns(): IHierarchyColumn[] {
    return [
      {
        id: 'tlifetnom',
        name: 'TLIFETNOM',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'att',
        name: 'ATT',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'alphf',
        name: 'ALPHF',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ];
  }
}

const mapToGridItem = (
  item: IBaseHierarchyGridItem<DrillingGradeToolLifeModel>
) => {
  return {
    ...toHierarchyObject(item),
    tlifetnom: safeFormatNumber(item.data.capacityData?.tlifenom, 'en', '1.2-2'),
    att: safeFormatNumber(item.data.capacityData?.att, 'en', '1.2-2'),
    alphf: safeFormatNumber(item.data.capacityData?.alphf, 'en', '1.2-2'),
  };
};

const mapToAccordionItem = (
  response: DrillingGradeToolLifeModel,
  productPath?: IProductNodePath
): DrillingGradeToolLifeModel => new DrillingGradeToolLifeModel(response);
