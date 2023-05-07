import { ProductHierarchyTypeEnum } from "src/app/models/enums";

export const SAVE_REQUIRED_ROLES: { hierarchyType: ProductHierarchyTypeEnum, roles: string[] }[] | string[] = [
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingGeometry, roles: ['geometry-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.TappingGeometry, roles: ['geometry-tapping-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ThreadTurningGeometry, roles: ['geometry-thread-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingGeometry, roles: ['geometry-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingBody, roles: ['body-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingGeometry, roles: ['geometry-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingBody, roles: ['body-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidMillingGeometry, roles: ['geometry-solid-milling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.PartingGroovingGeometry, roles: ['geometry-parting-and-grooving-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ReamingGeometry, roles: ['geometry-reaming-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.GeneralTurningBody, roles: ['body-general-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.PartingGroovingBody, roles: ['body-parting-and-grooving-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ThreadTurningBody, roles: ['body-thread-turning-write'] }
];