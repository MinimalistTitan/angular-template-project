
import { ICapacityData, ICapacityDataDetail } from ".";
import { IProductMaterialSelection } from "../products";
import { CapacityDataConflictCollectionModel } from "./capacity-data-conflict-collection.model";
import { CapacityDataSaveRequestBaseModel } from "./capacity-data-save-request-base.model";

export class CapacityDataSaveRequestModel extends CapacityDataSaveRequestBaseModel {
    public capacityData: ICapacityDataDetail<ICapacityData>;

    constructor(productSelection: IProductMaterialSelection, capacityData: ICapacityDataDetail<ICapacityData>,
        saveComment: string, deleteExceptions: boolean = false, conflictResolution?: CapacityDataConflictCollectionModel) {
        super(productSelection, saveComment, deleteExceptions, conflictResolution);
        this.capacityData = capacityData;
    }
    public override toJson(): any {
        const baseModel = super.toJson();
        const extension = {
            capacityData: this.capacityData.toJson()
        };
        return { ...baseModel, ...extension};
    }
}



