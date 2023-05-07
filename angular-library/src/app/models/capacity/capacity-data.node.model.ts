import { IMaterialNodePath, toMaterialNodePath } from "../materials/material-node-path";
import { IProductNodePath, toProductNodePath } from "../products/product-node-path";



export class CapacityDataNodeModel {

    public productPath: IProductNodePath;
    public materialPath: IMaterialNodePath;
    public colName?:string;
   
    constructor() {
        this.productPath = null;
        this.materialPath = null;
        this.colName = null;
    }
    // public isEqualTo(node: CapacityDataNodeModel): boolean {
    //     return angular.equals(this.productPath.nodes, node.productPath.nodes)
    //         && angular.equals(this.materialPath.nodes, node.materialPath.nodes);
    // }

    // public toJson(): any {
    //     return {
    //         ProductPath: this.productPath.toJson(),
    //         MaterialPath: this.materialPath.toJson()
    //     }
    // }

    // public static fromServerResponse(response: any): CapacityDataNodeModel {
    //     var model = new CapacityDataNodeModel();

    //     model.productPath = ProductNodePathModel.fromServerResponse(response.ProductPath);
    //     model.materialPath = MaterialNodePathModel.fromServerResponse(response.MaterialPath);

    //     return model;
    // }
}

export const toCapacityDataNodeJson = (raw: CapacityDataNodeModel) : any => {
       return {
            productPath: {nodes: raw.productPath.nodes},
            materialPath: {nodes: raw.materialPath.nodes}
        };
}

export const toCapacityDataNodeModel = (raw: any) : CapacityDataNodeModel => {
    const model = new CapacityDataNodeModel();
    if(raw != null){
        model.productPath = toProductNodePath(raw.productPath);
        model.materialPath = toMaterialNodePath(raw.materialPath);
    }
    return model;
}
