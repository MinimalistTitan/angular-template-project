import { last } from 'lodash';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { IServerSerializable } from '../capacity/server-serializable.interface';
import { IProductNodePath } from '../products';
import {
  ProductDataCd2cValidationItemModel,
  toProductDataCd2cValidationItemModel,
} from '../products/release/product-data-cd2c-validation-item.model';
import {
  ICapacityData,
  ICapacityDataDetail,
  toCapacityDataDescriptor,
} from '../capacity';
import {
  CapacityDataPageEnum,
  TabsEnum,
  ToolGuideValidationTypeEnum,
} from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { enumToList, populateHierarchyColumns } from 'src/app/utilities';
import { MATERIAL_ARROW } from 'src/app/share/share.const';

export class ToolGuideValidationCapacityModel implements ICapacityData {
  modified: Date;
  geometryValidations: Array<ProductDataCd2cValidationItemModel>;
  gradeValidations: Array<ProductDataCd2cValidationItemModel>;
  isGeometryGradeMaterialOverlap: boolean;
  hexWindowValidations: Array<ProductDataCd2cValidationItemModel>;
  workingConditionsWindowValidations: Array<ProductDataCd2cValidationItemModel>;
  suboperationsWindowValidations: Array<ProductDataCd2cValidationItemModel>;
  depthOfCutWindowValidations: Array<ProductDataCd2cValidationItemModel>;
  bodyWindowValidations: Array<ProductDataCd2cValidationItemModel>;
  isCd2CCalculatingProduct: boolean;
  materialId: number;
  constructor(init?: Partial<ToolGuideValidationCapacityModel>) {
    Object.assign(this, init);
  }
}

export const listValidationLabel: string[] = [
  'Geometry',
  'Grade',
  'Common material for geometry/grade',
  'Hex Window for geometry/grade',
  'Working Conditions Window for geometry/grade',
  'Suboperations Window for geometry/grade',
  'Depth Of Cut Window for geometry/grade',
  'Body Window for geometry/grade',
]; //Don't change the order of elements of this array string.

export class ProductDataCd2cValidationModel extends ICapacityDataDetail<ToolGuideValidationCapacityModel> {
  toJson() {}

  get isDefined(): boolean {
    return true;
  }

  get isValid(): boolean {
    return true;
  }

  get isOptionalEmpty(): boolean {
    return true;
  }

  constructor(init?: Partial<ProductDataCd2cValidationModel>) {
    super();
    Object.assign(this, init);
  }

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.Cd2cValidation,
      name: CdmAccordionRoute.Cd2cValidation,
      displayName: 'Toolguide Validations',
      pageName: CapacityDataPageEnum.Cd2cValidation,
      mapToAccordionItem: ProductDataCd2cValidationModel.mapToAccordionItem,
      mapToGridItem: ProductDataCd2cValidationModel.mapToGridItem,
    };
  }

  static mapToAccordionItem = (
    response: any,
    productPath?: IProductNodePath
  ): ProductDataCd2cValidationModel => {
    let model = new ProductDataCd2cValidationModel();

    if (!!response) {
      model.capacityData = new ToolGuideValidationCapacityModel(
        response as any
      );
      model.capacityData.geometryValidations =
        response.geometryValidations?.map((geoValid) => {
          const geoValidationModel =
            toProductDataCd2cValidationItemModel(geoValid);
          return geoValidationModel;
        });

      model.capacityData.gradeValidations = response.gradeValidations?.map(
        (gradeValid) => {
          const gradeValidationModel =
            toProductDataCd2cValidationItemModel(gradeValid);
          return gradeValidationModel;
        }
      );

      model.capacityData.hexWindowValidations =
        response.hexWindowValidations?.map((hexWindowValid) => {
          const hexWindowValidationModel =
            toProductDataCd2cValidationItemModel(hexWindowValid);
          return hexWindowValidationModel;
        });

      model.capacityData.workingConditionsWindowValidations =
        response.workingConditionsWindowValidations?.map(
          (workingConditionsWindowValid) => {
            const workingConditionsWindowValidModel =
              toProductDataCd2cValidationItemModel(
                workingConditionsWindowValid
              );
            return workingConditionsWindowValidModel;
          }
        );

      model.capacityData.suboperationsWindowValidations =
        response.suboperationsWindowValidations?.map(
          (suboperationsWindowValidationsValid) => {
            const suboperationsWindowValidationsValidModel =
              toProductDataCd2cValidationItemModel(
                suboperationsWindowValidationsValid
              );
            return suboperationsWindowValidationsValidModel;
          }
        );

      model.capacityData.depthOfCutWindowValidations =
        response.depthOfCutWindowValidations?.map(
          (depthOfCutWindowValidationsValid) => {
            const depthOfCutWindowValidationsValidModel =
              toProductDataCd2cValidationItemModel(
                depthOfCutWindowValidationsValid
              );
            return depthOfCutWindowValidationsValidModel;
          }
        );

      model.capacityData.bodyWindowValidations =
        response.bodyWindowValidations?.map((bodyWindowValidationsValid) => {
          const bodyWindowValidationsValidModel =
            toProductDataCd2cValidationItemModel(bodyWindowValidationsValid);
          return bodyWindowValidationsValidModel;
        });

      if (!!response.descriptor) {
        model.descriptor = toCapacityDataDescriptor(
          response.descriptor,
          productPath,
          null
        );
      }
    }

    return model;
  };

  static mapToGridItem(
    item: IBaseHierarchyGridItem<ProductDataCd2cValidationModel>
  ) {
    const toolGuideValidationTypes = enumToList(
      ToolGuideValidationTypeEnum,
      false,
      true
    );

    const toolGuideValidationTypeEnumProductDataCd2cKeyCombination = {
      GEOMETRY: 'geometryValidations',
      GRADE: 'gradeValidations',
      COMMONMATERIALLABEL: 'isGeometryGradeMaterialOverlap',
      HEX: 'hexWindowValidations',
      WORKINGCONDITION: 'workingConditionsWindowValidations',
      SUBOPERATIONS: 'suboperationsWindowValidations',
      DEPTHOFCUT: 'depthOfCutWindowValidations',
      BODY: 'bodyWindowValidations',
    };

    const typeRelease = {};
    toolGuideValidationTypes.forEach((i) => {
      const value =
        item.data[
          toolGuideValidationTypeEnumProductDataCd2cKeyCombination[i.name]
        ];
      if (!value) {
        return;
      }

      if (Array.isArray(value)) {
        typeRelease[i.name] = value.length === 0;
      } else {
        typeRelease[i.name] = value;
      }
    });

    const nodes = item.productPath?.nodes || [];
    const data = {
      path: nodes?.slice(0, nodes.length - 1).join(MATERIAL_ARROW),
      node: last(nodes),
      blank: '',
      isGeometryHidden: true,
    };

    return { ...data, ...typeRelease };
  }

  static get toolguideValidationGridColumns() {
    return populateHierarchyColumns(
      [
        {
          id: 'GEOMETRY',
          name: 'Geometry',
          isCheckbox: true,
          width: 50,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'GRADE',
          name: 'Grade',
          isCheckbox: true,
          width: 50,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'COMMONMATERIALLABEL',
          name: 'Common material for geometry/grade',
          isCheckbox: true,
          width: 250,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'HEX',
          name: 'Hex Window for geometry/grade',
          isCheckbox: true,
          width: 250,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'WORKINGCONDITION',
          name: 'Working Conditions Window for geometry/grade',
          isCheckbox: true,
          width: 300,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'SUBOPERATIONS',
          name: 'Suboperations Window for geometry/grade',
          isCheckbox: true,
          width: 250,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'DEPTHOFCUT',
          name: 'Depth Of Cut Window for geometry/grade',
          isCheckbox: true,
          width: 250,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'BODY',
          name: 'Body Window for geometry/grade',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
      ],
      'RefCode',
      [],
      false
    );
  }
}

export class ToolGuideCanCalculateModel implements IServerSerializable {
  public isCalculationSupported: boolean;
  toJson() {
    return {
      IsCuttingDataCalculationSupportedResult: this.isCalculationSupported,
    };
  }
}
