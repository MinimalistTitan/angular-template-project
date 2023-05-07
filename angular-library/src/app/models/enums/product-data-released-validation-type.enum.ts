
export enum ProductDataReleasedProductValidationTypeEnum {
    Geometry = 0,
    Grade = 1,
    Hex = 2,
    Label = 3,
    ProductData = 4,
    DepthOfCut = 5
}

export enum ToolGuideValidationTypeEnum {
    Geometry = 0,
    Grade = 1,
    CommonMaterialLabel = 2,
    Hex = 3,
    WorkingCondition = 4,
    Suboperations = 5,
    DepthOfCut = 6,
    Body = 7
}

export const ValidationLabelList = [
    { type: ProductDataReleasedProductValidationTypeEnum.Geometry, label: 'Geometry' },
    { type: ProductDataReleasedProductValidationTypeEnum.Grade, label: 'Grade' },
    { type: ProductDataReleasedProductValidationTypeEnum.Hex, label: 'Hex window Geo/Grade' },
    { type: ProductDataReleasedProductValidationTypeEnum.Label, label: 'Label' },
    { type: ProductDataReleasedProductValidationTypeEnum.ProductData, label: 'Product Data' },
    { type: ProductDataReleasedProductValidationTypeEnum.DepthOfCut, label: 'Depth Of Cut' }
];


