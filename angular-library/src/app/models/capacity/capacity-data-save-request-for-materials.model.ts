import { ICapacityData, ICapacityDataDetail } from '.';
import { IProductMaterialSelection } from '../products';
import { CapacityDataConflictCollectionModel } from './capacity-data-conflict-collection.model';
import { CapacityDataSaveRequestBaseModel } from './capacity-data-save-request-base.model';

export class CapacityDataSaveRequestForMaterialsModel extends CapacityDataSaveRequestBaseModel {
  public capacityData:
    | Array<ICapacityDataDetail<ICapacityData>>
    | ICapacityDataDetail<ICapacityData>;

  constructor(
    productSelection: IProductMaterialSelection,
    capacityData: Array<ICapacityDataDetail<ICapacityData>>,
    saveComment: string,
    deleteExceptions: boolean = false,
    conflictResolution?: CapacityDataConflictCollectionModel
  ) {
    super(productSelection, saveComment, deleteExceptions, conflictResolution);
    this.capacityData = capacityData;
  }
  public override toJson(): any {
    const baseModel = super.toJson();
    const extension = {
      capacityData:
        this.capacityData instanceof Array
          ? this.capacityData.map((model) => this.toValidModel(model))
          : this.toValidModel(this.capacityData),
    };
    return { ...baseModel, ...extension };
  }

  private toValidModel(model) {
    return !!model.toJson ? model.toJson() : model;
  }
}
