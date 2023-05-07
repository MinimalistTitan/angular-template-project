
import { isArray } from 'lodash';
import { Observable, filter, map, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isEqual, last, first } from 'lodash';
import { formatDate } from '@angular/common';
import { CdmModule, CdmSubModule } from 'src/app/share/shared.enum';
import { IHierarchyProduct, IProductMaterialSelection, IProductNodePath } from 'src/app/models/products';
import { AppConfig, CDM_APP_CONFIG, Hierarchy, IBaseHierarchyGridItem } from 'src/app/models';
import { CANCELLATION_HEADER } from '../interceptor/request-cancelling.interceptor';
import { CdmAccordionRoute } from '../capacity-data/capacity-data.enum';
import { ICapacityData, ICapacityDataDetail, toCapacityData } from 'src/app/models/capacity';
import { CapacityDataSetResultModel, toCapacityDataSetResultModel } from 'src/app/models/capacity/capacity-data-set-result.model';
import { TabsEnum } from 'src/app/models/enums';
import { IAuditLog } from 'src/app/models/audit-log';
import { IMaterial, IMaterialProfile, toMaterialNodePath } from 'src/app/models/materials/material-node-path';
import { CapacityDataSaveRequestForMaterialsModel } from 'src/app/models/capacity/capacity-data-save-request-for-materials.model';
import { CapacityDataSaveRequestBaseModel } from 'src/app/models/capacity/capacity-data-save-request-base.model';
import { CapacityDataSaveRequestModel } from 'src/app/models/capacity/capacity-data-save-request.model';

export const MODULE_NAME_TOKEN = new InjectionToken<CdmModule>('module');
export function toProductSelection(
  productSelection: IProductMaterialSelection,
  exceptLast = false
) {
  return {
    filters: productSelection.filters,
    materials: productSelection.materials.map((_) => {
      return { nodes: exceptLast ? _.nodes.slice(0, -1) : _.nodes };
    }),
    productPath: {
      nodes: productSelection.productPath.nodes,
    },
  };
}
@Injectable({
  providedIn: 'any',
})
export class CommonService {
  private _subModule: CdmSubModule;
  private _supportedModules = [
    CdmSubModule.Geometry,
    CdmSubModule.Grade,
    CdmSubModule.Body,
    CdmSubModule.ProductData,
    CdmSubModule.FirstChoice,
    CdmSubModule.Diameter,
    CdmSubModule.ProductAssignment,
  ];
  subModuleChange$ = new BehaviorSubject<CdmSubModule>(null);
  constructor(
    private httpClient: HttpClient,
    @Inject(CDM_APP_CONFIG) private appConfig: AppConfig,
    @Inject(MODULE_NAME_TOKEN) public module: CdmModule,
    private router: Router
  ) {
    this.routeHandler();
    this.setCurrentSubModule();
  }

  //#region APIs

  getHierarchy(): Observable<Hierarchy> {
    return this.httpClient.post<Hierarchy>(
      this.getRequestUrl(['hierarchy']),
      null,
      { headers: CANCELLATION_HEADER }
    );
  }

  getList<TModel>(
    accordion: CdmAccordionRoute,
    request: IProductMaterialSelection
  ): Observable<IBaseHierarchyGridItem<TModel>[]> {
    return this.httpClient
      .post<any>(this.getRequestUrl([accordion, 'list']), request, {
        headers: { ...CANCELLATION_HEADER },
      })
      .pipe(
        map((res) => {
          if (res instanceof Array) {
            return res.flatMap((item) => {
              if (item?.items) {
                return item.items as IBaseHierarchyGridItem<TModel>[];
              }
              return item as IBaseHierarchyGridItem<TModel>;
            });
          }

          return [res] as IBaseHierarchyGridItem<TModel>[];
        }),
        map((res) => {
          res.forEach((item) => {
            // data on Product
            if (!item.data) {
              if (isArray((item as any).items)) {
                const items = (item as any).items.flat(1);
                res.push(...items);
                return;
              } else {
                item.data = item as any;
              }
            }
            if (!item.productPath) {
              item.productPath = item['productNode'];
            }
          });
          return res.filter((_) => !!_.data);
        })
      );
  }

  get(
    accordion: string,
    productSelection: IProductMaterialSelection
  ): Observable<ICapacityDataDetail<ICapacityData>[]> {
    const payload = productSelection;
    return this.httpClient
      .post<ICapacityDataDetail<ICapacityData>[]>(
        this.getRequestUrl([accordion]),
        payload,
        { headers: CANCELLATION_HEADER }
      )
      .pipe(
        map((res) => {
          if (res instanceof Array) {
            return res;
          }

          return [res] as ICapacityDataDetail<ICapacityData>[];
        }),
        map((data) => toCapacityData(data, productSelection.productPath))
      );
  }

  //#region Data on Products
  getDataOnProduct(
    accordion: CdmAccordionRoute,
    payload:
      | {
          materialSelection: IProductMaterialSelection;
          materialHierarchyLevel: number;
          productHierarchyLevel: number;
        }
      | IProductNodePath
  ): Observable<ICapacityDataDetail<ICapacityData>[]> {
    return this.httpClient
      .post<ICapacityDataDetail<ICapacityData>[]>(
        this.getRequestUrl([accordion]),
        payload,
        { headers: CANCELLATION_HEADER }
      )
      .pipe(
        map((res) => {
          if (res instanceof Array) {
            return res;
          }
          return [res] as ICapacityDataDetail<ICapacityData>[];
        }),
        map((data) =>
          toCapacityData(
            data,
            !!payload['materialSelection']
              ? payload['materialSelection'].productPath
              : payload
          )
        )
      );
  }
  //#endregion

  getPreviewList<TModel>(
    accordion: string,
    productSelection: IProductMaterialSelection,
    capacityDataForMaterials?: any,
    deleteExceptions?: boolean,
    isSingleObject: boolean = false
  ): Observable<CapacityDataSetResultModel> {
    var previewRequest = new CapacityDataSaveRequestForMaterialsModel(
      productSelection,
      isSingleObject
        ? first(capacityDataForMaterials)
        : capacityDataForMaterials,
      null,
      deleteExceptions
    );
    return this.httpClient
      .post<{
        data: IBaseHierarchyGridItem<TModel>[];
        hasConflicts: boolean;
        conflicts: any;
      }>(this.getRequestUrl([accordion, 'preview']), previewRequest.toJson(), {
        headers: { ...CANCELLATION_HEADER },
      })
      .pipe(
        map((setResult: CapacityDataSetResultModel) =>
          this.mapSetResult(setResult, productSelection, true)
        )
      );
  }

  set(
    accordion: string,
    productSelection: IProductMaterialSelection,
    capacityData: any,
    saveComment: any,
    deleteExceptions?: any,
    conflicts?: any,
    isSingleObject: boolean = false
  ): Observable<CapacityDataSetResultModel> {
    const saveModel = !isSingleObject
      ? new CapacityDataSaveRequestForMaterialsModel(
          productSelection,
          capacityData,
          saveComment,
          deleteExceptions,
          conflicts
        )
      : new CapacityDataSaveRequestModel(
          productSelection,
          capacityData[0],
          saveComment,
          deleteExceptions,
          conflicts
        );
    return this.httpClient
      .post<CapacityDataSetResultModel>(
        this.getRequestUrl([accordion, 'set']),
        saveModel.toJson()
      )
      .pipe(map((setResult) => this.mapSetResult(setResult, productSelection)));
  }

  remove(
    accordion: string,
    productSelection: IProductMaterialSelection,
    saveComment: any
  ): Observable<CapacityDataSetResultModel> {
    const deleteModel = new CapacityDataSaveRequestBaseModel(
      productSelection,
      saveComment
    );

    return this.httpClient
      .post<CapacityDataSetResultModel>(
        this.getRequestUrl([accordion, 'delete']),
        deleteModel.toJson()
      )
      .pipe(map((setResult) => this.mapSetResult(setResult, productSelection)));
  }

  getProducts(productPath: IProductNodePath): Observable<IHierarchyProduct[]> {
    return this.httpClient
      .post<IHierarchyProduct[]>(
        this.getRequestUrl(['products']),
        productPath,
        { headers: CANCELLATION_HEADER }
      )
      .pipe(
        map((data) => {
          data.forEach((item) => {
            item.productPath = (item.hierarchyNodePath?.nodes || []).join(
              ' > '
            );
          });
          return data;
        })
      );
  }

  getAuditLogs(
    accordionPage: TabsEnum,
    productSelection: IProductMaterialSelection
  ): Observable<IAuditLog[]> {
    return this.httpClient
      .post<IAuditLog[]>(
        this.getRequestUrl(['audit-log-items']),
        {
          MaterialSelection: productSelection,
          tab: TabsEnum[accordionPage],
        },
        { headers: CANCELLATION_HEADER }
      )
      .pipe(
        map((data) => {
          data.forEach((item) => {
            item.materialName = (item.material?.nodes || []).join(' > ');
            item.date = formatDate(item.date, 'YYYY-MM-dd hh:mm:ss', 'en');
          });
          return data;
        })
      );
  }

  validateMaterials(
    accordionPage: TabsEnum,
    productSelection: IProductMaterialSelection
  ): Observable<IMaterial[]> {
    return this.httpClient.post<IMaterial[]>(
      this.getRequestUrl(['validated-materials']),
      {
        MaterialSelection: productSelection,
        tab: accordionPage,
      },
      { headers: CANCELLATION_HEADER }
    );
  }

  getMaterialProfiles(
    productSelection: IProductMaterialSelection
  ): Observable<IMaterialProfile[]> {
    return this.httpClient
      .post<IMaterialProfile[]>(
        this.getRequestUrl(['materialprofile', 'list']),
        toProductSelection(productSelection, false),
        { headers: CANCELLATION_HEADER }
      )
      .pipe(
        map((_) => {
          _.forEach((profile) => {
            profile.materialPath = toMaterialNodePath(profile.materialPath);
          });
          return _;
        })
      );
  }

  //#endregion

  //#region validations

  isChartSupported = (route: CdmAccordionRoute) => {
    return [
      CdmAccordionRoute.CuttingSpeed,
      CdmAccordionRoute.OperationArea,
      CdmAccordionRoute.Feeds,
      CdmAccordionRoute.IndexableMillingCuttingSpeed,
    ].includes(route);
  };

  isSkipMaterialValidation = (route: CdmAccordionRoute) => {
    return [
      CdmAccordionRoute.Suboperation,
      CdmAccordionRoute.ReleaseProduct,
      CdmAccordionRoute.StartValues,
      CdmAccordionRoute.Cd2cValidation,
      CdmAccordionRoute.FirstChoiceManagement,
      CdmAccordionRoute.OperationArea,
    ].includes(route);
  };

  isActivatedOn = (subModule: CdmSubModule) => {
    return this._subModule === subModule;
  };

  //#endregion

  //#region privates

  private getRequestUrl(routes: string[]): string {
    routes.unshift(...['api', this.module, this._subModule]);
    const url = routes.join('/');
    return new URL(url, this.appConfig.apiHost).toString();
  }

  private routeHandler() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCurrentSubModule();
      });
  }

  private setCurrentSubModule() {
    const subModule = last(this.router.url?.split('/')) as CdmSubModule;
    if (!!subModule && !isEqual(subModule, this._subModule)) {
      this._subModule = subModule;
      if (this._supportedModules.includes(this._subModule)) {
        this.subModuleChange$.next(this._subModule);
      }
    }
  }

  private mapSetResult(
    setResult: CapacityDataSetResultModel,
    productSelection: IProductMaterialSelection,
    isPreview = false
  ) {
    let mappedResult;
    if (setResult instanceof Array) {
      const result = setResult.flatMap((item) => {
        if (item?.items) {
          return item.items;
        }
        return item;
      });

      const formattedResult = { ...setResult, data: result };
      mappedResult = toCapacityDataSetResultModel(formattedResult);
    } else {
      mappedResult = toCapacityDataSetResultModel(setResult);
    }

    if (!isPreview) {
      mappedResult.data = toCapacityData(
        mappedResult.data,
        productSelection.productPath
      );
    }

    return mappedResult;
  }

  //#endregion
}
