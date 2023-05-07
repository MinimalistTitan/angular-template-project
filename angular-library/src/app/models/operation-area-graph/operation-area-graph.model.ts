
import { first } from 'lodash';
import { IAccordionSetting } from '../base.interface';
import { ICapacityData, ICapacityDataDetail } from '../capacity';

import {
  IProductMaterialSelection,
  IProductNodePath,
  toJsonFromProductMaterialSelection,
} from '../products';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { GraphDataSeries } from '../graph';

export class OperationAreaGraphCapacityModel implements ICapacityData {
  modified: Date;
  public productNodeLabel: string;
  public materialNodeLabel: string;
  public rectangleSeries: GraphDataSeries;

  constructor(init?: Partial<OperationAreaGraphCapacityModel>) {
    Object.assign(this, init);
    if (!!init['rectangleGraph']) {
      this.rectangleSeries = new GraphDataSeries({
        name: 'Rectangle',
        data: init['rectangleGraph'],
      });
    }
  }
}

export class ProductDataOperationAreaGraphModel extends ICapacityDataDetail<OperationAreaGraphCapacityModel> {
  public materialSelection: IProductMaterialSelection;
  public productHierarchyLevel: number;
  public materialHierarchyLevel: number;

  constructor(materialSelection?: IProductMaterialSelection) {
    super();
    if (!!materialSelection) {
      this.materialSelection = materialSelection;
      this.productHierarchyLevel =
        materialSelection.productPath?.nodes?.length || 0;
      this.materialHierarchyLevel =
        first(this.materialSelection?.materials)?.nodes?.length || 0;
    }
  }

  toJson() {
    return {
      materialSelection: toJsonFromProductMaterialSelection(
        this.materialSelection
      ),
      productHierarchyLevel: this.productHierarchyLevel,
      materialHierarchyLevel: this.materialHierarchyLevel,
    };
  }
  get isDefined(): boolean {
    return true;
  }
  get isValid(): boolean {
    return true;
  }
  get isOptionalEmpty(): boolean {
    return false;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.OperationArea,
      name: CdmAccordionRoute.OperationArea,
      displayName: 'Operation Area Graph',
      pageName: CapacityDataPageEnum.OperationAreaGraph,
      mapToAccordionItem: mapToAccordionItem,
    };
  }
}

const mapToAccordionItem = (
  response: any,
  productPath?: IProductNodePath
): ProductDataOperationAreaGraphModel => {
  let model = new ProductDataOperationAreaGraphModel();
  model.descriptor = response.descriptor;
  model.capacityData = new OperationAreaGraphCapacityModel(response);

  return model;
};
