import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { CdmSubModuleRoute } from 'src/app/models/routes';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-module-navigation',
  templateUrl: './module-navigation.component.html',
  styleUrls: ['./module-navigation.component.scss'],
})
export class ModuleNavigationComponent implements OnInit {
  @Input() cdmSubModuleRoutes!: CdmSubModuleRoute[];
  @Input() activatedRoute!: ActivatedRoute;

  navigationItems$: Observable<CdmSubModuleRoute[]>;
  private _moduleRoutes: BehaviorSubject<CdmSubModuleRoute[]> = new BehaviorSubject<CdmSubModuleRoute[]>(null as any);
  
  constructor(private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._moduleRoutes.next(this.cdmSubModuleRoutes);
  }

  ngOnInit(): void {
    this.navigationItems$ =  this._moduleRoutes.asObservable().pipe(combineLatestWith(this.userService.selectRoleNames()),
    map(([items, roles]) => {
      return (items || []).filter(ite => this.userService.hasRole([...(ite.readableRoles || []), ...(ite.writableRoles || [])])).map(m => {
        return {
          ...m, readonly: !this.userService.hasRole(m.writableRoles)
        };
      });
    }));
  }
}
