import { CdmAccordionRoute } from "../core/capacity-data/capacity-data.enum";
import { CdmModule } from "../share/shared.enum";
import { ICapacityDataDetail } from "./capacity";
import { CapacityDataPageEnum } from "./enums/capacity-data-page.enum";
import { ChartType } from "./enums/chart-type.enum";
import { TabsEnum } from "./enums/tabs.enum";
import { IProductNodePath } from "./products/product-node-path";

export interface IDictionary<T> {
  [Key: string]: T;
}

export interface IBaseItem {
  id?: number | string;
  name?: string;
}

export interface IParameter {
  isReleased?: boolean;
  isNotReleased?: boolean;
  releasepack?: string; // Wrong typing from BE
  projectCode?: string;
  lcs?: string;
  intgrade?: string; // Don't see where in use for filtering in the old app
  extgrade?: string; // Don't see where in use for filtering in the old app
  materialId?: string;
}

export interface IAccordionSetting {
  id: TabsEnum;
  name: CdmAccordionRoute;
  productDetailSegment?: CdmAccordionRoute;
  displayName: string;
  pageName: CapacityDataPageEnum;
  productList?: {
    graphMode: boolean;
    chartType?: ChartType;
  };
  mapToGridItem?: (item: IBaseHierarchyGridItem<any>) => any;
  mapToAccordionItem?: (
    response: ICapacityDataDetail<any>,
    productPath?: IProductNodePath,
    module?: CdmModule
  ) => any;
  validationTabName?:TabsEnum;
  activeTabName?: string;
}

export interface IBaseHierarchyGridItem<TModel> {
  productPath: IProductNodePath;
  data: TModel;
  calculatedCapacityData?: any;
}
