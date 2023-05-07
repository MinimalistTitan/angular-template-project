import { CdmSubModule } from '../shared.enum';

export interface IHierarchyGridItem {
  path: string;
  node: string;
  blank: string;
  rowClass?: string;
}

export interface IHierarchyColumn {
  id?: string;
  name?: string;
  width?: number;
  order?: number;
  headerIcon?: string;
  customClass?: string;
  hidden?: boolean;
  excludeFromExporting?: boolean;
  isCheckbox?: boolean;
  backgroundClass?: string;
  visibleInSubModule?: CdmSubModule[];
  isRankingValue?: boolean;
  unCheckBoxText?: string;
  unCheckBoxClass?: string;
}
