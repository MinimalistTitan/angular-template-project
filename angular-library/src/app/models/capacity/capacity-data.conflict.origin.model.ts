import { CapacityDataNodeModel, toCapacityDataNodeModel } from "./capacity-data.node.model";

export class CapacityDataConflictOriginModel {
    public valueInheritedFrom: CapacityDataNodeModel;
    public nodeContentString: string;
    
    constructor() {
        this.valueInheritedFrom = null;
        this.nodeContentString = null;
    }
}

export const toCapacityDataConflictOriginModel = (raw: any) : CapacityDataConflictOriginModel => {
    const model = new CapacityDataConflictOriginModel();
    if(raw != null){
        model.valueInheritedFrom = toCapacityDataNodeModel(raw.valueInheritedFrom);
        model.nodeContentString = raw.nodeContentString;
    }
    return model;
}

