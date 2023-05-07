export enum ProductHierarchyTypeEnum {
    IndexableMillingGeometry = 0,
    IndexableMillingGrade = 1,
    IndexableMillingBody = 2,
    IndexableMillingProductData = 3,
    ProductAssignment = 4,
    IndexableMillingReport = 5,
    GeneralTurningGeometry = 10,
    GeneralTurningGrade = 11,
    GeneralTurningProductData = 12,
    GeneralTurningReport = 13,
    PartingGroovingGeometry = 20,
    PartingGroovingGrade = 21,
    PartingGroovingProductData = 22,
    PartingGroovingReport = 23,
    ThreadTurningGeometry = 25,
    ThreadTurningGrade = 26,
    ThreadTurningProductData = 27,
    ThreadTurningReport = 28,
    ProductAdministrationReport = 30,
    IndexableMillingFirstChoice = 31,
    GeneralTurningFirstChoice = 32,
    PartingGroovingFirstChoice = 33,
    ThreadTurningFirstChoice = 34,
    IndexableDrillingGeometry = 40,
    IndexableDrillingGrade = 41,
    IndexableDrillingBody = 42,
    IndexableDrillingProductData = 43,
    IndexableDrillingReport = 44,
    IndexableDrillingFirstChoice = 45,
    TappingGeometry = 50,
    TappingGrade = 51,
    TappingProductData = 52,
    TappingReport = 53,
    SolidDrillingGeometry = 54,
    SolidDrillingGrade = 55,
    SolidDrillingBody = 56,
    SolidDrillingProductData = 57,
    SolidDrillingReport = 58,
    SolidMillingGeometry = 59,
    SolidMillingGrade = 60,
    SolidMillingProductData = 61,
    SolidMillingReport = 62,
    SolidMillingDiameter = 63,
    ReamingGeometry = 64,
    ReamingGrade = 65,
    ReamingProductData = 66,
    ReamingReport = 67,
    GeneralTurningBody = 68,
    PartingGroovingBody = 69,
    ThreadTurningBody = 70,
    BoringGeometry = 71,
    BoringGrade = 72,
    BoringBody = 73,
    BoringProductData = 74,
    BoringReport = 75,
    BoringFirstChoice = 76,
    // Note: when adding new item, do not forget to add it to SMS_CDM\CDM.Client.Models\Product\HierarchyTypeModel.cs as well
  }