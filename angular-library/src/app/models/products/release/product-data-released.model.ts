


import { isBoolean, last } from 'lodash';
import { IProductNodePath } from '../product-node-path';
import {
  ProductDataProductValidationItem,
  toProductDataProductValidationItem,
} from './product-data-released-validation-item.model';
import { CapacityDataPageEnum, ProductDataReleasedProductValidationTypeEnum, TabsEnum } from '../../enums';
import { ICapacityData, ICapacityDataDetail } from '../../capacity';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { enumToList, populateHierarchyColumns } from 'src/app/utilities';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../../base.interface';
import { toCapacityDataDescriptor } from '../../capacity/capacity-data-descriptor.model';

export interface ValidationLabel {
  type: ProductDataReleasedProductValidationTypeEnum;
  label: string;
}

export class ProductReleaseCapacityDataModel implements ICapacityData {
  modified: Date;
  isReleased: boolean;
  validations: Array<ProductDataProductValidationItem>;
  isReleasedProductToLabelingSystem: boolean;
}

export class ProductReleaseModel extends ICapacityDataDetail<ProductReleaseCapacityDataModel> {
  isReleased?: boolean;
  validations?: Array<ProductDataProductValidationItem>;
  isReleasedProductToLabelingSystem?: boolean;

  constructor(init?: Partial<ProductReleaseModel>) {
    super();
    Object.assign(this, init);
  }

  toJson(): any {
    return {
      isReleased: this.isReleased,
    };
  }

  get isDefined(): boolean {
    return this.validations.every((validation) => isBoolean(validation));
  }

  get isValid(): boolean {
    return this.validations.every((validation) => validation.isValid);
  }

  get isOptionalEmpty(): boolean {
    return true;
  }

  static mapToAccordionItem = (
    response: ProductReleaseModel,
    productPath?: IProductNodePath
  ): ProductReleaseModel => {
    let model = new ProductReleaseModel();

    if (!!response) {
      model.isReleased = response.isReleased;
      model.validations = response.validations.map((validation) =>
        toProductDataProductValidationItem(validation)
      );
      if (!!response.descriptor) {
        model.descriptor = toCapacityDataDescriptor(
          response.descriptor,
          productPath,
          null
        );
      }

      model.isReleasedProductToLabelingSystem =
        response.isReleasedProductToLabelingSystem;
    }

    return model;
  };

  static get accordion(): IAccordionSetting {
    return {
      id: TabsEnum.ReleaseProduct,
      name: CdmAccordionRoute.ReleaseProduct,
      displayName: 'Release Start Values',
      pageName: CapacityDataPageEnum.IndexableDrillingReleaseProduct,
      mapToAccordionItem: ProductReleaseModel.mapToAccordionItem,
      mapToGridItem: ProductReleaseModel.mapToGridItem,
    };
  }

  static mapToGridItem(item: IBaseHierarchyGridItem<ProductReleaseModel>) {
    const productDataReleasedProductValidationTypes = enumToList(
      ProductDataReleasedProductValidationTypeEnum,
      false,
      true
    );
    const validations = item.data.validations || [];
    const typeRelease = validations.reduce((map, obj) => {
      const propertyName =
        productDataReleasedProductValidationTypes[obj.type].name;
      return (map[propertyName] = obj.isValid), map;
    }, {});

    const nodes = item.productPath?.nodes || [];
    const data = {
      path: nodes?.slice(0, nodes.length - 1).join(MATERIAL_ARROW),
      node: last(nodes),
      isReleased: item.data.isReleased,
      validations: item.data.validations,
      blank: '',
    };
    return { ...data, ...typeRelease };
  }

  static get releaseStartValuesGridColumn() {
    return populateHierarchyColumns(
      [
        {
          id: 'isReleased',
          name: 'Released',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
        },
        {
          id: 'GEOMETRY',
          name: 'Geometry',
          isCheckbox: true,
          width: 150,
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
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'PRODUCTDATA',
          name: 'Product Data',
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

  static get indexableDrillingReleaseStartValuesGridColumns() {
    return populateHierarchyColumns(
      [
        {
          id: 'isReleased',
          name: 'Released',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
        },
        {
          id: 'GEOMETRY',
          name: 'Geometry',
          isCheckbox: true,
          width: 150,
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
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'LABEL',
          name: 'Label',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'PRODUCTDATA',
          name: 'Product Data',
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

  static get generalTurningReleaseStartValuesGridColumn() {
    return populateHierarchyColumns(
      [
        {
          id: 'isReleased',
          name: 'Released',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
        },
        {
          id: 'GEOMETRY',
          name: 'Geometry',
          isCheckbox: true,
          width: 150,
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
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'HEX',
          name: 'Hex Window Geo/Grade',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'DEPTHOFCUT',
          name: 'Depth Of Cut Window Geo/Grade',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'LABEL',
          name: 'Label',
          isCheckbox: true,
          width: 150,
          customClass: 'text-center',
          unCheckBoxText: 'X',
          backgroundClass: 'bg-green-400',
          unCheckBoxClass: 'bg-red-600',
          hidden: true,
        },
        {
          id: 'PRODUCTDATA',
          name: 'Product Data',
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

export const BORING_RELEASE_START_VALUES_GRID_COLUMN_DEFS =
  populateHierarchyColumns(
    [
      {
        id: 'isReleased',
        name: 'Released',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
      },
      {
        id: 'GEOMETRY',
        name: 'Geometry',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
        unCheckBoxText: 'X',
        backgroundClass: 'bg-green-400',
        unCheckBoxClass: 'bg-red-600',
      },
      {
        id: 'GRADE',
        name: 'Grade',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
        unCheckBoxText: 'X',
        backgroundClass: 'bg-green-400',
        unCheckBoxClass: 'bg-red-600',
      },
      {
        id: 'HEX',
        name: 'Hex Window Geo/Grade',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
        unCheckBoxText: 'X',
        backgroundClass: 'bg-green-400',
        unCheckBoxClass: 'bg-red-600',
      },
      {
        id: 'DEPTHOFCUT',
        name: 'Depth Of Cut Window Geo/Grade',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
        unCheckBoxText: 'X',
        backgroundClass: 'bg-green-400',
        unCheckBoxClass: 'bg-red-600',
      },
      {
        id: 'LABEL',
        name: 'Label',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
        unCheckBoxText: 'X',
        backgroundClass: 'bg-green-400',
        unCheckBoxClass: 'bg-red-600',
      },
      {
        id: 'PRODUCTDATA',
        name: 'Product Data',
        isCheckbox: true,
        width: 150,
        customClass: 'text-center',
        unCheckBoxText: 'X',
        backgroundClass: 'bg-green-400',
        unCheckBoxClass: 'bg-red-600',
      },
    ],
    'RefCode',
    [],
    false
  );
