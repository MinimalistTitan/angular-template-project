import {
  ICapacityData,
  ICapacityDataDetail,
  toCapacityDataDescriptor,
} from './../capacity/index';

import { IBaseHierarchyGridItem } from '../base.interface';

import { IProductNodePath } from '../products';
import { RankingEnum } from '../enums';
import { populateRankValue, toHierarchyObject } from 'src/app/utilities';
import { toMaterialNodePath } from '../materials/material-node-path';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';

export class RankingCapacityDataModel implements ICapacityData {
  modified: Date;
  rank: number;
}

export class RankingModel
  extends ICapacityDataDetail<RankingCapacityDataModel>
  implements ICapacityDataDetail<ICapacityData>
{
  rank: number;
  includedInFilter?: boolean;

  constructor(init?: Partial<RankingModel>) {
    super();
    Object.assign(this, init);
  }

  public toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      rank: this.rank,
    };
  }

  get isDefined(): boolean {
    return this.rank && this.rank !== RankingEnum.NotDefined;
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && !this.rank;
  }

  static mapToGridItem(item: IBaseHierarchyGridItem<RankingModel>) {
    const rankData = item.data.rank;
    const data = toHierarchyObject(item);
    data['includedInFilter'] = item.data.includedInFilter;
    populateRankValue(data, RankingEnum, null, rankData);

    return data;
  }

  static mapToAccordionItem = (
    response: any,
    productPath?: IProductNodePath
  ): RankingModel => {
    const model = new RankingModel();
    if (response != null) {
      model.materialPath = toMaterialNodePath(response.materialPath);
      model.descriptor = toCapacityDataDescriptor(
        response.capacityDataDescriptor,
        productPath,
        model.materialPath
      );

      model.rank = response?.rank;
    }

    return model;
  };

  static get columns(): IHierarchyColumn[] {
    return [
      {
        id: 'includedInFilter',
        name: 'Included in filter',
        isCheckbox: true,
        width: 130,
      },
      {
        id: 'basic',
        name: 'Basic',
        isCheckbox: true,
        backgroundClass: 'bg-green-400',
        customClass: 'text-center',
        headerIcon: 'icon-ranking-basic',
      },
      {
        id: 'complementary',
        name: 'Complementary',
        isCheckbox: true,
        backgroundClass: 'bg-yellow-300',
        customClass: 'text-center',
        headerIcon: 'icon-ranking-complementary',
      },
      {
        id: 'notPublished',
        name: 'Not Published',
        isCheckbox: true,
        backgroundClass: 'bg-orange-300',
        customClass: 'text-center',
        headerIcon: 'icon-ranking-not-published',
      },
      {
        id: 'noCuttingData',
        name: 'No Cutting Data',
        isCheckbox: true,
        backgroundClass: 'bg-red-600',
        customClass: 'text-center',
        headerIcon: 'icon-ranking-no-cutting-data',
      },
      {
        id: 'notDefined',
        name: 'Not Defined',
        isCheckbox: true,
        customClass: 'text-center',
        headerIcon: 'icon-ranking-undefined',
      },
    ];
  }
}
