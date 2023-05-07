
import { first, isNumber, last } from 'lodash';
import { IBaseHierarchyGridItem } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import {
  toCapacityDataDescriptor
} from '../capacity/capacity-data-descriptor.model';
import { IProductNodePath } from '../products';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { FixEnum } from '../enums';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { toMaterialNodePath } from '../materials/material-node-path';
import { LevelConfig, WORKING_CONDITION_CONFIGS } from './working-condition.const';

export class TappingWorkingConditionCapacityDataModel implements ICapacityData {
  modified: Date;
  fix: number;
}

export class TappingWorkingConditionModel extends ICapacityDataDetail<TappingWorkingConditionCapacityDataModel> {
  fix?: number;

  constructor(init?: Partial<TappingWorkingConditionModel>) {
    super();
    Object.assign(this, init);
  }

  public toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined
        ? null
        : {
            fix: this.fix,
          },
    };
  }

  get isDefined(): boolean {
    return isNumber(this.fix);
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && !this.fix;
  }

  static mapToGridItem(
    item: IBaseHierarchyGridItem<TappingWorkingConditionModel>
  ) {
    const nodes = item.data.materialPath?.nodes || [];
    const data = {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material: `${first(nodes)}${nodes.slice(1).join('.')}`,
      excellentstability: TappingWorkingConditionModel.hasState(
        item.data.capacityData?.fix,
        FixEnum.ExcellentStability
      ),
      goodstability: TappingWorkingConditionModel.hasState(
        item.data.capacityData?.fix,
        FixEnum.GoodStability
      ),
      lowstability: TappingWorkingConditionModel.hasState(
        item.data.capacityData?.fix,
        FixEnum.LowStability
      ),
      blank: '',
    };

    return data;
  }

  static get columns(): IHierarchyColumn[] {
    return [
      ...[
        FixEnum.ExcellentStability,
        FixEnum.GoodStability,
        FixEnum.LowStability,
      ].map((level) => {
        const { id, name, icon, colorClass } = WORKING_CONDITION_CONFIGS.fix[
          level
        ] as LevelConfig;
        return {
          id,
          name: `Fixture stability - ${name}`,
          isCheckbox: true,
          backgroundClass: colorClass,
          customClass: 'text-center',
          headerIcon: icon,
        };
      }),
    ];
  }

  static mapToAccordionItem = (
    response: TappingWorkingConditionModel,
    productPath?: IProductNodePath
  ): TappingWorkingConditionModel => {
    var model = new TappingWorkingConditionModel();
    if (response != null) {
      model.materialPath = toMaterialNodePath(response.materialPath);
      model.descriptor = toCapacityDataDescriptor(
        response.capacityDataDescriptor,
        productPath,
        model.materialPath
      );

      model.fix = response?.capacityData?.fix;
    }

    return model;
  };

  static hasState(value: number, currentState): boolean {
    var indexes = [-1, -1];
    var states = [
      FixEnum.ExcellentStability,
      FixEnum.GoodStability,
      FixEnum.LowStability,
    ];

    for (var j = 0; j < states.length; j++) {
      if ((states[j] & value) === states[j]) {
        indexes[0] = j;
        break;
      }
    }
    for (var k = states.length - 1; k >= 0; k--) {
      if ((states[k] & value) === states[k]) {
        indexes[1] = k;
        break;
      }
    }
    if (indexes[0] === -1 || indexes[1] === -1) return false;

    if (
      states[indexes[0]] <= currentState &&
      currentState <= states[indexes[1]]
    )
      return true;

    return false;
  }
}
