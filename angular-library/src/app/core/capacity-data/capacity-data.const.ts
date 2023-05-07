

import { IDictionary } from 'src/app/models';
import { CapacityDataGridType } from './capacity-data-grid/capacity-data-grid.enum';
import { CdmAccordionRoute } from './capacity-data.enum';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { CdmSubModule } from 'src/app/share/shared.enum';
export const CAPACITY_DATA_GRID_COLUMN: IDictionary<IHierarchyColumn[]> = {
  [CapacityDataGridType.AuditLog]: [
    {
      id: 'date',
      name: 'Date',
      isCheckbox: false,
      customClass: 'text-center',
      width: 200,
    },
    {
      id: 'materialName',
      name: 'Material',
      isCheckbox: false,
      customClass: 'text-center',
      width: 100,
    },
    {
      id: 'userName',
      name: 'User',
      isCheckbox: false,
      customClass: 'text-center',
      width: 200,
    },
    {
      id: 'parameterName',
      name: 'Parameter',
      isCheckbox: false,
      customClass: 'text-center',
      width: 100,
    },
    {
      id: 'oldValue',
      name: 'Old Value',
      isCheckbox: false,
      customClass: 'text-center',
      width: 100,
    },
    {
      id: 'oldValueInheritedFrom',
      name: 'Old Value Inherited From',
      isCheckbox: false,
      customClass: 'text-center',
      width: 200,
    },
    {
      id: 'newValue',
      name: 'New Value',
      isCheckbox: false,
      customClass: 'text-center',
      width: 100,
    },
    {
      id: 'newValueInheritedFrom',
      name: 'New Value Inherited From',
      isCheckbox: false,
      customClass: 'text-center',
      width: 200,
    },
    {
      id: 'changeComment',
      name: 'Change Comment',
      isCheckbox: false,
      customClass: 'text-left',
    },
  ],
  [CapacityDataGridType.Product]: [
    { id: 'productPath', name: 'Product Path', isCheckbox: false, width: 400 },
    {
      id: 'orderCode',
      name: 'Order Code',
      isCheckbox: false,
      width: 250,
      customClass: 'text-left',
    },
    {
      id: 'materialId',
      name: 'Material ID',
      isCheckbox: false,
      width: 200,
      customClass: 'text-center',
    },
    {
      id: 'lcs',
      name: 'LCS',
      isCheckbox: false,
      width: 200,
      customClass: 'text-center',
    },
    {
      id: 'tpc',
      name: 'TPC',
      isCheckbox: false,
      width: 200,
      customClass: 'text-center',
    },
  ],
  [CapacityDataGridType.Hierarchy]: [],
};

export const CAPACITY_DATA_GRID_EXPORT_FILENAME: IDictionary<string> = {
  [CapacityDataGridType.AuditLog]: 'audit-log-list',
  [CapacityDataGridType.Product]: 'hierarchy-products',
  [CapacityDataGridType.Hierarchy]: '',
};

export const isHierarchyProductSupported = (subModule: CdmSubModule) =>
  ![CdmSubModule.Diameter, CdmSubModule.FirstChoice].includes(subModule);

export const isAuditLogSupported = (route: CdmAccordionRoute) =>
  ![CdmAccordionRoute.OperationArea, CdmAccordionRoute.Cd2cValidation].includes(
    route
  );
