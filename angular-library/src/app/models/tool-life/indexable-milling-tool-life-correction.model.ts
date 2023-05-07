import {
    ICapacityData,
    ICapacityDataDetail,
    toCapacityDataDescriptor,
  } from '../capacity/index';
  import { first, last } from 'lodash';
  import { IBaseHierarchyGridItem } from '../base.interface';
  import { isNumber } from 'lodash';
  import { IProductNodePath } from '../products';
import { MATERIAL_ARROW } from 'src/app/share/share.const';
import { safeFormatNumber } from 'src/app/utilities';
import { toMaterialNodePath } from '../materials/material-node-path';
  
  export class IndexableMillingToolLifeCorrectionModelCapacityDataModel implements ICapacityData {
    modified: Date;
    ctlcorr: number;
    ctlcorrMillplg: number;
    isCtlcorrMillplgReadOnly: boolean;
  }
  export class IndexableMillingToolLifeCorrectionModel extends ICapacityDataDetail<IndexableMillingToolLifeCorrectionModelCapacityDataModel>{
    ctlcorr?: number;
    ctlcorrMillplg?: number;
    isCtlcorrMillplgReadOnly?: boolean;
  
    constructor(init?: Partial<IndexableMillingToolLifeCorrectionModel>) {
      super();
      Object.assign(this, init);
    }
    toJson(): any {
      return {
        materialPath: { nodes: this.materialPath.nodes },
        capacityData: !this.isDefined ? null : {
          ctlcorr: this.ctlcorr,
          ctlcorrMillplg: this.ctlcorrMillplg
        }
      };
    }
  
    get isDefined(): boolean {
      return isNumber(this.ctlcorr)
        && (this.isCtlcorrMillplgReadOnly || isNumber(this.ctlcorrMillplg));
    }
  
    get isValid(): boolean {
      return this.isDefined;
    }
  
    get isOptionalEmpty(): boolean {
      return this.descriptor.isOptional &&
        !this.ctlcorr &&
        !this.ctlcorrMillplg;
    }
  
    static mapToGridItem(item: IBaseHierarchyGridItem<IndexableMillingToolLifeCorrectionModel>) {
      const nodes = item.data.materialPath?.nodes || [];
      const data = {
        path: item.productPath.nodes
          ?.slice(0, item.productPath?.nodes?.length - 1)
          .join(MATERIAL_ARROW),
        node: last(item.productPath.nodes),
        material: `${first(nodes)}${nodes.slice(1).join('.')}`,
        ctlcorr: safeFormatNumber(item.data.capacityData?.ctlcorr, 'en', '1.2-2'),
        ctlcorrMillplg: safeFormatNumber(item.data.capacityData?.ctlcorrMillplg, 'en', '1.2-2'),
        blank: '',
      };
  
      return data;
    }
  
    static mapToAccordionItem = (
      response: IndexableMillingToolLifeCorrectionModel,
      productPath?: IProductNodePath
    ): IndexableMillingToolLifeCorrectionModel => {
      var model = new IndexableMillingToolLifeCorrectionModel();
      if (response != null) {
        model.materialPath = toMaterialNodePath(
          response.materialPath
        );
        model.descriptor = toCapacityDataDescriptor(
          response.capacityDataDescriptor,
          productPath,
          model.materialPath
        );
  
        if (response.capacityData != null) {
          const capacityData = response.capacityData;
  
          model.ctlcorr = capacityData.ctlcorr;
          model.ctlcorrMillplg = capacityData.ctlcorrMillplg;
          model.isCtlcorrMillplgReadOnly = capacityData.isCtlcorrMillplgReadOnly;
        } else {
          model.ctlcorr = undefined;
          model.ctlcorrMillplg = undefined;
          model.isCtlcorrMillplgReadOnly = undefined;
        }
      }
      return model;
    };
  }
  