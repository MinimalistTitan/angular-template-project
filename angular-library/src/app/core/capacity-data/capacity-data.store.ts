import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';



import { Observable } from 'rxjs';
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { IFilterModel } from 'src/app/models/filter/filter';
import { IMaterialNodePath } from 'src/app/models/materials/material-node-path';
import { IProductMaterialSelection, IProductNodePath } from 'src/app/models/products';
import { AccordionItemModel } from 'src/app/share/accordion/accordion.model';


export interface CapacityDataContextState {
    productMaterialSelection: IProductMaterialSelection;
    hierarchyType: ProductHierarchyTypeEnum;
    productPath: IProductNodePath;
    materials: Array<IMaterialNodePath>;
    filters: Array<IFilterModel>;
    activatedCapacityData: AccordionItemModel;
}


@Injectable()
export class CapacityDataStore extends ComponentStore<CapacityDataContextState> {
  constructor() {
    const initialState: CapacityDataContextState = {
        productMaterialSelection: null,
        hierarchyType: null,
        productPath: {},
        materials: [],
        filters: null,
        activatedCapacityData: null
    };
    super(initialState);
  }
 
  readonly selectContext: Observable<CapacityDataContextState> = this.select(state => state);
  readonly selectProductPath: Observable<IProductNodePath> = this.select(state => state.productPath);
  readonly selectHierarchyType: Observable<ProductHierarchyTypeEnum> = this.select(state => state.hierarchyType);
  readonly selectActivatedCapacityData: Observable<AccordionItemModel> = this.select(state => state.activatedCapacityData);
  readonly getProductPath = (): IProductNodePath => this.get().productPath;
  readonly getActivatedCapacityData = (): AccordionItemModel => this.get().activatedCapacityData;

  updateHierarchyType = (hierarchyType: ProductHierarchyTypeEnum) => this.patchState({ hierarchyType });
  updateProductPath = (productPath: Partial<IProductNodePath>) => this.patchState(state => ({productPath: {...state.productPath, ...productPath}}));
  updateMaterials = (materials: IMaterialNodePath[]) => this.patchState({ materials });
  activateCapacityData = (config: AccordionItemModel) => this.patchState({ activatedCapacityData: config });
}