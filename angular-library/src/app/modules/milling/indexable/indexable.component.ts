import { Observable, Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  INDEXABLE_MILLING_ACCORDION,
  INDEXABLE_MILLING_GRID_COLUMN,
  INDEXABLE_MILLING_SUB_MODULES,
} from './indexable.const';


import { CdmSubModule } from 'src/app/share/shared.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { CdmAccordionRoute } from 'src/app/core/capacity-data/capacity-data.enum';
import { populateHierarchyColumns } from 'src/app/utilities';
import { CapacityDataContainerComponent } from '../../capacity-data-container/capacity-data-container.component';
import { ComponentCanDeactivate } from '../../guards/pending-changes.guard';
import { RelativeEngagementConfigurationSet } from 'src/app/models/relative-engagement/relative-engagement-configuration-set.model';
import { RelativeEngagementService } from './services/relative-engagement.service';

@Component({
  selector: 'cdm-indexable-milling',
  templateUrl: './indexable.component.html',
})
export class IndexableMillingComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  @ViewChild(CapacityDataContainerComponent, { static: true }) capacityContainer: CapacityDataContainerComponent;
  accordions = INDEXABLE_MILLING_ACCORDION;
  columns = INDEXABLE_MILLING_GRID_COLUMN;
  subModules = INDEXABLE_MILLING_SUB_MODULES;
  tabs = CdmAccordionRoute;
  cdmSubModule = CdmSubModule;
  private _sub$ = new Subscription();
  relativeEngagementConfiguration: RelativeEngagementConfigurationSet;

  constructor(
    private _commonService: CommonService,
    private _relativeEngagementService: RelativeEngagementService
  ) {}

  ngOnDestroy(): void {
    if (!!this._sub$) {
      this._sub$.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.initSubs();
  }

  canDeactivate(): Observable<boolean> {
    return this.capacityContainer?.canDeactivate();
  }

  private initSubs() {
    this._sub$.add(
      this._commonService.subModuleChange$.subscribe((submodule) => {
        switch (submodule) {
          case CdmSubModule.Geometry: {
            this.columns[CdmAccordionRoute.CuttingSpeedCorrection] =
              populateHierarchyColumns([
                {
                  id: 'cvcorr',
                  name: 'CVCCORR_ML',
                  isCheckbox: false,
                  customClass: 'text-center',
                },
                {
                  id: 'cvcorrMillplg',
                  name: 'CVCCORR_MILLPLG',
                  isCheckbox: false,
                  customClass: 'text-center',
                },
              ]);
            this.columns = {...this.columns};
            break;
          }
          case CdmSubModule.Body: {
            this.columns[CdmAccordionRoute.CuttingSpeedCorrection] =
              populateHierarchyColumns([
                {
                  id: 'cvcorr',
                  name: 'CVCCORR',
                  isCheckbox: false,
                  customClass: 'text-center',
                },
              ]);
              this.columns = {...this.columns};
            break;
          }
        }
      })
    );

    this._relativeEngagementService
      .get()
      .subscribe((res => this.relativeEngagementConfiguration = res));
  }
}
