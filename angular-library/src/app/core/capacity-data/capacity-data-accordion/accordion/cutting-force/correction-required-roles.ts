import { ProductHierarchyTypeEnum } from "src/app/models/enums";

export const SAVE_REQUIRED_ROLES: { hierarchyType: ProductHierarchyTypeEnum, roles: string[] }[] | string[] = [
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingGeometry, roles: ['geometry-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.GeneralTurningGeometry, roles: ['geometry-general-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.PartingGroovingGeometry, roles: ['geometry-parting-and-grooving-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ThreadTurningGeometry, roles: ['geometry-thread-turning-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingGeometry, roles: ['geometry-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.TappingGeometry, roles: ['geometry-tapping-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingGeometry, roles: ['geometry-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ReamingGeometry, roles: ['geometry-reaming-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.BoringGeometry, roles: ['geometry-boring-write'] }
];