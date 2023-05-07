
import { first, isNumber, last } from 'lodash';
import { IBaseHierarchyGridItem } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';
import { toCapacityDataDescriptor } from '../capacity/capacity-data-descriptor.model';
import { IProductNodePath } from '../products';
import {
  LevelConfig,
  WORKING_CONDITION_CONFIGS,
} from './working-condition.const';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { CutccEnum, FixEnum, WkpsccEnum } from '../enums';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { toMaterialNodePath } from '../materials/material-node-path';

export class WorkingConditionCapacityDataModel implements ICapacityData {
  modified: Date;
  fix: number;
  cutcc: number;
  wkpscc: number;

  get isDefined(): boolean {
    return isNumber(this.fix) && isNumber(this.cutcc) && isNumber(this.wkpscc);
  }

  get isOptionalEmpty(): boolean {
    return !this.fix && !this.cutcc && !this.wkpscc;
  }

  constructor(init?: Partial<WorkingConditionCapacityDataModel>) {
    Object.assign(this, init);
  }
}

export class WorkingConditionModel extends ICapacityDataDetail<WorkingConditionCapacityDataModel> {
  constructor(init?: Partial<WorkingConditionModel>) {
    super();
    Object.assign(this, init);
  }

  public toJson(): any {
    return {
      materialPath: { nodes: this.materialPath.nodes },
      capacityData: !this.isDefined ? {
        wkpscc:0,
        cutcc:0,
        fix:0,
      } : this.capacityData
    };
  }

  get isDefined(): boolean {
    return this.capacityData?.isDefined;
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return this.descriptor.isOptional && this.capacityData.isOptionalEmpty;
  }

  static mapToGridItem(item: IBaseHierarchyGridItem<WorkingConditionModel>) {
    const nodes = item.data.materialPath?.nodes || [];
    const data = {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material: `${first(nodes)}${nodes.slice(1).join('.')}`,
      premachined: WorkingConditionModel.hasState(
        item.data.capacityData?.wkpscc,
        WkpsccEnum.PreMachined
      ),
      lightskin: WorkingConditionModel.hasState(
        item.data.capacityData?.wkpscc,
        WkpsccEnum.LightSkin
      ),
      heavyskin: WorkingConditionModel.hasState(
        item.data.capacityData?.wkpscc,
        WkpsccEnum.HeavySkin
      ),
      continuouscut: WorkingConditionModel.hasState(
        item.data.capacityData?.cutcc,
        CutccEnum.ContinuousCut
      ),
      varyingdepth: WorkingConditionModel.hasState(
        item.data.capacityData?.cutcc,
        CutccEnum.VaryingDepth
      ),
      interruptions: WorkingConditionModel.hasState(
        item.data.capacityData?.cutcc,
        CutccEnum.Interruptions
      ),
      excellentstability: WorkingConditionModel.hasState(
        item.data.capacityData?.fix,
        FixEnum.ExcellentStability
      ),
      goodstability: WorkingConditionModel.hasState(
        item.data.capacityData?.fix,
        FixEnum.GoodStability
      ),
      lowstability: WorkingConditionModel.hasState(
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
        WkpsccEnum.PreMachined,
        WkpsccEnum.LightSkin,
        WkpsccEnum.HeavySkin,
      ].map((level) => {
        const { id, name, icon, colorClass } = WORKING_CONDITION_CONFIGS.wkpscc[
          level
        ] as LevelConfig;
        return {
          id,
          name,
          isCheckbox: true,
          backgroundClass: colorClass,
          customClass: 'text-center',
          headerIcon: icon,
        };
      }),
      ...[
        CutccEnum.ContinuousCut,
        CutccEnum.VaryingDepth,
        CutccEnum.Interruptions,
      ].map((level) => {
        const { id, name, icon, colorClass } = WORKING_CONDITION_CONFIGS.cutcc[
          level
        ] as LevelConfig;
        return {
          id,
          name,
          isCheckbox: true,
          backgroundClass: colorClass,
          customClass: 'text-center',
          headerIcon: icon,
        };
      }),
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
          name,
          isCheckbox: true,
          backgroundClass: colorClass,
          customClass: 'text-center',
          headerIcon: icon,
        };
      }),
    ];
  }

  static mapToAccordionItem = (
    response: WorkingConditionModel,
    productPath?: IProductNodePath
  ): WorkingConditionModel => {
    var model = new WorkingConditionModel();
    if (response) {
      model.materialPath = toMaterialNodePath(response.materialPath);
      model.descriptor = toCapacityDataDescriptor(
        response.capacityDataDescriptor,
        productPath,
        model.materialPath
      );

      model.capacityData = new WorkingConditionCapacityDataModel({
        fix: response.capacityData?.fix,
        cutcc: response.capacityData?.cutcc,
        wkpscc: response.capacityData?.wkpscc,
      });
    }

    return model;
  };

  static hasState(value: number, currentState): boolean {
    var indexes = [-1, -1];
    var states = [
      WkpsccEnum.PreMachined,
      WkpsccEnum.LightSkin,
      WkpsccEnum.HeavySkin,
      CutccEnum.ContinuousCut,
      CutccEnum.VaryingDepth,
      CutccEnum.Interruptions,
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
