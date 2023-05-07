import { Cd2cValidationCapacityDataEnum, Cd2cValidationMessageTypeEnum } from "../../enums";
import { IMaterialNodePath, toMaterialNodePath } from "../../materials/material-node-path";

export class ProductDataCd2cValidationItemModel {
    public messageType: Cd2cValidationMessageTypeEnum;
    public capacityData: Cd2cValidationCapacityDataEnum;
    public materialPath: IMaterialNodePath;
}
export const toProductDataCd2cValidationItemModel = (raw:any) =>{
    let model = new ProductDataCd2cValidationItemModel();

    if (!!raw) {
        model.messageType = raw.message;
        model.capacityData = raw.capacityData;
        model.materialPath = toMaterialNodePath(
            raw.materialPath
        );
    }

    return model;
}
