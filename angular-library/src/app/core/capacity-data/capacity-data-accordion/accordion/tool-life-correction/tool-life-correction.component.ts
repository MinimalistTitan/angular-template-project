import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapacityDataBaseDirective } from '../../capacity-data-base/capacity-data-base.directive';
import { ROLE_ASSIGNMENT } from 'src/app/models/user/role';
import { SAVE_REQUIRED_ROLES } from './tool-life-correction-required-roles';
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { ToolLifeCorrectionModel } from 'src/app/models/tool-life';

@Component({
  selector: 'cdm-capacity-data-tool-life-correction',
  templateUrl: './tool-life-correction.component.html',
  styleUrls: ['./tool-life-correction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: ROLE_ASSIGNMENT, useValue: { savePermittedRoles: SAVE_REQUIRED_ROLES } }
  ]
})
export class CapacityDataToolLifeCorrectionComponent
  extends CapacityDataBaseDirective<ToolLifeCorrectionModel>
  implements OnInit
{
  numberBoxSettings = {
    stepSize: 1,
    maxValue: null,
    minValue: 0,
  };
  override ngOnInit(): void {
    this.initNumberSettings();
  }

  override createForm(response: any) {
    let controlsConfig: any = {
      capacityData: this.fb.array(
        response.map((ite) => this.setCapacityFormArray(ite))
      ),
    };

    return this.fb.group(controlsConfig);
  }

  override mapModel(data: any) {
    return data.map(
      (item) =>
        new ToolLifeCorrectionModel({
          ctlcorr: item.ctlcorr,
          materialPath: item.materialPath,
          descriptor:item.descriptor
        })
    );
  }

  //#region privates

  private setCapacityFormArray(capacity: ToolLifeCorrectionModel) {
    return this.fb.group({
      ...capacity
    });
  }

  private initNumberSettings() {
    this.numberBoxSettings.stepSize = this.getStep();
    this.numberBoxSettings.maxValue = this.getMaxLimit();
    this.numberBoxSettings.minValue = this.getMinLimit();
  }

  private getStep() {
    switch (this.productSelection.productPath.hierarchyType) {
      case ProductHierarchyTypeEnum.GeneralTurningBody:
      case ProductHierarchyTypeEnum.PartingGroovingBody:
      case ProductHierarchyTypeEnum.ThreadTurningBody:
      case ProductHierarchyTypeEnum.IndexableDrillingGeometry:
        return 0.01;
      
    }
    return 0.05;
  }

  private getMaxLimit() {
    switch (this.productSelection.productPath.hierarchyType) {
      case ProductHierarchyTypeEnum.SolidMillingGeometry:
      case ProductHierarchyTypeEnum.IndexableDrillingBody:
        return 5;
      case ProductHierarchyTypeEnum.GeneralTurningBody:
      case ProductHierarchyTypeEnum.PartingGroovingBody:
      case ProductHierarchyTypeEnum.ThreadTurningBody:
        return 2;
      case ProductHierarchyTypeEnum.IndexableDrillingGeometry:
          return 100;
      
    }
    return 10;
  }

  private getMinLimit() {
    switch (this.productSelection.productPath.hierarchyType) {
      case ProductHierarchyTypeEnum.IndexableDrillingGeometry:
      case ProductHierarchyTypeEnum.IndexableDrillingBody:
        return 0;
      case ProductHierarchyTypeEnum.SolidMillingGeometry:
      case ProductHierarchyTypeEnum.GeneralTurningBody:
      case ProductHierarchyTypeEnum.PartingGroovingBody:
      case ProductHierarchyTypeEnum.ThreadTurningBody:
        return 0.01;
    }
    return 0.05;
  }

  //#endregion
}
