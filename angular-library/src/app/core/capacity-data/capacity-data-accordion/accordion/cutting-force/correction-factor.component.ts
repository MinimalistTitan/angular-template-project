import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CapacityDataBaseDirective } from '../../capacity-data-base/capacity-data-base.directive';
import { SAVE_REQUIRED_ROLES } from './correction-required-roles';
import { ROLE_ASSIGNMENT } from 'src/app/models/user/role';
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { CuttingForceModel } from 'src/app/models/cutting/cutting-force.model';

@Component({
  selector: 'cdm-capacity-data-correction-factor',
  templateUrl: './correction-factor.component.html',
  styleUrls: ['./correction-factor.component.scss'],
  providers: [
    {
      provide: ROLE_ASSIGNMENT,
      useValue: { savePermittedRoles: SAVE_REQUIRED_ROLES },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrectionFactorComponent
  extends CapacityDataBaseDirective<CuttingForceModel>
  implements OnInit {
  numberBoxSettings = {
    stepSize: 0.05,
    maxValue: 1,
    minValue: 0.1,
    digits: 2
  };
  headerColunmName: String;
  override ngOnInit(): void {
    switch (this.productPath.hierarchyType) {
      case ProductHierarchyTypeEnum.GeneralTurningGeometry:
      case ProductHierarchyTypeEnum.PartingGroovingGeometry:
        this.headerColunmName = 'CFFCA';
        break;
      default:
        this.headerColunmName = 'CKC';

        if (this.productPath.hierarchyType === ProductHierarchyTypeEnum.IndexableMillingGeometry) {
          this.numberBoxSettings = { ...this.numberBoxSettings, maxValue: 10 };
        }
    };
  }
  override createForm(value: CuttingForceModel[]) {
    let controlsConfig: any = {
      capacityData: this.fb.array(
        value.map((ite) => this.setCapacityFormArray(ite))
      ),
    };
    return this.fb.group(controlsConfig);
  }

  private setCapacityFormArray(capacity: CuttingForceModel) {
    return this.fb.group({
      ...capacity,
      ckc: [{ value: capacity.ckc, disabled: capacity.descriptor.isReadOnly }, capacity.descriptor.isRequired ? Validators.required : Validators.nullValidator],
    });
  }

  override mapModel(data: any): CuttingForceModel[] {
    return data.map(
      (item) =>
        new CuttingForceModel({
          ckc: item.ckc,
          materialPath: item.materialPath,
          descriptor: item.descriptor,
        })
    );
  }
}
