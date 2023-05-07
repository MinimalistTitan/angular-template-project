import { Component, Input } from '@angular/core';

import { PopoverPlacement } from '../popover.directive';
import { Cd2cValidationCapacityDataEnum, ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { ProductDataCd2cValidationItemModel } from 'src/app/models/products/release/product-data-cd2c-validation-item.model';
import { CD2C_VALIDATION } from 'src/app/models/cd2c-validation';

@Component({
  selector: 'cdm-cd2c-validation-popover',
  templateUrl: './cd2c-validation-popover.component.html',
})
export class Cd2cValidationPopoverComponent {
  @Input('title') title: string;
  @Input('content') content: any;
  @Input('placement') placement: PopoverPlacement = 'right';
  @Input('isValid') isValid: boolean = false;
  @Input('hierarchyType') hierarchyType: ProductHierarchyTypeEnum;

  getLabel(item: ProductDataCd2cValidationItemModel): string {
    if (
      this.hierarchyType ===
        ProductHierarchyTypeEnum.IndexableDrillingProductData &&
      item.capacityData === Cd2cValidationCapacityDataEnum.Feed
    ) {
      return CD2C_VALIDATION.Feed;
    }

    return CD2C_VALIDATION[
      'Cd2cValidationCapacityDataEnum_' + item.capacityData
    ] === undefined ||
      CD2C_VALIDATION['Cd2cValidationCapacityDataEnum_' + item.capacityData] ===
        ''
      ? 'Unknown Cd2c Validation Capacity Data'
      : CD2C_VALIDATION['Cd2cValidationCapacityDataEnum_' + item.capacityData];
  }

  getValue(item: ProductDataCd2cValidationItemModel): string {
    return CD2C_VALIDATION['Cd2cValidationMessageTypeEnum_' + item.messageType];
  }
}
