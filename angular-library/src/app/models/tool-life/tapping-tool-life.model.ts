
import { first, isNumber, last } from 'lodash';
import { IBaseHierarchyGridItem } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import { IProductNodePath } from '../products';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { safeFormatNumber } from 'src/app/utilities';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';

export class TappingToolLifeCapacityDataModel implements ICapacityData {
  modified: Date;
  att: number;
  ctrqbrk: number;
  fvcn: number;
  fvcx: number;
  tlifetnom: number;

  get isDefined(): boolean {
    return (
      isNumber(this.att) &&
      isNumber(this.ctrqbrk) &&
      isNumber(this.fvcn) &&
      isNumber(this.fvcx) &&
      isNumber(this.tlifetnom)
    );
  }

  get isOptionalEmpty(): boolean {
    return (
      !this.att && !this.ctrqbrk && !this.fvcn && !this.fvcx && !this.tlifetnom
    );
  }

  get isDefinedForVcNormalization(): boolean {
    return isNumber(this.att) && isNumber(this.tlifetnom);
  }

  constructor(init?: Partial<TappingToolLifeCapacityDataModel>) {
    Object.assign(this, init);
  }
}

export class TappingToolLifeModel extends ICapacityDataDetail<TappingToolLifeCapacityDataModel> {
  constructor(init?: Partial<TappingToolLifeModel>) {
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

  static mapToGridItem = (item: IBaseHierarchyGridItem<TappingToolLifeModel>) => {
    const nodes = item.data.materialPath?.nodes || [];
    const data = {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material: `${first(nodes)}${nodes.slice(1).join('.')}`,
      att: safeFormatNumber(item.data.capacityData?.att, 'en', '1.2-2'),
      ctrqbrk: safeFormatNumber(item.data.capacityData?.ctrqbrk, 'en', '1.2-2'),
      fvcn: safeFormatNumber(item.data.capacityData?.fvcn, 'en', '1.2-2'),
      fvcx: safeFormatNumber(item.data.capacityData?.fvcx, 'en', '1.2-2'),
      tlifetnom: safeFormatNumber(item.data.capacityData?.tlifetnom, 'en', '1.2-2'),
      blank: '',
    };

    return data;
  };
  static mapToAccordionItem?: (
    response: ICapacityDataDetail<any>,
    productPath?: IProductNodePath
  ) => any;
  static get columns(): IHierarchyColumn[] {
    return [
      {
        id: 'tlifetnom',
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
        id: 'att',
        name: 'ATT',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'ctrqbrk',
        name: 'CTRQBRK',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ];
  }
}
