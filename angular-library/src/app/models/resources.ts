export const RESOURCES: { [key: string]: string } = {
    EditingDisabledTooltip: 'This material has Ranking set to `No cutting data`, therefore editing has been disabled.',
    EditingDisabledTooltip_Rank: 'This material has Ranking set to `No cutting data`, therefore editing has been disabled.',
    EditingDisabledTooltip_SuboperationDepthOfCutRules: 'Suboperation Ranking value do not require this capacity data, therefore editing has been disabled',
    EditingDisabledTooltip_SuboperationFlankFeedRules: 'Suboperation Ranking value do not require this capacity data, therefore editing has been disabled',
    EditingDisabledTooltip_SuboperationPrimaryFeedRules: 'Suboperation Ranking value do not require this capacity data, therefore editing has been disabled',
    EditingDisabledTooltip_RoundInsertProduct: 'Insert shape code is `R` (Round insert), therefore editing has been disabled',
    EditingDisabledTooltip_SurfaceRoughnessesMdmProductValidation: 'MDM product TPC attribute in MILG_SLD_COR, MILTH_SLDMC_COR, MILTHV_SLD_COR, MILTH_SLDOC_COR, MILTH_SLDAC_COR, MILTH_SLD_COR therefore editing has been disabled',
    EditingDisabledTooltip_SolidMillingWorkingEngagementCorrectionMdmProductValidation: 'MDM product TPC attribute is MILG_SLD_COR, therefore editing has been disabled',
    EditingDisabledTooltip_MaximumOfEngagementMdmProductValidation: 'MDM product TPC attribute not in MILBN_IND_COR, MILF_IND_COR, MILSQ_IND_COR, MILTH_IND_COR, therefore editing has been disabled',
    EditingDisabledTooltip_IndexableMillingWorkingEngagementCorrectionMdmProductValidation: 'MDM product TPC attribute not in MILBN_IND_COR, MILF_IND_COR, MILSF_IND_COR, MILSF_INDADJ_COR, MILSQ_IND_COR, MILTH_IND_COR, therefore editing has been disabled',
    EditingDisabledTooltip_SolidDrillingInsertIndexCountMdmProductValidation: 'MDM product TPC attribute is not DRLFSY_IND_COR, therefore editing has been disabled',
    EditingDisabledTooltip_AermxCorrectionMdmProductValidation: 'MDM product TPC attribute is not in MILBN_IND_COR, MILF_IND_COR, MILSF_IND_COR, MILSF_INDADJ_COR, MILSQ_IND_COR, MILTH_IND_COR, therefore editing has been disabled',
    EditingDisabledTooltip_RgfNormgxMdmProductValidation: 'MDM product NORMGX is not set or is 0, therefore editing has been disabled',
    EditingDisabledTooltip_SuboperationRankingValidation: 'Suboperation Ranking value do not require this capacity data, therefore editing has been disabled',
    EditingDisabledTooltip_MDMProductSubopValidation: 'MDM product SUBOP attributes  contains "TH" and "MILLPLG"',
    EditingDisabledTooltip_SuboperationFeedAxialRules: 'Suboperation Ranking value do not require this capacity data, therefore editing has been disabled',
    EditingDisabledTooltip_LabelTypeDrilXxdNotSelected: 'MDM product DrilXxd not selected, therefore editing has been disabled.',
    EditingDisabledTooltip_KaprTypeNotSelected: 'MDM product KaprType is not selected',

    ValidationInputNotValid: 'Capacity data is missing, incorrect or defined on lower hierarchy level',
    ProductFamily: 'Product Family',
    Size: 'Size',
    ChipbreakDesign: 'Chipbreak Design',
    Tolerance: 'Tolerance',
    RecCode: 'RecCode',
    CTMGroup: 'CTM Group',
    Coating: 'Coating',
    ExternalGrade: 'External Grade',
    InternalGrade: 'Internal Grade',
    Hand: 'Hand',
    DC: 'DC',
    SSC: 'SSC',
    OrdCode: 'Order Code',
    ReleasePack: 'Release Pack',
    ProjectCode: 'Project Code',
    Lcs: 'LCS',
    MaterialId: 'Material ID',
    ItemType: 'Item Type',
    Tpc: 'TPC',
    InsertShapeCode: 'Insert Shape Code',
    CornerRadius: 'Corner Radius',
    FrontAngle: 'Front Angle',
    NumberOfTeeth: 'Number of Teeth',
    Profile: 'Profile',
    Pitch: 'Pitch',
    All: 'All',
    Ctpt: 'Operation Type',
    InsertUsageCode: 'Insert Usage Code',
    Uldr: 'Length-diameter ratio group',
    ThreadFormType: 'Thread Form Type',
    ThreadDiameterSize: 'Thread Diameter Size',
    Suboperation: 'Suboperation',
    CuttingProfileDesignCode: 'Design Code',
    ToolStyleCode: 'Tool Style Code',
    CuttingDiameter: 'Cutting Diameter',
    UsableLengthDiameter: 'ULDR/Size',
    InternalCooling: 'Internal Cooling',
    Subgroup: 'Subgroup',
    DiameterRange: 'Diameter Range',
    MountingDirection: 'Mounting Direction',
    FeedDirection: 'Feed Direction',
    EnteringAngle: 'Entering Angle',
    ConnectionSizeCode: 'Connection Size Code',
    InsertSize: 'Insert Size',
    CuttingDepthMaximum: 'Cutting Depth Maximum',
    CuttingItemInterface: 'Cutting Item Interface',
    SuboperationTrnbfBwIntDesc: 'Turning Internal Backboring Outfacing',
    SuboperationTrnbfFwIntDesc: 'Turning Internal Backboring Facing',
    SuboperationTrnblIntDesc: 'Turning Internal Backboring',
    SuboperationTrnf_bw_extDesc: 'Turning External Outfacing',
    SuboperationTrnf_bw_intDesc: 'Turning Internal Outfacing',
    SuboperationTrnf_fw_extDesc: 'Turning External Facing',
    SuboperationTrnf_fw_intDesc: 'Turning Internal Facing',
    SuboperationTrnl_extDesc: 'Turning External Longitudinal',
    SuboperationTrnl_intDesc: 'Turning Internal Longitudinal',
    SuboperationTrnlp_extDesc: 'Turning External Incopying',
    SuboperationTrnlp_intDesc: 'Turning Internal Incopying',
    SuboperationGroov_axDesc: 'Grooving Axial',
    SuboperationGroov_extDesc: 'Grooving External',
    SuboperationGroov_intDesc: 'Grooving Internal',
    SuboperationPartDesc: 'Parting Off',
    KaprTypeEnum_None: "None",
    KaprTypeEnum_DrillXxD: "DrillXxd",
    KaprTypeEnum_Kapr2: "Kapr 2",
    KaprTypeEnum_Turning: "Turning",
    KaprTypeEnum_Kapr3: "Kapr 3",
    KaprTypeEnum_Kapr4: "Kapr 4",
    KaprTypeEnum_Drill10xD: "Drill10xD",
    KaprTypeEnum_Drill12xD: "Drill12xD",
    KaprTypeEnum_Drill3xD: "Drill3xD",
    KaprTypeEnum_Drill5xD: "Drill5xD",
    KaprTypeEnum_Drill8xD: "Drill8xD",
};