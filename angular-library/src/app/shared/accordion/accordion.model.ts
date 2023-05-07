import { CdmAccordionRoute } from "src/app/core/capacity-data/capacity-data.enum";
import { IAccordionSetting, IBaseHierarchyGridItem } from "src/app/models/base.interface";
import { ICapacityData, ICapacityDataDetail, ICapacityDataPage } from "src/app/models/capacity";
import { CapacityDataPageEnum } from "src/app/models/enums/capacity-data-page.enum";
import { ChartType } from "src/app/models/enums/chart-type.enum";
import { ProductHierarchyTypeEnum } from "src/app/models/enums/product-hierarchy-type.enum";
import { TabsEnum } from "src/app/models/enums/tabs.enum";
import { IProductNodePath } from "src/app/models/products/product-node-path";
import { CdmModule } from "../shared.enum";
import { TmcLevelEnum } from "src/app/models/enums";

export class PageHierarchyLevel {
  constructor(
    public type: ProductHierarchyTypeEnum | null,
    public value: number
  ) {}

  public toJson(): any {
    return {
      HierarchyType: this.type,
    };
  }
}

export class PageTmcLevel {
  constructor(
    public value: TmcLevelEnum,
    public type: ProductHierarchyTypeEnum = null
  ) {}
}

export class AccordionItemModel implements IAccordionSetting {
  id: TabsEnum;
  name: CdmAccordionRoute;
  productDetailSegment?: CdmAccordionRoute;
  displayName: string;
  pageName: CapacityDataPageEnum;
  disabled = false;
  valid = false;
  expanded = false;
  activeTabName?: string;
  capacityDataPage?: ICapacityDataPage;
  validationTabName?:TabsEnum;
  data: ICapacityDataDetail<ICapacityData>[] = [];
  productList: {
    graphMode: boolean;
    chartType?: ChartType;
  } = { graphMode: false };
  mapToGridItem: (item: IBaseHierarchyGridItem<any>) => any;
  mapToAccordionItem: (
    response: any,
    productPath?: IProductNodePath,
    module?: CdmModule
  ) => any;

  constructor(init?: Partial<AccordionItemModel>) {
    Object.assign(this, init);
  }
}

export const getProductDataUrlSegment = (config: AccordionItemModel) =>
  config.productDetailSegment || config.name;
