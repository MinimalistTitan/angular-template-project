export enum IndexableMillingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    Size = 1,
    ChipbreakDesign = 2,
    Tolerance = 3,
    RecCode = 4
}

export enum IndexableMillingGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum IndexableMillingBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    Hand = 1,
    Diameter = 2,
    Size = 3,
    RecCode = 4
}

export enum FirstChoiceHierarchyNodeTypeEnum {
    All = 0,
    Ctpt = 1
}

export enum ProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    Size = 1,
    ChipbreakDesign = 2,
    RecCode = 3,
    OrdCode = 4
}

export enum GeneralTurningGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    InsertShapeCode = 2,
    Size = 3,
    CornerRadius = 4,
    RecCode = 5
}

export enum GeneralTurningGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum GeneralTurningBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    MountingDirection = 1,
    FeedDirection = 2,
    EnteringAngle = 3,
    InsertShapeCode = 4,
    ConnectionSizeCode = 5,
    RecCode = 6
}

export enum GeneralTurningProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    InsertShapeCode = 2,
    Size = 3,
    CornerRadius = 4,
    RecCode = 5,
    OrdCode = 6
}

export enum PartingGroovingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    FrontAngle = 2,
    Size = 3,
    CornerRadius = 4,
    RecCode = 5
}

export enum PartingGroovingGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum PartingGroovingBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    MountingDirection = 1,
    FeedDirection = 2,
    CuttingItemInterface = 3,
    CuttingDepthMaximum = 4,
    ConnectionSizeCode = 5,
    RecCode = 6
}

export enum PartingGroovingProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    FrontAngle = 2,
    Size = 3,
    CornerRadius = 4,
    RecCode = 5,
    OrdCode = 6
}

export enum ThreadTurningGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    NumberOfTeeth = 1,
    ChipbreakDesign = 2,
    Size = 3,
    Profile = 4,
    Pitch = 5,
    RecCode = 6
}

export enum ThreadTurningGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum ThreadTurningBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    MountingDirection = 1,
    InsertSize = 2,
    ConnectionSizeCode = 3,
    RecCode = 4
}

export enum ThreadTurningProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    NumberOfTeeth = 1,
    ChipbreakDesign = 2,
    Size = 3,
    Profile = 4,
    Pitch = 5,
    RecCode = 6,
    OrdCode = 7
}

export enum IndexableDrillingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    InsertUsageCode = 1,
    ChipbreakDesign = 2,
    Size = 3,
    RecCode = 4
}

export enum IndexableDrillingGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum IndexableDrillingProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    InsertUsageCode = 1,
    ChipbreakDesign = 2,
    Size = 3,
    RecCode = 4,
    OrdCode = 5
}

export enum IndexableDrillingBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    Uldr = 1,
    RecCode = 2
}

export enum TappingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    ThreadFormType = 2,
    ThreadDiameterSize = 3,
    RecCode = 4
}

export enum TappingGradeHierarchyNodeTypeEnum {
    Suboperation = 0,
    CtmGroup = 1,
    Coating = 2,
    ExternalGrade = 3,
    InternalGrade = 4
}

export enum TappingProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    ThreadFormType = 2,
    ThreadDiameterSize = 3,
    RecCode = 4,
    OrdCode = 5
}

export enum SolidDrillingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    CuttingProfileDesignCode = 1,
    ToolStyleCode = 2,
    CuttingDiameter = 3,
    UsableLengthDiameter = 4,
    RecCode = 5
}

export enum SolidDrillingGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum SolidDrillingProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    InsertUsageCode = 1,
    ChipbreakDesign = 2,
    Size = 3,
    RecCode = 4,
    OrdCode = 5
}

export enum SolidDrillingBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    InternalCooling = 1,
    Uldr = 2,
    RecCode = 3
}

export enum SolidMillingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    Subgroup = 1,
    ToolStyleCode = 2,
    RecCode = 3
}

export enum SolidMillingGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum SolidMillingDiameterHierarchyNodeTypeEnum {
    DiameterRange = 0,
    ProductFamily = 1
}

export enum SolidMillingProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    Subgroup = 1,
    ToolStyleCode = 2,
    RecCode = 3,
    OrdCode = 4
}

export enum ReamingGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ToolStyleCode = 1,
    CuttingDiameter = 2,
    RecCode = 3
}

export enum ReamingGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum ReamingProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ToolStyleCode = 1,
    CuttingDiameter = 2,
    RecCode = 3,
    OrdCode = 4
}

export enum BoringGeometryHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    InsertShapeCode = 2,
    Size = 3,
    CornerRadius = 4,
    RecCode = 5
}

export enum BoringGradeHierarchyNodeTypeEnum {
    CTMGroup = 0,
    Coating = 1,
    ExternalGrade = 2,
    InternalGrade = 3
}

export enum BoringBodyHierarchyNodeTypeEnum {
    ProductFamily = 0,
    RecCode = 2
}

export enum BoringProductDataHierarchyNodeTypeEnum {
    ProductFamily = 0,
    ChipbreakDesign = 1,
    InsertShapeCode = 2,
    Size = 3,
    CornerRadius = 4,
    RecCode = 5,
    OrdCode = 6
}

export enum ProductAssignmentHierarchyNodeTypeEnum {
    ItemType = 0,
    Tpc = 1,
    ProductFamily = 2,
    RecCode = 3,
    OrdCode = 4,
    InternalGrade = 5
}