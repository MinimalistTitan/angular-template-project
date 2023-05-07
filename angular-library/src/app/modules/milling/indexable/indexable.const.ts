import { CdmAccordionRoute } from "src/app/core/capacity-data/capacity-data.enum";
import { IAccordionSetting, IDictionary } from "src/app/models";
import { CapacityDataPageEnum, TabsEnum } from "src/app/models/enums";
import { CdmSubModule } from "src/app/share/shared.enum";







const INTERNAL_ACCORDION = {
  StartValues: {
    ...COMMON_ACCORDION.StartValue,
    pageName: CapacityDataPageEnum.IndexableMillingStartValues,
    mapToGridItem: StartValuesModel.mapToGridItem,
  },
  ProductReleaseStartValue: {
    ...COMMON_ACCORDION.ProductReleaseStartValue,
    pageName: CapacityDataPageEnum.IndexableMillingReleaseProduct,
  },
};

export const INDEXABLE_MILLING_ACCORDION: IDictionary<IAccordionSetting[]> = {
  [CdmSubModule.Geometry]: [
    COMMON_ACCORDION.Ranking,
    COMMON_ACCORDION.WorkingCondition,
    {
      id: TabsEnum.IndexableMillingSuboperations,
      name: CdmAccordionRoute.IndexableMillingSuboperations,
      productDetailSegment: CdmAccordionRoute.Suboperation,
      displayName: 'Suboperation',
      pageName: CapacityDataPageEnum.IndexableMillingGeometrySuboperations,
      mapToAccordionItem: IndexableMillingSuboperationModel.mapToAccordionItem,
      mapToGridItem: IndexableMillingSuboperationModel.mapToGridItem,
    },
    {
      id: TabsEnum.Feed,
      name: CdmAccordionRoute.FeedForGeometry,
      displayName: 'Chip Thickness',
      pageName: CapacityDataPageEnum.FeedForGeometry,
      productDetailSegment: CdmAccordionRoute.ChipThickness,
      mapToGridItem: GeometryFeedModel.mapToGridItem,
      mapToAccordionItem: GeometryFeedModel.mapToAccordionItem,
      validationTabName:TabsEnum.ChipThickness
    },
    {
      id: TabsEnum.GeometryFeedAxial,
      name: CdmAccordionRoute.ChipThicknessAxial,
      displayName: 'Chip Thickness Axial',
      pageName: CapacityDataPageEnum.IndexableMillingGeometryFeedAxial,
      mapToGridItem: IndexableMillingFeedAxialModel.mapToGridItem,
      mapToAccordionItem: IndexableMillingFeedAxialModel.mapToAccordionItem,
    },
    COMMON_ACCORDION.CorrectionFactor,
    {
      id: TabsEnum.RelativeEngagement,
      name: CdmAccordionRoute.RelativeEngagement,
      displayName: 'Relative Engagement',
      pageName: CapacityDataPageEnum.RelativeEngagement,
      mapToAccordionItem:
        IndexableMillingRelativeEngagementModel.mapToAccordionItem,
      mapToGridItem: IndexableMillingRelativeEngagementModel.mapToGridItem,
    },
    {
      id: TabsEnum.SurfaceRoughness,
      name: CdmAccordionRoute.MinSurfaceRoughness,
      displayName: 'Min Surface Roughness',
      pageName: CapacityDataPageEnum.SurfaceRoughness,
      mapToAccordionItem: SurfaceRoughnessModel.mapToAccordionItem,
      mapToGridItem: SurfaceRoughnessModel.mapToGridItem,
    },
    {
      id: TabsEnum.IndexableMillingCuttingSpeedCorrection,
      name: CdmAccordionRoute.IndexableMillingCuttingSpeedCorrection,
      productDetailSegment: CdmAccordionRoute.CuttingSpeedCorrection,
      displayName: 'Cutting Speed Correction',
      pageName:
        CapacityDataPageEnum.IndexableMillingGeometryCuttingSpeedCorrectionPage,
      mapToAccordionItem:
        IndexableMillingCuttingSpeedCorrectionModel.mapToAccordionItem,
      mapToGridItem: IndexableMillingCuttingSpeedCorrectionModel.mapToGridItem,
    },
    {
      id: TabsEnum.IndexableMillingToolLifeCorrection,
      name: CdmAccordionRoute.IndexableMillingToolLifeCorrection,
      productDetailSegment: CdmAccordionRoute.ToolLifeCorrection,
      displayName: 'Tool Life Correction',
      pageName: CapacityDataPageEnum.IndexableMillingGeometryToolLifeCorrection,
      mapToAccordionItem:
        IndexableMillingToolLifeCorrectionModel.mapToAccordionItem,
      mapToGridItem: IndexableMillingToolLifeCorrectionModel.mapToGridItem,
    },
    COMMON_ACCORDION.OperationType,
    {
      id: TabsEnum.Kapr,
      name: CdmAccordionRoute.StartValueKAPR,
      displayName: 'Start Value KAPR',
      pageName: CapacityDataPageEnum.Kapr,
      mapToAccordionItem: KarpModel.mapToAccordionItem,
      mapToGridItem: KarpModel.mapToGridItem,
    },
  ],
  [CdmSubModule.Body]: [
    {
      id: TabsEnum.Ranking,
      name: CdmAccordionRoute.Ranking,
      displayName: 'Ranking',
      pageName: CapacityDataPageEnum.Ranking,
      mapToGridItem: RankingModel.mapToGridItem,
      mapToAccordionItem: RankingModel.mapToAccordionItem,
    },
    COMMON_ACCORDION.InsertIndexCount,
    {
      id: TabsEnum.MaximumOfMaxEngagement,
      name: CdmAccordionRoute.MaximumOfMaxEngagements,
      displayName: 'Maximum Of Max Engagements',
      pageName: CapacityDataPageEnum.MaximumOfMaxEngagement,
      mapToAccordionItem: MaximumOfMaxEngagementModel.mapToAccordionItem,
      mapToGridItem: MaximumOfMaxEngagementModel.mapToGridItem,
    },
    COMMON_ACCORDION.CuttingSpeedCorrection,
    {
      id: TabsEnum.MaxChipThicknessCorrection,
      name: CdmAccordionRoute.MaxChipThicknessCorrections,
      displayName: 'Maximum Correction of Chip Thickness',
      pageName: CapacityDataPageEnum.MaxChipThicknessCorrection,
      mapToGridItem: MaxChipThicknessCorrectionModel.mapToGridItem,
      mapToAccordionItem: MaxChipThicknessCorrectionModel.mapToAccordionItem,
    },
    {
      id: TabsEnum.AermxCorrection,
      name: CdmAccordionRoute.AermxCorrections,
      displayName: 'Aermx Correction',
      pageName: CapacityDataPageEnum.AermxCorrection,
      mapToGridItem: AermxCorrectionModel.mapToGridItem,
      mapToAccordionItem: AermxCorrectionModel.mapToAccordionItem,
    },
  ],
  [CdmSubModule.Grade]: [
    COMMON_ACCORDION.Ranking,
    COMMON_ACCORDION.CoolantRanking,
    COMMON_ACCORDION.CoolantCvc,
    COMMON_ACCORDION.WorkingCondition,
    COMMON_ACCORDION.FeedForGrade,
    COMMON_ACCORDION.ToolLife,
    {
      ...COMMON_ACCORDION.CuttingSpeed,
      pageName: CapacityDataPageEnum.IndexableMillingCuttingSpeed,
      name: CdmAccordionRoute.IndexableMillingCuttingSpeed,
      productDetailSegment: CdmAccordionRoute.CuttingSpeed,
    },
  ],
  [CdmSubModule.ProductData]: [
    INTERNAL_ACCORDION.StartValues,
    INTERNAL_ACCORDION.ProductReleaseStartValue,
    COMMON_ACCORDION.Cd2cValidation,
    COMMON_ACCORDION.FirstChoiceManagement,
  ],
};
export const INDEXABLE_MILLING_GRID_COLUMN: IDictionary<IHierarchyColumn[]> = {
  [CdmAccordionRoute.Ranking]: populateHierarchyColumns(RankingModel.columns),
  [CdmAccordionRoute.CoolantRanking]: populateHierarchyColumns(
    CoolantRankingModel.indexableMillingGradeColumns
  ),
  [CdmAccordionRoute.CoolantCvc]: populateHierarchyColumns(
    CoolantCvcModel.indexableMillingGradeColumns
  ),
  [CdmAccordionRoute.ToolLife]: populateHierarchyColumns(ToolLifeModel.columns),
  [CdmAccordionRoute.WorkingCondition]: populateHierarchyColumns(
    WorkingConditionModel.columns
  ),
  [CdmAccordionRoute.IndexableMillingSuboperations]: populateHierarchyColumns([
    {
      id: 'mlName',
      name: 'ML',
      isCheckbox: false,
      customClass: 'text-center',
      isRankingValue: true,
    },
    {
      id: 'millpgName',
      name: 'MILLPLG',
      isCheckbox: false,
      customClass: 'text-center',
      isRankingValue: true,
    },
  ]),
  [CdmAccordionRoute.IndexableMillingCuttingSpeedCorrection]:
    populateHierarchyColumns([
      {
        id: 'cvcorr',
        name: 'CVCCORR_ML',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'cvcorrMillplg',
        name: 'CVCCORR_MILLPLG',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ]),
  [CdmAccordionRoute.IndexableMillingToolLifeCorrection]:
    populateHierarchyColumns([
      {
        id: 'ctlcorr',
        name: 'CTLCORR_ML',
        isCheckbox: false,
        customClass: 'text-center',
      },
      {
        id: 'ctlcorrMillplg',
        name: 'CTLCORR_MILLPLG',
        isCheckbox: false,
        customClass: 'text-center',
      },
    ]),
  [CdmAccordionRoute.MinSurfaceRoughness]: populateHierarchyColumns([
    {
      id: 'rrznside',
      name: 'RRZNSIDE',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'rrznface',
      name: 'RRZNFACE',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),

  [CdmAccordionRoute.StartValueKAPR]: populateHierarchyColumns([
    {
      id: 'karp2',
      name: 'KARP2',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'karp3',
      name: 'KARP3',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'karp4',
      name: 'KARP4',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.CorrectionFactor]: populateHierarchyColumns(
    CuttingForceModel.columns
  ),
  [CdmAccordionRoute.ChipThicknessAxial]: populateHierarchyColumns([
    {
      id: 'hexn',
      name: 'HEXN',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'hexnom',
      name: 'HEXNOM',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'hexx',
      name: 'HEXX',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.FeedForGeometry]: populateHierarchyColumns([
    {
      id: 'hexn',
      name: 'HEXN',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'hexnom',
      name: 'HEXNOM',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'hexx',
      name: 'HEXX',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.FeedForGrade]: populateHierarchyColumns(
    GradeFeedModel.columns,
    'IntGrade'
  ),
  [CdmAccordionRoute.RelativeEngagement]: populateHierarchyColumns([
    {
      id: 'engagementTypeName',
      name: 'Operation',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'dcap',
      name: 'DCAP',
      isCheckbox: false,
      customClass: 'text-center',
    },
    {
      id: 'ae',
      name: 'AE',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.OperationTypeMedium]: populateHierarchyColumns(
    OperationTypeModel.columns
  ),
  [CdmAccordionRoute.IndexInsertCount]: populateHierarchyColumns(
    InsertIndexCountModel.columns
  ),
  [CdmAccordionRoute.MaximumOfMaxEngagements]: populateHierarchyColumns([
    {
      id: 'aeapx',
      name: 'AEAPX',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.MaxChipThicknessCorrections]: populateHierarchyColumns([
    {
      id: 'chexcorr',
      name: 'CHEXCORR',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.AermxCorrections]: populateHierarchyColumns([
    {
      id: 'caermx',
      name: 'CAERMX',
      isCheckbox: false,
      customClass: 'text-center',
    },
  ]),
  [CdmAccordionRoute.ReleaseProduct]:
    ProductReleaseModel.generalTurningReleaseStartValuesGridColumn,
  [CdmAccordionRoute.Cd2cValidation]:
    ProductDataCd2cValidationModel.toolguideValidationGridColumns,
  [CdmAccordionRoute.StartValues]: INDEXABLE_MILLING_GRID_COLUMNS,
  [CdmAccordionRoute.FirstChoiceManagement]:
    FIRST_CHOICE_MANAGEMENT_GRID_COLUMNS,
};

export const INDEXABLE_MILLING_SUB_MODULES: IDictionary<ProductHierarchyTypeEnum> =
  {
    [CdmSubModule.Geometry]: ProductHierarchyTypeEnum.IndexableMillingGeometry,
    [CdmSubModule.Grade]: ProductHierarchyTypeEnum.IndexableMillingGrade,
    [CdmSubModule.Body]: ProductHierarchyTypeEnum.IndexableMillingBody,
    [CdmSubModule.ProductData]:
      ProductHierarchyTypeEnum.IndexableMillingProductData,
    [CdmSubModule.FirstChoice]:
      ProductHierarchyTypeEnum.IndexableMillingFirstChoice,
    [CdmSubModule.Report]: ProductHierarchyTypeEnum.IndexableMillingReport,
  };
