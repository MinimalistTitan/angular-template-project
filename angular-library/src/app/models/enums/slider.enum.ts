export enum RankingEnum {
    Basic = 1,
    Complementary = 2,
    NotPublished = 100,
    NoCuttingData = 200,
    NotDefined = 300
}

export enum FixEnum {
    Undefined = 0,
    ExcellentStability = 1,
    GoodStability = 2,
    LowStability = 4
}

export enum CutccEnum {
    Undefined = 0,
    ContinuousCut = 1,
    VaryingDepth = 2,
    Interruptions = 4
}

export enum WkpsccEnum {
    Undefined = 0,
    PreMachined = 1,
    LightSkin = 2,
    HeavySkin = 4
}

export enum AdvancedOperationEnum {
    Ok = 1,
    NotRecommended = 2,
    NotAllowed = 3
}

export enum CooltEnum {
    Dry = 0,
    Air = 1,
    Mql = 5,
    Em5 = 2,
    Em10 = 3,
    Oil = 4,
}

export enum EngagementTypeEnum {
    SlotMilling = 0,
    EndMilling = 1,
    FaceMilling = 2,
    Other = 100
}

export enum GraphCompareTypeEnum {
    Grades = 1,
    Materials = 2,
    DesignCodes = 3
}

export enum DetailContentType {
    None = 0,
    List = 1,
    Report = 2,
    Graph = 3
}

// export enum CooltRankingEnum {
//     Ok = 0,
//     NotRecommended = 1,
//     NotAllowed = 2
// }

export enum RangeEnum {
    Ok = 0,
    NotRecommended = 1,
    NotAllowed = 2
}

// export enum SuboperationEnum {
//     Ok = 0,
//     NotRecommended = 1,
//     NotAllowed = 2
// }

export enum RecommendedInfeedMethodEnum {
    RadialInfeed = 1,
    ModifiedFlankInfeed = 2,
    IncrementalInfeed = 3
}

export enum EntryExitStrategyEnum {
    Enabled = 1,
    Disabled = 2,
    NotDefined = 3
}

export enum StrategyEnum {
    Enabled = 1,
    Disabled = 2,
    NotDefined = 3
}

export enum Cd2cValidationCapacityDataEnum {
    Ranking = 1,
    WorkingCondition = 2,
    CorrectionFactor = 3,
    DepthOfCut = 4,
    ChipThickness = 5,
    Suboperation = 6,
    CuttingSpeed = 7,
    ToolLife = 8,
    CoolantRanking = 9,
    CuttingAngle = 10,
    RelativeEngagement = 11,
    Infeed = 12,
    FeedFactor = 13,
    PrimaryFeed = 14,
    FlankFeed = 15,
    CuttingSpeedCorrection = 16,
    ToolLifeCorrection = 17,
    StabilityCorrection = 18,
    CoolantCvc = 19,
    FeedNomFactor = 20,
    DrillingRatioLimit = 21,
    EngagementCorrection = 22,
    WorkingEngagementCorrection = 23,
    RampingCorrection = 24,
    ChipSpaceCorrection = 25,
    ToolLifeExponent = 26,
    StressCorrection = 27,
    ChipThicknessCorrection = 28,
    MaximumStress = 29,
    Feed = 30,
    DiameterFeed = 31,
    SurfaceRoughness = 32,
    CoolantToolLifeCorrection = 33,
    GeometryFeed = 34,
    GradeFeed = 35,
    CapacityDataOverlap = 36,
    InsertIndexCount = 37,
    FeedForceCorrection = 38,
    AdvancedOperations = 39,
    MaximumOfMaxEngagement = 40,
    IndexableMillingWorkingEngagementCorrection = 41,
    MaxChipThicknessCorrection = 42,
    StartValues = 43,
    FirstChoice = 44,
    ReleaseProduct = 45,
    NonRotatingDrilling = 46,
    AermxCorrection = 47,
    OperationType = 48,
    RegrindingParameters = 49,
    RgfRegrindingParameters = 50,
    GeneralTurningBodySuboperations = 51,
    PartingGroovingBodySuboperations = 52,
    ThreadTurningBodySuboperations = 53,
    RecommendedInfeedMethod = 54,
    GeneralTurningBodyFeedFactor = 55,
    PartingGroovingBodyFeedFactor = 56,
    EntryExitStrategy = 57,
    FirstChoiceManagement = 58,
    Kapr = 59,
    Kapr2Ap = 60,
    Kapr3Ap = 61,
    Kapr4Ap = 62,
    SolidDrillingFeedLabelFactor = 63,
    SolidDrillingSpeedLabelFactor = 64,
    IndexableDrillingFeedLabelFactor = 65,
    IndexableDrillingSpeedLabelFactor = 66,
    OptiThreadRank = 67,
    SolidMillingSuboperations = 68,
    StepOverRatio = 69,
    SolidMillingToolLifeCorrection = 70,
    SolidMillingCuttingSpeedCorrection = 71,
    SolidMillingDiameterSuboperations = 72,
    DiameterFeedAxial = 73,
    PeckingPatternStrategy = 74,
    EnteringAngle = 75,
    IndexableMillingSuboperations = 76,
    GeometryFeedAxial = 77,
    IndexableMillingCuttingSpeedCorrection = 78,
    IndexableMillingToolLifeCorrection = 79,
    // Note: when adding new item, do not forget to add it to Resources.resx as well (i.e. Cd2cValidationCapacityDataEnum_53...)
}

export enum Cd2cValidationMessageTypeEnum {
    NoCapacityData = 1,
    NoHexOverlap = 2,
    NoWorkingConditionsOverlap = 3,
    NoSuboperationOverlap = 4,
    NoDepthOfCutOverlap = 5
}

export enum CalculationValidationMessageEnum {
    Valid = 0,
    MissingGeometryCapacityData = 1,
    MissingGradeCapacityData = 2,
    FeedSpeedCalculationError = 4,
    MissingDiameterCapacityData = 8,
    EnteringAngleRulesDependencyValidation = 16
}

export enum ProfileCalculationHierarchyEnum {
    MillingHierarchy = 1,
    GeneralTurningHierarchy = 2,
    PartingGroovingHierarchy = 3,
    ThreadTurningHierarchy = 4,
    IndexableDrillingHierarchy = 5,
}

export enum CbmdPgEnum {
    Parting = 1,
    Grooving = 2
}

export enum NonRotatingDrillingEnum {
    NotAllowed = 1,
    Allowed = 2,
}

export enum CtptEnum {
    NotApplicable = 0,
    PreMachining = 1,
    Finishing = 2,
    PreMachiningAndFinishing = 3,
    HighFeedRoughingMachining = 4,
    Medium = 5,
    Roughing = 6,
    LowFeed = 7,
    MediumFeed = 8,
    HighFeed = 9,
    Light = 10,
    Heavy = 11,
    Optimized = 12,
    Other = 13
}

export enum ExportScheduleTypeEnum {
    All = 0,
    Partial = 1
}

export enum ExportScheduleLogItemStateEnum {
    Processed = 0,
    Failed = 1
}

export enum ExportScheduleLogItemDestinationEnum {
    FileSystem = 0,
    Azure = 1
}

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
}

export enum OptiThreadRankEnum {
    Ok = 1,
    NotRecommended = 3,
    NotAllowed = 4
}

export function isEnumResourceDefined(data: Array<any>, enumObject: any, enumResourcePrefix: string): any {
    var result = true;
    var message = '';

    var isDefined = (data: Array<any>, resourceName: string) => {
        var test = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i].$.name === resourceName) {
                test = true;
                break;
            }
        }
        return test;
    }

    for (let item in enumObject) {
        if (!enumObject.hasOwnProperty(item))
            continue;

        var isValueProperty = parseInt(item) >= 0;
        if (!isValueProperty) {
            continue;
        }

        var resourceName = enumResourcePrefix + item;
        var isResDefined = isDefined(data, resourceName);
        if (!isResDefined) {
            result = false;
            message += ', ' + resourceName;
        }
    }

    if (!result)
        message = message.substring(2);

    return {
        result,
        message
    }
}