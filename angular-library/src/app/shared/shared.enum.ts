export enum CdmModule {
  IndexableMilling = 'milling',
  SolidMilling = 'solid-milling',
  Tapping = 'tapping',
  GeneralTurning = 'general-turning',
  PartingGrooving = 'parting-grooving',
  ThreadTurning = 'thread-turning',
  Reaming = 'reaming',
  IndexableDrilling = 'indexable-drilling',
  Boring = 'boring',
  SolidDrilling = 'solid-drilling',
  ProductAdministration = 'product-administration',
}

export enum CdmSubModule {
  Geometry = 'geometry',
  Grade = 'grade',
  Body = 'body',
  ProductData = 'product-data',
  FirstChoice = 'first-choice',
  Report = 'report',
  ProfileCalculation = 'profile-calculation',
  CVCDefault = 'cvc-tmc-default',
  TsycToSubGroup = 'tsyc-to-subprodfam',
  Diameter = 'diameter',
  FirstChoiceCbmdAssignment = 'cbmd-first-choice',
  ThreadTypeMaterialTmc5 = 'thread-type-material-tmc5',
  ThreadDepth = 'thread-depth',
  FeedProfileFromSize = 'size-profile-calculation',
  PeckingCycle = 'pecking-cycle',
  MaterialProfileFromSize = 'material-profile-calculation',
  ProductAssignment = 'product-assignment',
  TargetToolGuideVersion = 'target-tool-guide-version',
  MdmProductFilter = 'mdm-product-filter',
  IntgradeImportCtms = 'intgrade-import-ctms',
  IntgradeImportCoating = 'intgrade-import-coatings',
  Maintenance = 'maintenance',
  MassDeleteProducts = 'mass-delete-products',
  ToolguideExportSchedule = 'export-schedule',
}

export enum CdmSubComponent {
  TreeView = 'tree-view',
  HierarchyGrid = 'hierarchy-grid',
  VerticalAccordion = 'vertical-accordion',
  Slider = 'slider',
}
