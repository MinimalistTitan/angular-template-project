import { ICapacityData, ICapacityDataDetail } from './../capacity/index';
import { first, isNumber, last } from 'lodash';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { CuttingSpeedModel } from './cutting-speed.model';
import { MaterialWithRankingModel } from './material-with-ranking.model';
import { ProductDataStartValuesKaprModel } from './product-data-start-values-kapr.model';
import { ReferenceMaterialModel } from './reference-material.model';
import { FeedSpeedModel } from './feed-speed.model';


import { IMaterialNodePath } from '../materials/material-node-path';
import { RESOURCES } from '../resources';
import { IHierarchyColumn } from 'src/app/share/hierarchy-grid/hierarchy-grid.interface';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { ProductAreaEnum } from '../enums/product-area.enum';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { IProductNodePath } from '../products/product-node-path';
import { populateHierarchyColumns, safeFormatNumber } from 'src/app/utilities';
import { CapacityDataPageEnum, EngagementTypeEnum, TabsEnum } from '../enums';


export enum KaprTypeEnum {
  None = 0,
  Krins = 1,
  Kapr2 = 2,
  Kapr = 3,
  Kapr3 = 4,
  Kapr4 = 5,
  Turning = 6,
  DrillXxD = 7,
  Drill3xD = 8,
  Drill5xD = 9,
  Drill8xD = 10,
  Drill10xD = 11,
  Drill12xD = 12,
  Drill2xD = 13,
  Drill4xD = 14,
  Drill6xD = 15,
  Drill7xD = 16
};

export const SupportedKaprTypes = [
  KaprTypeEnum.Kapr2,
  KaprTypeEnum.Kapr3,
  KaprTypeEnum.Kapr4,
  KaprTypeEnum.Drill2xD,
  KaprTypeEnum.Drill3xD,
  KaprTypeEnum.Drill4xD,
  KaprTypeEnum.Drill5xD,
  KaprTypeEnum.Drill6xD,
  KaprTypeEnum.Drill7xD,
  KaprTypeEnum.Drill8xD,
  KaprTypeEnum.Drill10xD,
  KaprTypeEnum.Drill12xD
];

export class StartValuesCapacityDataModel implements ICapacityData {
  modified: Date;
}

export const fromServerResponse = (response) => {
  var model = new StartValuesModel();
  if (response) {
    if (response.publishedMaterials) {
      response.publishedMaterials.forEach((node) => {
        model.publishedMaterials.push(
          MaterialWithRankingModel.fromServerResponse(node)
        );
      });
    }

    if (response.availableMaterials) {
      response.availableMaterials.forEach((node) => {
        const availableMaterial =
          MaterialWithRankingModel.fromServerResponse(node);
        model.availableMaterials.push(availableMaterial);

        if (node.children) {
          node.children.forEach((child) => {
            const availableChildMaterial =
              MaterialWithRankingModel.fromServerResponse(child);
            model.availableMaterials.push(availableChildMaterial);
          });
        }
      });
    }

    model.numOfLabelRows = response.numOfLabelRows;

    if (response.subop) {
      model.engagementType = response.subop?.engagementType;
      model.dcap = StartValuesModel.getPropertyValue(response.subop?.dcap);
      model.ae = StartValuesModel.getPropertyValue(response.subop?.ae);
    }

    if (response.kapr) {
      model.kapr = ProductDataStartValuesKaprModel.fromServerResponse(
        response.kapr
      );
    }

    if (response.kapr2) {
      model.kapr2 = ProductDataStartValuesKaprModel.fromServerResponse(
        response.kapr2
      );
    }

    if (response.primaryKapr) {
      model.primaryKapr = ProductDataStartValuesKaprModel.fromServerResponse(
        response.primaryKapr
      );
    }

    if (response.flankKapr) {
      model.flankKapr = ProductDataStartValuesKaprModel.fromServerResponse(
        response.flankKapr
      );
    }

    model.depthOfCut = StartValuesModel.getPropertyValue(response.depthOfCut);
    model.vcHexConversionFactor = StartValuesModel.getPropertyValue(
      response.vcHexConversionFactor
    );
    model.labelRowsCount = response.labelRowsCount;
    model.isCompleteDataForFeedConversion =
      response.completeDataForFeedConversion;
    model.canNumberOfLabelRows = response.canNumberOfLabelRows;
    model.isStartValuesDefined = response.isStartValuesDefined;
    model.isMainArea = response.isMainArea;
    model.mainArea = response.mainArea;
    model.referenceMaterial = response.referenceMaterial;
    model.cuttingSpeed = response.cuttingSpeed;
    //model.allowTmcLevel5 = response.allowTmcLevel5;
    model.allowTmcLevel5 = true;
  }

  return model;
};

export class StartValuesModel
  extends ICapacityDataDetail<StartValuesCapacityDataModel>
  implements ICapacityDataDetail<ICapacityData>
{
  engagementType: EngagementTypeEnum;
  availableMaterials: Array<MaterialWithRankingModel>;
  publishedMaterials: Array<MaterialWithRankingModel>;
  numOfLabelRows: number;
  dcap: number;
  ae: number;
  kapr: ProductDataStartValuesKaprModel;
  kapr2: ProductDataStartValuesKaprModel;
  primaryKapr: ProductDataStartValuesKaprModel;
  flankKapr: ProductDataStartValuesKaprModel;
  depthOfCut: number;
  vcHexConversionFactor: number;
  labelRowsCount: number;
  isCompleteDataForFeedConversion: boolean;
  canNumberOfLabelRows: boolean;
  isStartValuesDefined: boolean;
  isMainArea: boolean;
  mainArea: ProductAreaEnum;
  referenceMaterial: ReferenceMaterialModel;
  cuttingSpeed: CuttingSpeedModel;
  partingGroovingVcSpeed: FeedSpeedModel;
  isPublished: boolean;
  kaprType: number;
  allowTmcLevel5: boolean;
  constructor(init?: Partial<StartValuesModel>) {
    super();
    if (init) {
      Object.assign(this, init);
    } else {
      this.clear();
    }
  }

  public clear(): void {
    this.engagementType = null;
    this.availableMaterials = new Array<MaterialWithRankingModel>();
    this.publishedMaterials = new Array<MaterialWithRankingModel>();
    this.numOfLabelRows = null;
    this.kapr = null;
    this.kapr2 = null;
    this.primaryKapr = null;
    this.flankKapr = null;
    this.dcap = null;
    this.ae = null;
    this.depthOfCut = null;
    this.vcHexConversionFactor = null;
    this.labelRowsCount = null;
    this.isCompleteDataForFeedConversion = null;
    this.canNumberOfLabelRows = null;
    this.isStartValuesDefined = null;
    this.isMainArea = null;
    this.mainArea = null;
  }

  toJson(): any {
    return {
      publishedMaterials: this.publishedMaterials.map(ite => ({...ite, 
        tmc5MaterialPath: toMaterialNode(ite.selectedTMC5PathString),
        geometryRank: ite.geometryRank,
        gradeRank: ite.geometryRank,
        materialPath:{
          nodes: this.materialPath.nodes
        },
        validatorResult:ite.validatorResult
      })),
      numOfLabelRows: this.numOfLabelRows,
      kapr2: this.kapr2 ? this.kapr2.toJson() : null,
    };
  }

  get isDefined(): boolean {
    return this.kapr2 === null || isNumber(this.kapr2?.value);
  }

  get isValid(): boolean {
    return this.isDefined;
  }

  get isOptionalEmpty(): boolean {
    return Boolean(this.kapr2) && !this.kapr2?.value;
  }

  public static getPropertyValue(property): number {
    return isNumber(property) ? property : null;
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.StartValues,
      name: CdmAccordionRoute.StartValues,
      displayName: 'Start Values',
      pageName: CapacityDataPageEnum.IndexableDrillingStartValues,
      mapToAccordionItem: StartValuesModel.mapToAccordionItem,
      mapToGridItem: mapDrillingGridItem,
    };
  }

  static mapToGridItem(item: IBaseHierarchyGridItem<StartValuesModel>) {
    if (!item?.data || !item?.productPath) {
      return {};
    }

    const { cuttingSpeed } = item.data;

    const data = {
      ...StartValuesModel.mapCommonItem(item),
      fz1: !cuttingSpeed.feedSpeedZ.calculationValidatorResult
        .isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedZ?.feed1, 2),
      fz2: !cuttingSpeed.feedSpeedZ.calculationValidatorResult
        .isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedZ?.feed2, 2),
      fz3: !cuttingSpeed.feedSpeedZ.calculationValidatorResult
        .isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedZ?.feed3, 2),
      vc1: !cuttingSpeed.feedSpeedZ.calculationValidatorResult
        .isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedZ.vc1, 2),
      vc2: !cuttingSpeed.feedSpeedZ.calculationValidatorResult
        .isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedZ.vc2, 2),
      vc3: !cuttingSpeed.feedSpeedZ.calculationValidatorResult
        .isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedZ.vc3, 2),
      blank: '',
    };

    return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
  }

  static mapCommonItem(item: IBaseHierarchyGridItem<StartValuesModel>) {
    if (!item?.data || !item?.productPath) {
      return {};
    }
    const nodes = item.data.materialPath.nodes || [];
    const { referenceMaterial, cuttingSpeed, isPublished } = item.data;

    return {
      path: item.productPath.nodes
        ?.slice(0, item.productPath?.nodes?.length - 1)
        .join(MATERIAL_ARROW),
      node: last(item.productPath.nodes),
      material:
        nodes.length > 0 ? `${first(nodes)}${nodes.slice(1).join('.')}` : 'All',
      kapr: cuttingSpeed.kapr && `KAPR=${formatColumnByCustomNumberFilterFn(cuttingSpeed.kapr, 2)}`,
      refmat: referenceMaterial && referenceMaterial.label,
      hrdact:
        referenceMaterial &&
        `${referenceMaterial.hardnessActual} ${referenceMaterial.hardnessUom}`,
      kaprType: item.data.kaprType,
      vc: cuttingSpeed && formatColumnByCustomNumberFilterFn(cuttingSpeed.vc, 2),
      isPublished: isPublished,
      kaprTypeName: SupportedKaprTypes.indexOf(item.data.kaprType) >= 0 ? RESOURCES[`KaprTypeEnum_${KaprTypeEnum[item.data.kaprType]}`] : ''
    };
  }

  static mapToBoringGridItem(item: IBaseHierarchyGridItem<StartValuesModel>) {
    if (!item?.data || !item?.productPath) {
      return {};
    }

    let {
      cuttingSpeed: { feedSpeedN, apmn, apmx, apnom },
    } = item.data || { cuttingSpeed: {} };
    feedSpeedN = feedSpeedN || ({} as FeedSpeedModel);
    const data = {
      ...StartValuesModel.mapCommonItem(item),
      fn1: !feedSpeedN.calculationValidatorResult.isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(feedSpeedN.feed1, 2),
      fn2: !feedSpeedN.calculationValidatorResult.isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(feedSpeedN.feed2, 2),
      fn3: !feedSpeedN.calculationValidatorResult.isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(feedSpeedN.feed3, 2),
      vc1: !feedSpeedN.calculationValidatorResult.isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(feedSpeedN.vc1, 2),
      vc2: !feedSpeedN.calculationValidatorResult.isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(feedSpeedN.vc2, 2),
      vc3: !feedSpeedN.calculationValidatorResult.isCalculationValid
        ? 'N/A'
        : formatColumnByCustomNumberFilterFn(feedSpeedN.vc3, 2),
      apmn: formatColumnByCustomNumberFilterFn(apmn, 2),
      apmx: formatColumnByCustomNumberFilterFn(apmx, 2),
      apnom: formatColumnByCustomNumberFilterFn(apnom, 2),
      blank: '',
    };

    return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
  }

  static mapToAccordionItem = (
    response: any,
    productPath?: IProductNodePath
  ): StartValuesModel => {
    return fromServerResponse(response);
  };

  static get ThreadTurningGridColumns(): IHierarchyColumn[] {
    return populateHierarchyColumns([
      {
        id: 'refmat',
        name: 'REFMAT',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'hrdact',
        name: 'HRDACT',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'ap',
        name: 'AP',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'nap',
        name: 'NAP',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'vc',
        name: 'VC',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
    ]);
  }

  static get boringGridColumns(): IHierarchyColumn[] {
    return [
      {
        id: 'refmat',
        name: 'REFMAT',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'hrdact',
        name: 'HRDACT',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'fn1',
        name: 'FN<sub>1</sub>',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'fn2',
        name: 'FN<sub>2</sub>',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'fn3',
        name: 'FN<sub>3</sub>',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'vc1',
        name: 'VC<sub>1</sub>',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'vc2',
        name: 'VC<sub>2</sub>',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'vc3',
        name: 'VC<sub>3</sub>',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'apmn',
        name: 'Apmn',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'apnom',
        name: 'Apnom',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
      {
        id: 'apmx',
        name: 'Apmx',
        isCheckbox: false,
        width: 50,
        customClass: 'text-center',
      },
    ];
  }
}

export const TAPPING_GRID_COLUMNS = populateHierarchyColumns([
  {
    id: 'kapr',
    name: 'Label Type',
    isCheckbox: false,
    width: 100,
    customClass: 'text-center',
  },
  {
    id: 'refmat',
    name: 'REFMAT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'hrdact',
    name: 'HRDACT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc',
    name: 'VC',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
]);

export const INDEXABLE_MILLING_GRID_COLUMNS = populateHierarchyColumns([
  {
    id: 'kaprTypeName',
    name: 'Extended Label',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'kapr',
    name: 'Label Type',
    isCheckbox: false,
    width: 100,
    customClass: 'text-center',
  },
  {
    id: 'refmat',
    name: 'REFMAT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'hrdact',
    name: 'HRDACT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fz1',
    name: 'FZ<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fz2',
    name: 'FZ<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fz3',
    name: 'FZ<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc1',
    name: 'VC<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc2',
    name: 'VC<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc3',
    name: 'VC<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
]);

export const SOLID_MILLING_GRID_COLUMNS = populateHierarchyColumns([
  {
    id: 'kapr',
    name: 'Label Type',
    isCheckbox: false,
    width: 100,
    customClass: 'text-center',
  },
  {
    id: 'refmat',
    name: 'REFMAT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'hrdact',
    name: 'HRDACT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fz1',
    name: 'FZ<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fz2',
    name: 'FZ<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fz3',
    name: 'FZ<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc1',
    name: 'VC<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc2',
    name: 'VC<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc3',
    name: 'VC<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
]);
export const GENERAL_TURNING_GRID_COLUMNS = populateHierarchyColumns([
  {
    id: 'kaprTypeName',
    name: 'Extended Label',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'kapr',
    name: 'Label Type',
    isCheckbox: false,
    width: 100,
    customClass: 'text-center',
  },
  {
    id: 'refmat',
    name: 'REFMAT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'hrdact',
    name: 'HRDACT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fn1',
    name: 'FN<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fn2',
    name: 'FN<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fn3',
    name: 'FN<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc1',
    name: 'VC<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc2',
    name: 'VC<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc3',
    name: 'VC<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'apmn',
    name: 'Apmn',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'apnom',
    name: 'Apnom',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'apmx',
    name: 'Apmx',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
]);

export const partingGroovingGridColumns = populateHierarchyColumns([
  {
    id: 'kaprTypeName',
    name: 'Extended Label',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'refmat',
    name: 'REFMAT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'hrdact',
    name: 'HRDACT',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fnfnx1',
    name: 'FN<sub>1</sub>/FNX<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fnfnx2',
    name: 'FN<sub>2</sub>/FNX<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fnfnx3',
    name: 'FN<sub>3</sub>/FNX<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc1',
    name: 'VC<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc2',
    name: 'VC<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'vc3',
    name: 'VC<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fnfnz1',
    name: 'FN<sub>1</sub>/FNZ<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fnfnz2',
    name: 'FN<sub>2</sub>/FNZ<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'fnfnz3',
    name: 'FN<sub>3</sub>/FNZ<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'ap1',
    name: 'AP<sub>1</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'ap2',
    name: 'AP<sub>2</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
  {
    id: 'ap3',
    name: 'AP<sub>3</sub>',
    isCheckbox: false,
    width: 50,
    customClass: 'text-center',
  },
]);

export const REAMING_AND_INDEXABLE_DRILLING_GRID_COLUMN_DEFS =
  populateHierarchyColumns([
    {
      id: 'kaprTypeName',
      name: 'Extended Label',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'kapr',
      name: 'Label Type',
      isCheckbox: false,
      width: 100,
      customClass: 'text-center',
    },
    {
      id: 'refmat',
      name: 'REFMAT',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'hrdact',
      name: 'HRDACT',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'fn1',
      name: 'FN<sub>1</sub>',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'fn2',
      name: 'FN<sub>2</sub>',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'fn3',
      name: 'FN<sub>3</sub>',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'vc1',
      name: 'VC<sub>1</sub>',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'vc2',
      name: 'VC<sub>2</sub>',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
    {
      id: 'vc3',
      name: 'VC<sub>3</sub>',
      isCheckbox: false,
      width: 50,
      customClass: 'text-center',
    },
  ]);

export const mapToGeneralTurningGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
) => {
  if (!item?.data || !item?.productPath) {
    return {};
  }
  const { cuttingSpeed } = item.data;
  const data = {
    ...StartValuesModel.mapCommonItem(item),
    fn1: !cuttingSpeed.feedSpeedN?.calculationValidatorResult
      ?.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedN?.feed1, 2),
    fn2: !cuttingSpeed.feedSpeedN?.calculationValidatorResult
      ?.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedN?.feed2, 2),
    fn3: !cuttingSpeed.feedSpeedN?.calculationValidatorResult
      ?.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedN?.feed3, 2),
    vc1: !cuttingSpeed.feedSpeedN?.calculationValidatorResult
      ?.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedN?.vc1, 2),
    vc2: !cuttingSpeed.feedSpeedN?.calculationValidatorResult
      ?.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedN?.vc2, 2),
    vc3: !cuttingSpeed.feedSpeedN?.calculationValidatorResult
      ?.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(cuttingSpeed.feedSpeedN?.vc3, 2),
    apmn:
      cuttingSpeed && formatColumnByCustomNumberFilterFn(cuttingSpeed.apmn, 2),
    apnom:
      cuttingSpeed && formatColumnByCustomNumberFilterFn(cuttingSpeed.apnom, 2),
    apmx:
      cuttingSpeed && formatColumnByCustomNumberFilterFn(cuttingSpeed.apmx, 2),
    blank: '',
  };

  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const mapReamingGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
) => {
  if (!item?.data || !item?.productPath) {
    return {};
  }

  const {
    cuttingSpeed: { reamingFeedSpeed },
  } = item.data;

  const data = {
    ...StartValuesModel.mapCommonItem(item),
    fn1: !reamingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(reamingFeedSpeed.feed1, 2),
    fn2: !reamingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(reamingFeedSpeed.feed2, 2),
    fn3: !reamingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(reamingFeedSpeed.feed3, 2),
    vc1: !reamingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(reamingFeedSpeed.vcmax, 2),
    vc2: !reamingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(reamingFeedSpeed.vcnom, 2),
    vc3: !reamingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(reamingFeedSpeed.vcmin, 2),
    blank: '',
  };

  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const mapDrillingGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
) => {
  if (!item?.data || !item?.productPath) {
    return {};
  }

  const { drillingFeedSpeed } = item.data.cuttingSpeed;
  const isCalculationValid =
    drillingFeedSpeed.calculationValidatorResult?.isCalculationValid;
  const data = {
    ...StartValuesModel.mapCommonItem(item),
    fn1: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(drillingFeedSpeed.feed1, 2),
    fn2: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(drillingFeedSpeed.feed2, 2),
    fn3: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(drillingFeedSpeed.feed3, 2),
    vc1: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(drillingFeedSpeed.vcmax, 2),
    vc2: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(drillingFeedSpeed.vcnom, 2),
    vc3: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(drillingFeedSpeed.vcmin, 2),
    blank: '',
  };

  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const mapToThreadTurningGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
): any => {
  if (!item?.data || !item?.productPath) {
    return {};
  }
  const {
    cuttingSpeed: { threadNapVc },
  } = item.data;

  const isCalculationValid =
    threadNapVc.calculationValidatorResult?.isCalculationValid;

  const data = {
    ...StartValuesModel.mapCommonItem(item),
    ap: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(threadNapVc.ap, 2),
    nap: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(threadNapVc.nap, 0),
    vc: !isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(threadNapVc.vc, 2),
    blank: '',
  };

  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const mapToTappingGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
) => {
  if (!item?.data || !item?.productPath) {
    return {};
  }

  const {
    cuttingSpeed: { tappingSpeed },
  } = item.data;

  const data = {
    ...StartValuesModel.mapCommonItem(item),
    vc: !tappingSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(tappingSpeed?.vc, 2),
    blank: '',
  };

  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const mapToMillingSolidGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
) => {
  if (!item?.data || !item?.productPath) {
    return {};
  }

  const {
    cuttingSpeed: { solidMillingFeedSpeed },
  } = item.data;

  const data = {
    ...StartValuesModel.mapCommonItem(item),
    fz1: !solidMillingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(solidMillingFeedSpeed?.feed1, 2),
    fz2: !solidMillingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(solidMillingFeedSpeed?.feed2, 2),
    fz3: !solidMillingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(solidMillingFeedSpeed?.feed3, 2),
    vc1: !solidMillingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(solidMillingFeedSpeed?.vcmax, 2),
    vc2: !solidMillingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(solidMillingFeedSpeed?.vcnom, 2),
    vc3: !solidMillingFeedSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(solidMillingFeedSpeed?.vcmin, 2),
    blank: '',
  };

  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const mapToPartingGroovingGridItem = (
  item: IBaseHierarchyGridItem<StartValuesModel>
) => {
  if (!item?.data || !item?.productPath) {
    return {};
  }
  let partingGroovingVcSpeed: FeedSpeedModel;
  const { cuttingSpeed } = item.data;
  const {
    cuttingSpeed: { feedSpeedNe, feedSpeedNs },
  } = item.data;
  const canDisplayFeedSpeedNe =
    feedSpeedNe?.calculationValidatorResult.isCalculationValid;
  const canDisplayFeedSpeedNs =
    feedSpeedNs?.calculationValidatorResult.isCalculationValid;

  if (feedSpeedNe && canDisplayFeedSpeedNe) {
    partingGroovingVcSpeed = createPartingGrovingVcSpeed(feedSpeedNe);
  } else if (feedSpeedNs && canDisplayFeedSpeedNs) {
    partingGroovingVcSpeed = createPartingGrovingVcSpeed(feedSpeedNs);
  } else {
    partingGroovingVcSpeed = createPartingGrovingVcSpeed();
  }

  const data = {
    ...StartValuesModel.mapCommonItem(item),
    fnfnx1: feedSpeedNe && feedSpeedNe?.feed1,
    fnfnx2: feedSpeedNe && feedSpeedNe?.feed2,
    fnfnx3: feedSpeedNe && feedSpeedNe?.feed3,
    vc1: !partingGroovingVcSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(partingGroovingVcSpeed.vc1, 2),
    vc2: !partingGroovingVcSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(partingGroovingVcSpeed.vc2, 2),
    vc3: !partingGroovingVcSpeed.calculationValidatorResult.isCalculationValid
      ? 'N/A'
      : formatColumnByCustomNumberFilterFn(partingGroovingVcSpeed.vc3, 2),
    fnfnz1: feedSpeedNs && feedSpeedNs?.feed1,
    fnfnz2: feedSpeedNs && feedSpeedNs?.feed2,
    fnfnz3: feedSpeedNs && feedSpeedNs?.feed3,
    ap1: cuttingSpeed && cuttingSpeed.apmn,
    ap2: cuttingSpeed && cuttingSpeed.apnom,
    ap3: cuttingSpeed && cuttingSpeed.apmx,
    kaprTypeName: item.data.kaprType === KaprTypeEnum.Turning  ? RESOURCES['KaprTypeEnum_Turning'] : '',
    blank: '',
  };
  return { ...data, rowClass: transformGridRowColorForStartValue(data.isPublished) };
};

export const createPartingGrovingVcSpeed = (
  feedSpeed: FeedSpeedModel = null
): FeedSpeedModel => {
  let model: FeedSpeedModel = {
    vc1: null,
    vc2: null,
    vc3: null,
    feed1: null,
    feed2: null,
    feed3: null,
    vcmax: null,
    vcnom: null,
    vcmin: null,
    validationMessage: null,
    isCalculationValid: null,
    messages: [],
    missingParams: [],
    clear(): void {
      this.isCalculationValid = null;
      this.validationMessage = null;
      this.messages = null;
      this.missingParams = null;
    },
    calculationValidatorResult: {
      isCalculationValid: null,
      validationMessage: null,
      missingParams: [],
      messages: [],
      clear(): void {
        this.isCalculationValid = null;
        this.validationMessage = null;
        this.messages = null;
        this.missingParams = null;
      },
    },
  };

  if (feedSpeed) {
    model.calculationValidatorResult = feedSpeed.calculationValidatorResult;
    model.vc1 = feedSpeed.vc1;
    model.vc2 = feedSpeed.vc2;
    model.vc3 = feedSpeed.vc3;
  } else {
    model.calculationValidatorResult.isCalculationValid = false;
    model.calculationValidatorResult.validationMessage = null;
  }

  return model;
};

export const formatColumnByCustomNumberFilterFn = (
  value: number,
  customNumberFilter
) => {
  if (!!customNumberFilter) {
    return safeFormatNumber(value, 'en', `1.2-${customNumberFilter}`);
  }
  return value;
};

export const toMaterialNode = (materiaPathString: string): IMaterialNodePath => {
  let result = [];
  if (!!materiaPathString && materiaPathString.length > 0) {
    const splitString = materiaPathString.split('.');
    result = splitString.flatMap((s, index) => {
      if(index !== splitString.length -1){
        return s.split('');
      }
      return s
    });
  }
  return {
    nodes: result
  }
}

export const transformGridRowColorForStartValue = (isPublished: boolean): string => isPublished ? '!bg-[#f4ffee] hover:!bg-[#dfeed7]' : '!bg-orange-100 hover:!bg-orange-200';