import { CapacityDataPageEnum, TabsEnum } from 'src/app/models/enums';
import { ToolLifeCorrectionModel } from './../../../models/tool-life/tool-life-correction.model';
import { CdmAccordionRoute } from '../capacity-data.enum';
import { RankingModel } from 'src/app/models/rankings';
import { TappingWorkingConditionModel, WorkingConditionModel } from 'src/app/models/working-condition';
import { CoolantCvcModel, CoolantRankingModel, CoolantToolLifeModel } from 'src/app/models/coolant';
import { CAPACITY_DETAIL_CONFIG, ToolLifeModel } from 'src/app/models/tool-life';
import { CuttingSpeedModel } from 'src/app/models/cutting/cutting-speed.model';

export const COMMON_ACCORDION = {
  Ranking: {
    id: TabsEnum.Ranking,
    name: CdmAccordionRoute.Ranking,
    displayName: 'Ranking',
    pageName: CapacityDataPageEnum.Ranking,
    mapToGridItem: RankingModel.mapToGridItem,
    mapToAccordionItem: RankingModel.mapToAccordionItem,
  },
  WorkingCondition: {
    id: TabsEnum.WorkingCondition,
    name: CdmAccordionRoute.WorkingCondition,
    displayName: 'Working Conditions',
    pageName: CapacityDataPageEnum.WorkingConditions,
    mapToGridItem: WorkingConditionModel.mapToGridItem,
    mapToAccordionItem: WorkingConditionModel.mapToAccordionItem,
  },
  SingleWorkingCondition: {
    id: TabsEnum.WorkingCondition,
    name: CdmAccordionRoute.TapingAndSolidMillingWorkingConditions,
    productDetailSegment: CdmAccordionRoute.WorkingCondition,
    displayName: 'Working Conditions',
    pageName: CapacityDataPageEnum.TappingWorkingConditions,
    mapToGridItem: TappingWorkingConditionModel.mapToGridItem,
    mapToAccordionItem: TappingWorkingConditionModel.mapToAccordionItem,
  },
  CoolantRanking: CoolantRankingModel.accordion,
  CoolantCvc: CoolantCvcModel.accordion,
  CoolantToolLifeCorrection: CoolantToolLifeModel.accordion,
  ToolLife: {
    id: TabsEnum.ToolLife,
    name: CdmAccordionRoute.ToolLife,
    displayName: 'Tool life',
    pageName: CapacityDataPageEnum.TooLife,
    mapToGridItem: ToolLifeModel.mapToGridItem,
    mapToAccordionItem: ToolLifeModel.mapToAccordionItem,
  },
  DrillingGradeToolLife: CAPACITY_DETAIL_CONFIG,
  ToolLifeCorrection: ToolLifeCorrectionModel.accordion,
  CuttingSpeed: CuttingSpeedModel.accordion,
  CuttingSpeedCorrection: {
    id: TabsEnum.CuttingSpeedCorrection,
    name: CdmAccordionRoute.CuttingSpeedCorrection,
    displayName: 'Cutting Speed Correction',
    pageName: CapacityDataPageEnum.CuttingSpeedCorrection,
    mapToGridItem: CuttingSpeedCorrectionModel.mapToGridItem,
    mapToAccordionItem: CuttingSpeedCorrectionModel.mapToAccordionItem,
  },
  InsertIndexCount: InsertIndexCountModel.accordion,
  FeedNomFactor: FeedNomFactorModule.CAPACITY_DETAIL_CONFIG,
  Feed: DrillingFeedModule.CAPACITY_DETAIL_CONFIG,
  FeedForceCorrection: FeedForceCorrection.CAPACITY_DETAIL_CONFIG,
  RgfRegrindingParameters: RgfRegrindingParameter.CAPACITY_DETAIL_CONFIG,
  EnteringAngle: {
    id: TabsEnum.EnteringAngle,
    name: CdmAccordionRoute.EnteringAngle,
    displayName: 'Entering Angle',
    pageName: CapacityDataPageEnum.EnteringAngle,
    mapToGridItem: EnteringAngleModel.mapToGridItem,
    mapToAccordionItem: EnteringAngleModel.mapToAccordionItem,
  },
  FeedForGrade: GradeFeedModel.accordion,
  FeedForGeometry: GeometryFeedModel.getDetailConfiguration,
  FeedFroGradeApmx: GradeFeedApmxModel.getDetailConfiguration,
  OperationArea: ProductDataOperationAreaGraphModel.accordion,
  Suboperation: SuboperationModel.accordion,
  CorrectionFactor: CuttingForceModel.accordion,
  OperationTypeFinishing: OperationTypeModel.accordion,
  DepthOfCut: {
    id: TabsEnum.DepthOfCut,
    name: CdmAccordionRoute.DepthOfCut,
    displayName: 'Depth of Cut',
    pageName: CapacityDataPageEnum.DepthOfCut,
    mapToGridItem: DepthOfCutModel.mapToGridItem,
    mapToAccordionItem: DepthOfCutModel.mapToAccordionItem,
  },
  CuttingAngle: {
    id: TabsEnum.CuttingAngle,
    name: CdmAccordionRoute.CuttingAngle,
    displayName: 'Cutting Angle',
    pageName: CapacityDataPageEnum.CuttingAngle,
    mapToGridItem: CuttingAngleModel.mapToGridItem,
    mapToAccordionItem: CuttingAngleModel.mapToAccordionItem,
  },
  StartValue : StartValuesModel.accordion,
  ProductReleaseStartValue : ProductReleaseModel.accordion,
  Cd2cValidation : ProductDataCd2cValidationModel.accordion,
  FirstChoiceManagement : ProductDataFirstChoiceManagementModel.accordion,  
  OperationType: OperationTypeModel.accordion
};