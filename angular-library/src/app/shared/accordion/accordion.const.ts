import { ICapacityDataPage } from 'src/app/models/capacity';

import { PageHierarchyLevel, PageTmcLevel } from './accordion.model';
import { BoringBodyHierarchyNodeTypeEnum, BoringGeometryHierarchyNodeTypeEnum, BoringGradeHierarchyNodeTypeEnum, CapacityDataPageEnum, DetailContentType, FirstChoiceHierarchyNodeTypeEnum, GeneralTurningBodyHierarchyNodeTypeEnum, GeneralTurningGeometryHierarchyNodeTypeEnum, GeneralTurningGradeHierarchyNodeTypeEnum, GeneralTurningProductDataHierarchyNodeTypeEnum, IndexableDrillingBodyHierarchyNodeTypeEnum, IndexableDrillingGeometryHierarchyNodeTypeEnum, IndexableDrillingGradeHierarchyNodeTypeEnum, IndexableMillingBodyHierarchyNodeTypeEnum, IndexableMillingGeometryHierarchyNodeTypeEnum, IndexableMillingGradeHierarchyNodeTypeEnum, PartingGroovingBodyHierarchyNodeTypeEnum, PartingGroovingGeometryHierarchyNodeTypeEnum, PartingGroovingGradeHierarchyNodeTypeEnum, ProductAssignmentHierarchyNodeTypeEnum, ProductHierarchyTypeEnum, ReamingGeometryHierarchyNodeTypeEnum, ReamingGradeHierarchyNodeTypeEnum, SolidDrillingBodyHierarchyNodeTypeEnum, SolidDrillingGeometryHierarchyNodeTypeEnum, SolidDrillingGradeHierarchyNodeTypeEnum, SolidMillingDiameterHierarchyNodeTypeEnum, SolidMillingGeometryHierarchyNodeTypeEnum, SolidMillingGradeHierarchyNodeTypeEnum, TappingGeometryHierarchyNodeTypeEnum, TappingGradeHierarchyNodeTypeEnum, ThreadTurningBodyHierarchyNodeTypeEnum, ThreadTurningGeometryHierarchyNodeTypeEnum, ThreadTurningGradeHierarchyNodeTypeEnum, TmcLevelEnum } from 'src/app/models/enums';
export const CAPACITY_DATA_PAGE: ICapacityDataPage[] = [
  {
    type: CapacityDataPageEnum.Ranking,
    listTemplate: '/Templates/CapacityDataRankingList',
    name: 'rankingPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableMillingGeometry,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.IndexableMillingGrade, isAllowed: true },
      { type: ProductHierarchyTypeEnum.IndexableMillingBody, isAllowed: false },
      {
        type: ProductHierarchyTypeEnum.GeneralTurningGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc5,
      },
      { type: ProductHierarchyTypeEnum.GeneralTurningGrade, isAllowed: true },
      {
        type: ProductHierarchyTypeEnum.PartingGroovingGeometry,
        isAllowed: true,
      },
      { type: ProductHierarchyTypeEnum.PartingGroovingGrade, isAllowed: true },
      { type: ProductHierarchyTypeEnum.ThreadTurningGeometry, isAllowed: true },
      { type: ProductHierarchyTypeEnum.ThreadTurningGrade, isAllowed: true },
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        isAllowed: true,
      },
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGrade,
        isAllowed: true,
      },
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingBody,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.TappingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.TappingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidMillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidMillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ReamingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ReamingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.BoringGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc5,
      },
      { type: ProductHierarchyTypeEnum.BoringGrade, isAllowed: true },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGrade,
        IndexableMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        PartingGroovingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGeometry,
        ThreadTurningGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGrade,
        ThreadTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGeometry,
        TappingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGrade,
        TappingGradeHierarchyNodeTypeEnum.InternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.CuttingProfileDesignCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        SolidDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ToolStyleCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGrade,
        ReamingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGrade,
        BoringGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
    includedInFilterEnabled: [
      ProductHierarchyTypeEnum.IndexableMillingGeometry,
    ],
  },
  {
    type: CapacityDataPageEnum.WorkingConditions,
    listTemplate: '/Templates/CapacityDataWorkingConditionList',
    name: 'workingConditionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableMillingGeometry,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.IndexableMillingGrade,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.IndexableMillingBody, isAllowed: false },
      {
        type: ProductHierarchyTypeEnum.GeneralTurningGeometry,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.GeneralTurningGrade, isAllowed: false },
      {
        type: ProductHierarchyTypeEnum.PartingGroovingGeometry,
        isAllowed: true,
      },
      { type: ProductHierarchyTypeEnum.PartingGroovingGrade, isAllowed: false },
      { type: ProductHierarchyTypeEnum.ThreadTurningGeometry, isAllowed: true },
      { type: ProductHierarchyTypeEnum.ThreadTurningGrade, isAllowed: false },
      { type: ProductHierarchyTypeEnum.ReamingGeometry, isAllowed: false },
      { type: ProductHierarchyTypeEnum.ReamingGrade, isAllowed: false },
      { type: ProductHierarchyTypeEnum.BoringGeometry, isAllowed: false },
      { type: ProductHierarchyTypeEnum.BoringGrade, isAllowed: false },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.Tolerance
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGrade,
        IndexableMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        PartingGroovingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGeometry,
        ThreadTurningGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGrade,
        ThreadTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ToolStyleCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGrade,
        ReamingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGrade,
        BoringGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DrillingWorkingConditions,
    listTemplate: '/Templates/CapacityData/DrillingWorkingConditionsList',
    name: 'drillingWorkingConditionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGrade,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.SolidDrillingGrade, isAllowed: false },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.CuttingProfileDesignCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.TappingWorkingConditions,
    listTemplate: '/Templates/Tapping/Common/WorkingConditionsList',
    name: 'tappingWorkingConditionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      { type: ProductHierarchyTypeEnum.TappingGeometry, isAllowed: false },
      { type: ProductHierarchyTypeEnum.TappingGrade, isAllowed: false },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGeometry,
        TappingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGrade,
        TappingGradeHierarchyNodeTypeEnum.InternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingWorkingConditions,
    listTemplate: '/Templates/SolidMilling/Common/WorkingConditionsList',
    name: 'solidMillingWorkingConditionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      { type: ProductHierarchyTypeEnum.SolidMillingGeometry, isAllowed: false },
      { type: ProductHierarchyTypeEnum.SolidMillingGrade, isAllowed: false },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.FeedForGeometry,
    listTemplate: '/Templates/CapacityData/GeometryFeedList',
    name: 'feedForGeometryPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.RecCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.RecCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.RecCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.PartingGroovingFeedFlankForGeometry,
    listTemplate: '/Templates/PartingGrooving/Geometry/Feed/List',
    name: 'feedFlankForGeometryPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        PartingGroovingGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ThreadTurningFeedForGeometry,
    listTemplate: '/Templates/ThreadTurning/Geometry/Feed/List',
    name: 'threadTurningFeedForGeometryPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        ThreadTurningGeometryHierarchyNodeTypeEnum.Pitch
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DrillingGeometryFeed,
    listTemplate: '/Templates/CapacityData/DrillingFeedGraph',
    name: 'drillingGeometryFeedPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc5,
        ProductHierarchyTypeEnum.IndexableDrillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc6,
        ProductHierarchyTypeEnum.ReamingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        isAllowed: false,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc5,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ReamingGeometry,
        isAllowed: false,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    isMultiselectDisabledOnAllLevels: true,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ToolStyleCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ToolStyleCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.FeedForGrade,
    listTemplate: '/Templates/CapacityData/GradeFeedList',
    name: 'feedForGradePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGrade,
        IndexableMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        PartingGroovingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGrade,
        ThreadTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.FeedForGradeApmx,
    listTemplate: '/Templates/CapacityData/GradeFeedApmxList',
    name: 'feedForGradeApmxPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DiameterFeed,
    listTemplate: '/Templates/CapacityData/DiameterFeedList',
    name: 'diameterFeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingDiameter,
        SolidMillingDiameterHierarchyNodeTypeEnum.DiameterRange
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DiameterFeedAxial,
    listTemplate: '/Templates/CapacityData/DiameterFeedAxialList',
    name: 'diameterFeedAxialPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingDiameter,
        SolidMillingDiameterHierarchyNodeTypeEnum.DiameterRange
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.CKC,
    listTemplate: '/Templates/CapacityData/CorrectionFactorList',
    name: 'ckcPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        GeneralTurningGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        PartingGroovingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        ThreadTurningGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        TappingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        ReamingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        null,
        BoringGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.RelativeEngagement,
    listTemplate: '/Templates/IndexableMilling/GeometryRelativeEngagementList',
    name: 'relativeEngagementPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.CoolantRanking,
    listTemplate: '/Templates/CapacityData/CoolantRankingList',
    name: 'coolantRankingPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      { type: ProductHierarchyTypeEnum.GeneralTurningGrade, isAllowed: true },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGrade,
        IndexableMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        PartingGroovingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGrade,
        ThreadTurningGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGrade,
        TappingGradeHierarchyNodeTypeEnum.CtmGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGrade,
        ReamingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGrade,
        BoringGradeHierarchyNodeTypeEnum.CTMGroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.CoolantCvc,
    listTemplate: '/Templates/CapacityData/CoolantCvcList',
    name: 'coolantCvcPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidMillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ReamingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGrade,
        IndexableMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        PartingGroovingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGrade,
        ThreadTurningGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGrade,
        TappingGradeHierarchyNodeTypeEnum.CtmGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGrade,
        ReamingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGrade,
        BoringGradeHierarchyNodeTypeEnum.CTMGroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.TooLife,
    listTemplate: '/Templates/CapacityData/ToolLifeList',
    name: 'toolLifePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableMillingGrade,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.IndexableMillingBody, isAllowed: false },
      { type: ProductHierarchyTypeEnum.GeneralTurningGrade, isAllowed: true },
      { type: ProductHierarchyTypeEnum.PartingGroovingGrade, isAllowed: false },
      { type: ProductHierarchyTypeEnum.ThreadTurningGrade, isAllowed: false },
      { type: ProductHierarchyTypeEnum.BoringGrade, isAllowed: true },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGrade,
        IndexableMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        PartingGroovingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGrade,
        ThreadTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGrade,
        BoringGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DrillingGradeTooLife,
    listTemplate: '/Templates/CapacityData/DrillingGrade/ToolLifeList',
    name: 'drillingGradeToolLifePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGrade,
        isAllowed: true,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ReamingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGrade,
        ReamingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableDrillingGeometryTooLife,
    listTemplate: '/Templates/IndexableDrilling/Geometry/ToolLifeList',
    name: 'indexableDrillingGeometryToolLifePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        isAllowed: false,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.TappingTooLife,
    listTemplate: '/Templates/Tapping/Grade/ToolLifeList',
    name: 'tappingToolLifePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.TappingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGrade,
        TappingGradeHierarchyNodeTypeEnum.InternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingTooLife,
    listTemplate: '/Templates/SolidMilling/Grade/ToolLifeList',
    name: 'solidMillingToolLifePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DepthOfCut,
    listTemplate: '/Templates/CapacityData/DepthOfCutList',
    name: 'depthOfCutPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.RecCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.RecCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.CuttingAngle,
    listTemplate: '/Templates/CapacityData/CuttingAngleList',
    name: 'cuttingAnglePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.InsertShapeCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.InsertShapeCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.Suboperation,
    listTemplate: '/Templates/CapacityData/SuboperationList',
    name: 'suboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGeometry,
        ThreadTurningGeometryHierarchyNodeTypeEnum.RecCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.PartingGroovingSuboperation,
    listTemplate: '/Templates/PartingGrooving/SuboperationList',
    name: 'partingGroovingSuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.FrontAngle
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.GeneralTurningBodySuboperation,
    listTemplate: '/Templates/GeneralTurning/Body/SuboperationList',
    name: 'generalTurningBodySuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningBody,
        GeneralTurningBodyHierarchyNodeTypeEnum.InsertShapeCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.PartingGroovingBodySuboperation,
    listTemplate: '/Templates/PartingGrooving/Body/SuboperationList',
    name: 'partingGroovingBodySuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingBody,
        PartingGroovingBodyHierarchyNodeTypeEnum.FeedDirection
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ThreadTurningBodySuboperation,
    listTemplate: '/Templates/ThreadTurning/Body/SuboperationList',
    name: 'threadTurningBodySuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningBody,
        ThreadTurningBodyHierarchyNodeTypeEnum.MountingDirection
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingGeometrySuboperations,
    listTemplate: '/Templates/SolidMilling/Geometry/SuboperationsList',
    name: 'solidMillingSuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.FeedFactor,
    listTemplate: '/Templates/CapacityData/FeedFactorList',
    name: 'feedFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DrillingFeedFactor,
    listTemplate: '/Templates/CapacityData/DrillingFeedFactorList',
    name: 'drillingFeedFactorPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingBody
      ),
    ],
    isTmcLevelChangeAllowed: [
      { type: ProductHierarchyTypeEnum.IndexableDrillingBody, isAllowed: true },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.Uldr
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        SolidDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.GeneralTurningBodyFeedFactor,
    listTemplate: '/Templates/GeneralTurning/Body/FeedFactorList',
    name: 'generalTurningBodyFeedFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningBody,
        GeneralTurningBodyHierarchyNodeTypeEnum.ConnectionSizeCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.PartingGroovingBodyFeedFactor,
    listTemplate: '/Templates/PartingGrooving/Body/FeedFactorList',
    name: 'partingGroovingBodyFeedFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingBody,
        PartingGroovingBodyHierarchyNodeTypeEnum.CuttingDepthMaximum
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DrillingRatio,
    listTemplate: '/Templates/CapacityData/DrillingRatioList',
    name: 'drillingRatioPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.SolidDrillingBody
      ),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        SolidDrillingBodyHierarchyNodeTypeEnum.Uldr
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.DrillingFeedNomFactor,
    listTemplate: '/Templates/CapacityData/DrillingFeedNomFactorList',
    name: 'drillingFeedNomFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingCuttingSpeed,
    listTemplate:
      '/Templates/IndexableMilling/Grade/CuttingSpeed/IndexableMillingGraph',
    name: 'indexableMillingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc5)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        IndexableMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.GeneralTurningCuttingSpeed,
    listTemplate:
      '/Templates/GeneralTurning/Grade/CuttingSpeed/GeneralTurningGraph',
    name: 'generalTurningCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc5)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.PartingGroovingCuttingSpeed,
    listTemplate:
      '/Templates/PartingGrooving/Grade/CuttingSpeed/PartingGroovingGraph',
    name: 'partingGroovingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc5)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        PartingGroovingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ThreadTurningCuttingSpeed,
    listTemplate:
      '/Templates/ThreadTurning/Grade/CuttingSpeed/ThreadTurningGraph',
    name: 'threadTurningCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc5)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        ThreadTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableDrillingCuttingSpeed,
    listTemplate:
      '/Templates/IndexableDrilling/Grade/CuttingSpeed/IndexableDrillingGraph',
    name: 'indexableDrillingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc5)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        IndexableDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.TappingCuttingSpeed,
    listTemplate: '/Templates/Tapping/Grade/CuttingSpeed/TappingGraph',
    name: 'tappingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc6)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        TappingGradeHierarchyNodeTypeEnum.InternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidDrillingCuttingSpeed,
    listTemplate:
      '/Templates/SolidDrilling/Grade/CuttingSpeed/SolidDrillingGraph',
    name: 'solidDrillingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc6)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingCuttingSpeed,
    listTemplate:
      '/Templates/SolidMilling/Grade/CuttingSpeed/SolidMillingGraph',
    name: 'solidMillingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc6)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        SolidMillingGradeHierarchyNodeTypeEnum.InternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ReamingCuttingSpeed,
    listTemplate: '/Templates/Reaming/Grade/CuttingSpeed/ReamingGraph',
    name: 'reamingCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc6)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        ReamingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.BoringCuttingSpeed,
    listTemplate: '/Templates/Boring/Grade/CuttingSpeed/BoringGraph',
    name: 'boringCuttingSpeedPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc5)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        BoringGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingStartValues,
    listTemplate: '/Templates/IndexableMilling/ProductDataStartValuesList',
    name: 'indexableMillingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.GeneralTurningStartValues,
    listTemplate: '/Templates/GeneralTurning/ProductDataStartValuesList',
    name: 'generalTurningStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.PartingGroovingStartValues,
    listTemplate: '/Templates/PartingGrooving/ProductDataStartValuesList',
    name: 'partingGroovingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.ThreadTurningStartValues,
    listTemplate: '/Templates/ThreadTurning/ProductDataStartValuesList',
    name: 'threadTurningStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.IndexableDrillingStartValues,
    listTemplate: '/Templates/IndexableDrilling/ProductDataStartValuesList',
    name: 'indexableDrillingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.TappingStartValues,
    listTemplate: '/Templates/Tapping/ProductDataStartValuesList',
    name: 'tappingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.SolidDrillingStartValues,
    listTemplate: '/Templates/SolidDrilling/ProductDataStartValuesList',
    name: 'solidDrillingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.SolidMillingStartValues,
    listTemplate: '/Templates/SolidMilling/ProductDataStartValuesList',
    name: 'solidMillingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.ReamingStartValues,
    listTemplate: '/Templates/Reaming/ProductDataStartValuesList',
    name: 'reamingStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.BoringStartValues,
    listTemplate: '/Templates/Boring/ProductDataStartValuesList',
    name: 'boringStartValuesPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.IndexableMillingReleaseProduct,
    listTemplate: '/Templates/IndexableMilling/ProductDataReleaseProductList',
    name: 'indexableMillingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.GeneralTurningReleaseProduct,
    listTemplate: '/Templates/GeneralTurning/ProductDataReleaseProductList',
    name: 'generalTurningReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.PartingGroovingReleaseProduct,
    listTemplate: '/Templates/PartingGrooving/ProductDataReleaseProductList',
    name: 'partingGroovingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.ThreadTurningReleaseProduct,
    listTemplate: '/Templates/ThreadTurning/ProductDataReleaseProductList',
    name: 'threadTurningReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.IndexableDrillingReleaseProduct,
    listTemplate: '/Templates/IndexableDrilling/ProductDataReleaseProductList',
    name: 'indexableDrillingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.TappingReleaseProduct,
    listTemplate: '/Templates/Tapping/ProductDataReleaseProductList',
    name: 'tappingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.SolidDrillingReleaseProduct,
    listTemplate: '/Templates/SolidDrilling/ProductDataReleaseProductList',
    name: 'solidDrillingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.SolidMillingReleaseProduct,
    listTemplate: '/Templates/SolidMilling/ProductDataReleaseProductList',
    name: 'solidMillingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.ReamingReleaseProduct,
    listTemplate: '/Templates/Reaming/ProductDataReleaseProductList',
    name: 'reamingReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.BoringReleaseProduct,
    listTemplate: '/Templates/Boring/ProductDataReleaseProductList',
    name: 'boringReleaseProductPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.Cd2cValidation,
    listTemplate:
      '/Templates/CapacityData/ProductData/ProductDataCd2cValidationList',
    name: 'cd2cValidationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: null,
  },
  {
    type: CapacityDataPageEnum.AssignProduct,
    listTemplate: '/Templates/ProductAssignmentList',
    name: 'assignProductPage',
    tmcLevel: null,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        null,
        ProductAssignmentHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.FirstChoice,
    listTemplate: '/Templates/CapacityData/FirstChoiceList',
    name: 'firstChoicePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    isMultiselectDisabledOnAllLevels: true,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(null, FirstChoiceHierarchyNodeTypeEnum.Ctpt),
    ],
  },
  {
    type: CapacityDataPageEnum.FirstChoiceManagement,
    listTemplate: '/Templates/CapacityData/FirstChoiceManagementList',
    name: 'firstChoiceManagementPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(null, FirstChoiceHierarchyNodeTypeEnum.Ctpt),
    ],
  },
  {
    type: CapacityDataPageEnum.CuttingSpeedCorrection,
    listTemplate: '/Templates/CapacityData/CuttingSpeedCorrectionList',
    name: 'cuttingSpeedCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.TappingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ReamingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableMillingGeometry,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.IndexableMillingBody, isAllowed: false },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      { type: ProductHierarchyTypeEnum.TappingGeometry, isAllowed: false },
      { type: ProductHierarchyTypeEnum.ReamingGeometry, isAllowed: false },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        SolidDrillingBodyHierarchyNodeTypeEnum.InternalCooling
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.CuttingDiameter
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGeometry,
        TappingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ToolLifeCorrection,
    listTemplate: '/Templates/CapacityData/ToolLifeCorrectionList',
    name: 'toolLifeCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ThreadTurningGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.TappingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.PartingGroovingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ReamingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.GeneralTurningBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.PartingGroovingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ThreadTurningBody
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableMillingGeometry,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ThreadTurningGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc5,
      },
      { type: ProductHierarchyTypeEnum.TappingGeometry, isAllowed: false },
      {
        type: ProductHierarchyTypeEnum.PartingGroovingGeometry,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.ReamingGeometry, isAllowed: false },
      {
        type: ProductHierarchyTypeEnum.GeneralTurningBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.PartingGroovingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ThreadTurningBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGeometry,
        TappingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGeometry,
        ThreadTurningGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        SolidDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningBody,
        GeneralTurningBodyHierarchyNodeTypeEnum.ConnectionSizeCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingBody,
        PartingGroovingBodyHierarchyNodeTypeEnum.CuttingDepthMaximum
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningBody,
        ThreadTurningBodyHierarchyNodeTypeEnum.ConnectionSizeCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.StabilityCorrection,
    listTemplate: '/Templates/CapacityData/StabilityCorrectionList',
    name: 'stabilityCorrectionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.TappingGeometry,
        TappingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.EngagementCorrection,
    listTemplate: '/Templates/CapacityData/EngagementCorrectionList',
    name: 'engagementCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.WorkingEngagementCorrection,
    listTemplate: '/Templates/CapacityData/WorkingEngagementCorrectionList',
    name: 'workingEngagementCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.RampingCorrection,
    listTemplate: '/Templates/CapacityData/RampingCorrectionList',
    name: 'rampingCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ChipSpaceCorrection,
    listTemplate: '/Templates/CapacityData/ChipSpaceCorrectionList',
    name: 'chipSpaceCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ToolLifeExponent,
    listTemplate: '/Templates/CapacityData/ToolLifeExponentList',
    name: 'toolLifeExponentPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.StressCorrection,
    listTemplate: '/Templates/CapacityData/StressCorrectionList',
    name: 'stressCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.ChipThicknessCorrection,
    listTemplate: '/Templates/CapacityData/ChipThicknessCorrectionList',
    name: 'chipThicknessCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.MaximumStress,
    listTemplate: '/Templates/CapacityData/MaximumStressList',
    name: 'maximumStressPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.SolidMillingGrade
      ),
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SurfaceRoughness,
    listTemplate: '/Templates/CapacityData/SurfaceRoughnessList',
    name: 'surfaceRoughnessPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.IndexableMillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.SolidMillingGeometry
      ),
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.ToolStyleCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.CoolantToolLifeCorrection,
    listTemplate: '/Templates/CapacityData/CoolantToolLifeCorrectionList',
    name: 'coolantToolLifeCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidMillingGrade
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingGrade
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ReamingGrade
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidMillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
      {
        type: ProductHierarchyTypeEnum.ReamingGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGrade,
        SolidMillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGrade,
        ReamingGradeHierarchyNodeTypeEnum.CTMGroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.InsertIndexCount,
    listTemplate: '/Templates/CapacityData/InsertIndexCountList',
    name: 'insertIndexCountPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.IndexableMillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.IndexableDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.SolidDrillingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.GeneralTurningBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.PartingGroovingBody
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc0,
        ProductHierarchyTypeEnum.ThreadTurningBody
      ),
      new PageTmcLevel(TmcLevelEnum.Tmc0, ProductHierarchyTypeEnum.BoringBody),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningBody,
        GeneralTurningBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingBody,
        PartingGroovingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningBody,
        ThreadTurningBodyHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringBody,
        BoringBodyHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.MaximumOfMaxEngagement,
    listTemplate: '/Templates/CapacityData/MaximumOfMaxEngagementList',
    name: 'maximumOfMaxEngagementPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingBody
      ),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.FeedForceCorrection,
    listTemplate: '/Templates/CapacityData/FeedForceCorrectionList',
    name: 'feedForceCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableDrillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ReamingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: false,
      },
      { type: ProductHierarchyTypeEnum.ReamingGeometry, isAllowed: false },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.CuttingProfileDesignCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.AdvancedOperation,
    listTemplate: '/Templates/CapacityData/AdvancedOperationList',
    name: 'advancedOperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.CuttingProfileDesignCode
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingWorkingEngagementCorrection,
    listTemplate: '/Templates/IndexableMilling/WorkingEngagementCorrectionList',
    name: 'indexableMillingWorkingEngagementCorrectionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.NonRotatingDrilling,
    listTemplate: '/Templates/CapacityData/NonRotatingDrillingList',
    name: 'nonRotatingDrillingPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableDrillingGeometry
      ),
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        isAllowed: false,
      },
      {
        type: ProductHierarchyTypeEnum.SolidDrillingGeometry,
        isAllowed: false,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.MaxChipThicknessCorrection,
    listTemplate: '/Templates/CapacityData/MaxChipThicknessCorrectionList',
    name: 'maxChipThicknessCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingBody
      ),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.AermxCorrection,
    listTemplate: '/Templates/CapacityData/AermxCorrectionList',
    name: 'aermxCorrectionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingBody,
        IndexableMillingBodyHierarchyNodeTypeEnum.Diameter
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.OperationTypeMedium,
    listTemplate: '/Templates/CapacityData/OperationTypeList',
    name: 'operationTypePageMedium',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.OperationTypeFinishing,
    listTemplate: '/Templates/CapacityData/OperationTypeList',
    name: 'operationTypePageFinishing',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.PartingGroovingGeometry,
        PartingGroovingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.BoringGeometry,
        BoringGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.OperationTypeLowFeed,
    listTemplate: '/Templates/CapacityData/OperationTypeList',
    name: 'operationTypePageLowFeed',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.RegrindingParameters,
    listTemplate: '/Templates/CapacityData/RegrindingParametersList',
    name: 'regrindingParametersPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.RgfRegrindingParameters,
    listTemplate: '/Templates/CapacityData/RgfRegrindingParametersList',
    name: 'rgfRegrindingParametersPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ReamingGeometry,
        ReamingGeometryHierarchyNodeTypeEnum.ToolStyleCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.RecommendedInfeedMethod,
    listTemplate: '/Templates/CapacityData/RecommendedInfeedMethodList',
    name: 'recommendedInfeedMethodPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ThreadTurningGeometry
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.ThreadTurningGeometry,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc5,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGeometry,
        ThreadTurningGeometryHierarchyNodeTypeEnum.Profile
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.OptiThreadRank,
    listTemplate: '/Templates/ThreadTurning/Geometry/OptiThreadRank/List',
    name: 'optiThreadRankPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.ThreadTurningGeometry
      ),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.ThreadTurningGeometry,
        ThreadTurningGeometryHierarchyNodeTypeEnum.Profile
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.OperationAreaGraph,
    listTemplate: '/Templates/CapacityData/OperationArea/Graph',
    name: 'operationAreaPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.GeneralTurningProductData,
        isAllowed: true,
      },
    ],
    initialContentType: DetailContentType.Graph,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningProductData,
        GeneralTurningProductDataHierarchyNodeTypeEnum.ChipbreakDesign
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.EntryExitStrategy,
    listTemplate: '/Templates/CapacityData/EntryExitStrategyList',
    name: 'entryExitStrategyPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingBody,
        IndexableDrillingBodyHierarchyNodeTypeEnum.Uldr
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.Kapr,
    listTemplate: '/Templates/CapacityData/KaprList',
    name: 'kaprPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.Kapr2Ap,
    listTemplate: '/Templates/CapacityData/Kapr2ApList',
    name: 'kapr2ApPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.Kapr3Ap,
    listTemplate: '/Templates/CapacityData/Kapr3ApList',
    name: 'kapr3ApPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.Kapr4Ap,
    listTemplate: '/Templates/CapacityData/Kapr4ApList',
    name: 'kapr4ApPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGeometry,
        GeneralTurningGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidDrillingFeedLabelFactor,
    listTemplate: '/Templates/SolidDrilling/Geometry/FeedLabelFactorList',
    name: 'solidDrillingFeedLabelFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGeometry,
        SolidDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidDrillingGradeSpeedFactor,
    listTemplate: '/Templates/SolidDrilling/Grade/SpeedFactorList',
    name: 'solidDrillingGradeSpeedFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingGrade,
        SolidDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableDrillingFeedLabelFactor,
    listTemplate: '/Templates/IndexableDrilling/Geometry/FeedLabelFactorList',
    name: 'indexableDrillingFeedLabelFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGeometry,
        IndexableDrillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableDrillingSpeedLabelFactor,
    listTemplate: '/Templates/IndexableDrilling/Grade/SpeedFactorList',
    name: 'indexableDrillingGradeSpeedFactorPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableDrillingGrade,
        IndexableDrillingGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.StepOverRatio,
    listTemplate: '/Templates/SolidMilling/Geometry/StepOverRatioList',
    name: 'solidMillingStepOverRatioPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingToolLifeCorrection,
    listTemplate: '/Templates/SolidMilling/Geometry/ToolLifeCorrectionList',
    name: 'solidMillingToolLifeCorrectionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingCuttingSpeedCorrection,
    listTemplate: '/Templates/SolidMilling/Geometry/CuttingSpeedCorrectionList',
    name: 'solidMillingCuttingSpeedCorrectionPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingGeometry,
        SolidMillingGeometryHierarchyNodeTypeEnum.Subgroup
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.SolidMillingDiameterSuboperations,
    listTemplate: '/Templates/SolidMilling/Diameter/SuboperationsList',
    name: 'solidMillingDiameterSuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidMillingDiameter,
        SolidMillingDiameterHierarchyNodeTypeEnum.DiameterRange
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.PeckingPatternStrategy,
    listTemplate: '/Templates/SolidDrilling/Body/PeckingPatternStrategyList',
    name: 'peckingPatternStrategyPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.SolidDrillingBody
      ),
    ],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.SolidDrillingBody,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.SolidDrillingBody,
        SolidDrillingBodyHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.EnteringAngle,
    listTemplate: '/Templates/CapacityData/EnteringAngleList',
    name: 'enteringAnglePage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: [
      {
        type: ProductHierarchyTypeEnum.GeneralTurningGrade,
        isAllowed: true,
        maxAllowedTmcLevel: TmcLevelEnum.Tmc6,
      },
    ],
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.GeneralTurningGrade,
        GeneralTurningGradeHierarchyNodeTypeEnum.ExternalGrade
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingGeometrySuboperations,
    listTemplate: '/Templates/IndexableMilling/Geometry/SuboperationsList',
    name: 'indexableMillingSuboperationPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc0)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ChipbreakDesign
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingGeometryToolLifeCorrection,
    listTemplate: '/Templates/IndexableMilling/Geometry/ToolLifeCorrectionList',
    name: 'indexableMillingToolLifeCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingGeometryCuttingSpeedCorrectionPage,
    listTemplate:
      '/Templates/IndexableMilling/Geometry/CuttingSpeedCorrectionList',
    name: 'indexableMillingCuttingSpeedCorrectionPage',
    tmcLevel: [
      new PageTmcLevel(
        TmcLevelEnum.Tmc1,
        ProductHierarchyTypeEnum.IndexableMillingGeometry
      ),
    ],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.ProductFamily
      ),
    ],
  },
  {
    type: CapacityDataPageEnum.IndexableMillingGeometryFeedAxial,
    listTemplate: '/Templates/IndexableMilling/Geometry/FeedList',
    name: 'indexableMillingFeedAxialPage',
    tmcLevel: [new PageTmcLevel(TmcLevelEnum.Tmc1)],
    isTmcLevelChangeAllowed: false,
    initialContentType: DetailContentType.List,
    defaultHierarchyLevel: [
      new PageHierarchyLevel(
        ProductHierarchyTypeEnum.IndexableMillingGeometry,
        IndexableMillingGeometryHierarchyNodeTypeEnum.RecCode
      ),
    ],
  },
];
