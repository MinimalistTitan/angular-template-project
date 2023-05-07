import { ProductDataReleasedProductValidationTypeEnum } from '../../enums';
import {
  ProductDataCd2cValidationItemModel,
  toProductDataCd2cValidationItemModel,
} from './product-data-cd2c-validation-item.model';

export class ProductDataProductValidationItem {
  public type: ProductDataReleasedProductValidationTypeEnum;
  public isValid: boolean;
  public validationMessage: string;
  public invalidItems: Array<ProductDataCd2cValidationItemModel>;
}

export const toProductDataProductValidationItem = (raw: any) => {
  let model = new ProductDataProductValidationItem();

  if (!!raw) {
    model.type = raw.type;
    model.isValid = raw.isValid;
    model.validationMessage = raw.validationMessage;

    if (raw.invalidItems)
      model.invalidItems = raw.invalidItems.map((item) =>
        toProductDataCd2cValidationItemModel(item)
      );
  }

  return model;
};
