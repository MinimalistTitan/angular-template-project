import { IDictionary } from 'src/app/models';
import { IProductHierarchyToggleFilter } from './models/product-hierarchy.model';
export const PRODUCT_TOGGLE_FILTER: IDictionary<IProductHierarchyToggleFilter> =
  {
    ['isReleased']: {
      isActive: false,
      name: 'isReleased',
      acronym: 'R',
      tooltip: 'Show released products only',
    },
    ['isNotReleased']: {
      isActive: false,
      name: 'isNotReleased',
      acronym: 'U',
      tooltip: 'Show unreleased products only',
    },
  };

export const PRODUCT_PARAMETER_FILTER: IDictionary<string> = {
  ['ReleasePack']: 'releasepack',
  ['ProjectCode']: 'projectCode',
  ['Lcs']: 'lcs',
  ['InternalGrade']: 'intgrade',
  ['ExternalGrade']: 'extgrade',
  ['MaterialId']: 'materialId',
};
