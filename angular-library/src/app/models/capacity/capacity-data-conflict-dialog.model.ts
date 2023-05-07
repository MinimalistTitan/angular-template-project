import { CapacityDataSetResultModel } from "./capacity-data-set-result.model";

export class CapacityDataConflictDialogModel {
    public setResult: CapacityDataSetResultModel;
    public readOnly?: boolean;
    public isPreview?: boolean;

    constructor() {
        this.setResult = null;
        this.readOnly = null;
        this.isPreview = null;
    }

}
export const toCapacityDataConflictDialogModel = (setResult: CapacityDataSetResultModel, readOnly: boolean = false, isPreview: boolean = false): CapacityDataConflictDialogModel => {
    const model = new CapacityDataConflictDialogModel();
    model.setResult = setResult;
    model.readOnly = readOnly;
    model.isPreview = isPreview;
    return model;
}