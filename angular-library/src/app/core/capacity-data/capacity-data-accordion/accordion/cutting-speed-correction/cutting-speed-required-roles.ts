import { ProductHierarchyTypeEnum } from "src/app/models/enums/product-hierarchy-type.enum";

export const SAVE_REQUIRED_ROLES: { hierarchyType: ProductHierarchyTypeEnum, roles: string[] }[] | string[] = [
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingGeometry, roles: ['geometry-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableMillingBody, roles: ['body-milling-indexable-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.TappingGeometry, roles: ['geometry-tapping-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingBody, roles: ['body-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.SolidDrillingGeometry, roles: ['geometry-solid-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.IndexableDrillingBody, roles: ['body-indexable-drilling-write'] },
    { hierarchyType: ProductHierarchyTypeEnum.ReamingGeometry, roles: ['geometry-reaming-write'] }
];