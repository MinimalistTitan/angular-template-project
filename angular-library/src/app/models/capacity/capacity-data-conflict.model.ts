import { isEqual } from "lodash";
import { CapacityDataNodeModel, toCapacityDataNodeJson, toCapacityDataNodeModel } from "./capacity-data.node.model";
import { CapacityDataConflictOriginModel, toCapacityDataConflictOriginModel } from "./capacity-data.conflict.origin.model";

export class CapacityDataConflictModel {
    public modifiedNode: CapacityDataNodeModel;
    public conflictNode: CapacityDataNodeModel;
    public productHierarchyOrigin: CapacityDataConflictOriginModel;
    public materialHierarchyOrigin: CapacityDataConflictOriginModel;
    public solvedBy: CapacityDataNodeModel;

    constructor() {
        this.conflictNode = null;
        this.productHierarchyOrigin = null;
        this.materialHierarchyOrigin = null;
        this.solvedBy = null;
    }
}

export const toCapacityDataConflictJson = (raw: CapacityDataConflictModel): any => {
          return {
            conflictNode: toCapacityDataNodeJson(raw.conflictNode),
            inheritValueFrom: toCapacityDataNodeJson(raw.solvedBy)
        }
}

export const toCapacityDataConflictModel = (raw: any): CapacityDataConflictModel => {
    const model = new CapacityDataConflictModel();
    if (raw != null) {
        model.modifiedNode = toCapacityDataNodeModel(raw.modifiedNode);
        model.conflictNode = toCapacityDataNodeModel(raw.conflictNode);
        model.productHierarchyOrigin = toCapacityDataConflictOriginModel(raw.productHierarchyOrigin);
        model.materialHierarchyOrigin = toCapacityDataConflictOriginModel(raw.materialHierarchyOrigin);
    }
    return model;
}

export const isSolved = (raw: CapacityDataConflictModel): boolean => {
    const solvedBy = raw.solvedBy;
    if (!solvedBy) return false;
    const productHierarchyOrigin = raw.productHierarchyOrigin.valueInheritedFrom;
    const materialHierarchyOrigin = raw.materialHierarchyOrigin.valueInheritedFrom;

    return isEqual(solvedBy, productHierarchyOrigin)
        || isEqual(solvedBy, materialHierarchyOrigin);

}