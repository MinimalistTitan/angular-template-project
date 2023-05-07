import { cloneDeep, find } from 'lodash';
import { Injectable } from '@angular/core';


import { PageHierarchyLevel } from './accordion.model';
import { CapacityDataPageEnum, ProductHierarchyTypeEnum, TmcLevelEnum } from 'src/app/models/enums';
import { ICapacityDataPage, ITmcLevelChange } from 'src/app/models/capacity';
import { CAPACITY_DATA_PAGE } from './accordion.const';

@Injectable()
export class AccordionService {
  constructor() {}

  getCapacityData(
    pageType: CapacityDataPageEnum,
    subModule?: ProductHierarchyTypeEnum
  ): ICapacityDataPage {
    const capacityData = cloneDeep(
      CAPACITY_DATA_PAGE.find((def) => def.type === pageType)
    );
    if (
      !!subModule &&
      capacityData.isTmcLevelChangeAllowed instanceof Array<ITmcLevelChange>
    ) {
      const moduleConfig = capacityData.isTmcLevelChangeAllowed.find(
        (_) => _.type === subModule
      );
      if (!!moduleConfig) {
        capacityData.isTmcLevelChangeAllowed = moduleConfig.isAllowed;
        capacityData.maxAllowedTmcLevel =
          moduleConfig.maxAllowedTmcLevel || TmcLevelEnum.Tmc5;
      }
    }

    const tmcConfig = capacityData.tmcLevel?.find(
      (_) => _.type === subModule || !_.type
    );

    if (!!tmcConfig) {
      capacityData.defaultTmcLevel = tmcConfig.value;
    }
    return capacityData;
  }

  getCurrentHierarchyLevel(
    pageType: CapacityDataPageEnum,
    hierarchyType: ProductHierarchyTypeEnum
  ): number {
    const pageDef = this.getCapacityData(pageType);
    if (!pageDef.defaultHierarchyLevel) return null;

    const found = find(
      pageDef.defaultHierarchyLevel,
      (p) => (p.type !== null && p.type === hierarchyType) || p.type === null
    ) as PageHierarchyLevel;

    return found?.value;
  }
}
