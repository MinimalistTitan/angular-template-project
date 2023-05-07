import { CapacityDataConflictModel, isSolved, toCapacityDataConflictJson, toCapacityDataConflictModel } from "./capacity-data-conflict.model";

export class CapacityDataConflictCollectionModel {
    public conflicts: Array<CapacityDataConflictModel>;

    constructor() {
        this.conflicts = new Array<CapacityDataConflictModel>();
    }
}
export const toCapacityDataConflictCollectionJson = (raw: CapacityDataConflictCollectionModel) : any => {
    return raw.conflicts.map((conflict) => toCapacityDataConflictJson(conflict));
}

export const toCapacityDataConflictCollectionModel = (raw: any) : CapacityDataConflictCollectionModel => {
    const model = new CapacityDataConflictCollectionModel();
    if(raw != null){
        model.conflicts = raw.conflicts.map((conflict) => toCapacityDataConflictModel(conflict));
    }
    return model;
}

export const areAllConflictsSolved = (conflicts: Array<CapacityDataConflictModel>): boolean => {
    return conflicts.every((conflict) => isSolved(conflict));
}
