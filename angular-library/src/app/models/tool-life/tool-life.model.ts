
import { first, isNumber, last } from 'lodash';
import { IBaseHierarchyGridItem } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import { IProductNodePath } from '../products';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { safeFormatNumber } from 'src/app/utilities';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';

export class ToolLifeCapacityDataModel implements ICapacityData {
  modified: Date;
  att: number;
  attTested: number;
  tlifetn: number;
  tlifetnom: number;
  tlifetx: number;

  get isDefined(): boolean {
    return (
      isNumber(this.att) &&
      isNumber(this.tlifetn) &&
      isNumber(this.tlifetnom) &&
      isNumber(this.tlifetx)
    );
  }

  get isOptionalEmpty(): boolean {
    return (
      !this.att &&
      !this.tlifetnom &&
      !this.attTested &&
      !this.tlifetn &&
      !this.tlifetx
    );
  }

  get isDefinedForVcNormalization(): boolean {
    return isNumber(this.att) && isNumber(this.tlifetnom);
  }

  constructor(init?: Partial<ToolLifeCapacityDataModel>) {
    Object.assign(this, init);
  }
}

export class ToolLifeModel extends ICapacityDataDetail<ToolLifeCapacityDataModel> {
  constructor(init?: Partial<ToolLifeModel>) {
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

  static mapToGridItem = (item: IBaseHierarchyGridItem<ToolLifeModel>) => {
    const nodes = item.data.materialPath?.nodes || [];
    const data = {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material: `${first(nodes)}${nodes.slice(1).join('.')}`,
      tlifetnom: safeFormatNumber(
        item.data.capacityData?.tlifetnom,
        'en',
        '1.2-2'
      ),
      tlifetn: safeFormatNumber(item.data.capacityData?.tlifetn, 'en', '1.2-2'),
      tlifetx: safeFormatNumber(item.data.capacityData?.tlifetx, 'en', '1.2-2'),
      att: safeFormatNumber(item.data.capacityData?.att, 'en', '1.2-2'),
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
        id: 'tlifetn',
        name: 'TLIFETN',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'tlifetx',
        name: 'TLIFETX',
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
}
