import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CuttingSpeedCorrectionModel } from "src/app/models/cutting/cutting-speed-correction.model";
import { ROLE_ASSIGNMENT } from "src/app/models/user/role";
import { CapacityDataBaseDirective } from "../../capacity-data-base/capacity-data-base.directive";
import { SAVE_REQUIRED_ROLES } from "./cutting-speed-required-roles";

@Component({
    selector: 'cdm-capacity-data-cutting-speed-correction',
    templateUrl: './cutting-speed-correction.component.html',
    styleUrls: ['./cutting-speed-correction.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      { provide: ROLE_ASSIGNMENT, useValue: { savePermittedRoles: SAVE_REQUIRED_ROLES } }
    ]
  })
  export class CuttingSpeedCorrectionComponent
    extends CapacityDataBaseDirective<CuttingSpeedCorrectionModel>
    implements OnInit
  {
    ngOnInit(): void {
       
    }
    
  }