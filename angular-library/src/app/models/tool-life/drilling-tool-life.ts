
import { isNumber } from 'lodash';
import { IAccordionSetting, IBaseHierarchyGridItem } from '../base.interface';
import { toCapacityDataDescriptor, ICapacityData, ICapacityDataDetail } from '../capacity';
import { IProductNodePath } from '../products';
import { safeFormatNumber, toHierarchyObject } from 'src/app/utilities';
import { toMaterialNodePath } from '../materials/material-node-path';
import { CapacityDataPageEnum, TabsEnum } from '../enums';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';

export class DrillingToolLifeCapacityData implements ICapacityData {
    modified: Date;
    att: number;
    alphf: number;
    tlifenom: number;
}
export class DrillingToolLife extends ICapacityDataDetail<DrillingToolLifeCapacityData>{
    att?: number;
    alphf?: number;
    tlifenom?: number;
    constructor(init?: Partial<DrillingToolLife>) {
        super();
        Object.assign(this, init);
    }
    toJson(): any {
        return {
            materialPath: { nodes: this.materialPath.nodes },
            capacityData: !this.isDefined ? null : {
                tlifenom: this.tlifenom,
                att: this.att,
                alphf: this.alphf
            }
        };
    }

    get isDefined(): boolean {
        return isNumber(this.tlifenom) && isNumber(this.att) && isNumber(this.alphf);
    }

    get isValid(): boolean {
        return this.isDefined;
    }

    get isOptionalEmpty(): boolean {
        return this.descriptor.isOptional && !this.att && !this.alphf && !this.tlifenom;
    }
}

export function mapToGridItem(item: IBaseHierarchyGridItem<DrillingToolLife>) {
    let { capacityData } = item.data;
    return {
        ...toHierarchyObject(item),
        tlifenom: safeFormatNumber(capacityData?.tlifenom, 'en', '1.2-2'),
        att: safeFormatNumber(capacityData?.att, 'en', '1.2-2'),
        alphf: safeFormatNumber(capacityData?.alphf, 'en', '1.2-2'),
    };
}

export function mapToProductDetail(
    response: DrillingToolLife,
    productPath?: IProductNodePath
): DrillingToolLife {
    if (!response) {
        return new DrillingToolLife();
    }
    const materialPath = toMaterialNodePath(response.materialPath);
    const descriptor = toCapacityDataDescriptor(response.capacityDataDescriptor, productPath, materialPath);
    const capacityData = response.capacityData || {} as DrillingToolLifeCapacityData;
    const { tlifenom, att, alphf } = capacityData;
    return new DrillingToolLife({ materialPath, descriptor, tlifenom, att, alphf });
}

export const CAPACITY_DETAIL_CONFIG: IAccordionSetting = {
    id: TabsEnum.ToolLife,
    name: CdmAccordionRoute.DrillingGradeToolLife,
    productDetailSegment: CdmAccordionRoute.ToolLife,
    displayName: 'Tool life',
    pageName: CapacityDataPageEnum.DrillingGradeTooLife,
    mapToGridItem: mapToGridItem,
    mapToAccordionItem: mapToProductDetail,
};

export const GRID_COLUMN_DEFS = [
    {
        id: 'tlifenom',
        name: 'TLIFETNOM',
        isCheckbox: false,
        customClass: 'text-center',
    },
    {
        id: 'att',
        name: 'ATT',
        isCheckbox: false,
        customClass: 'text-center',
    },
    {
        id: 'alphf',
        name: 'ALPHF',
        isCheckbox: false,
        customClass: 'text-center',
    }
];