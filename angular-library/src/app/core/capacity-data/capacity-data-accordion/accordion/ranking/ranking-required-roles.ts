import { ProductHierarchyTypeEnum } from "src/app/models/enums";

export const SAVE_REQUIRED_ROLES: { hierarchyType: ProductHierarchyTypeEnum, roles: string[] }[] | string[] = [
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingGeometry, roles: ['geometry-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingGrade, roles: ['grade-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingBody, roles: ['body-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.GeneralTurningGeometry, roles: ['geometry-general-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.GeneralTurningGrade, roles: ['grade-general-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.PartingGroovingGeometry, roles: ['geometry-parting-and-grooving-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.PartingGroovingGrade, roles: ['grade-parting-and-grooving-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ThreadTurningGeometry, roles: ['geometry-thread-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ThreadTurningGrade, roles: ['grade-thread-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingGeometry, roles: ['geometry-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingGrade, roles: ['grade-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingBody, roles: ['body-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.TappingGeometry, roles: ['geometry-tapping-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.TappingGrade, roles: ['grade-tapping-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingGeometry, roles: ['geometry-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingGrade, roles: ['grade-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingBody, roles: ['body-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidMillingGeometry, roles: ['geometry-solid-milling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidMillingGrade, roles: ['grade-solid-milling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingGeometry, roles: ['geometry-reaming-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ReamingGrade, roles: ['grade-reaming-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ReamingGeometry, roles: ['geometry-reaming-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.BoringGrade, roles: ['grade-boring-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.BoringGeometry, roles: ['geometry-boring-write'] }
];