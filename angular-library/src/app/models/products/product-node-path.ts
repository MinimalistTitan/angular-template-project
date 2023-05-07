import { ProductHierarchyTypeEnum } from "../enums/product-hierarchy-type.enum";

export const toProductNodePath = (raw: any): IProductNodePath => {
    var model = {} as IProductNodePath;
    if (raw != null) {
        model.nodes = raw.nodes;
        model.pathString = raw.nodes.join(' > ');
    }

    return model;
}

export interface IProductNodePath {
    nodes?: Array<string>;
    hierarchyType?: ProductHierarchyTypeEnum;
    pathString?: string;
}

export function toJsonFromProductNodePath(data: IProductNodePath){
    return {
        nodes: data.nodes
    }
}