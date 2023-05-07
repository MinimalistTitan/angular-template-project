import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SAVE_REQUIRED_ROLES } from './ranking-required-roles';
import { CapacityDataBaseDirective } from '../../capacity-data-base/capacity-data-base.directive';
import { ROLE_ASSIGNMENT } from 'src/app/models/user/role';
import { SliderConfigs, SliderStepConfigs } from 'src/app/share/slider/models';
import { RankingEnum } from 'src/app/models/enums';
import { RankingModel } from 'src/app/models/rankings';

@Component({
  selector: 'cdm-capacity-data-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  providers: [
    { provide: ROLE_ASSIGNMENT, useValue: { savePermittedRoles: SAVE_REQUIRED_ROLES } }
  ]
})
export class RankingComponent
  extends CapacityDataBaseDirective<RankingModel>
  implements OnInit
{
  rankingSliderConfigs: SliderConfigs[] = [];
  sliderStepConfigs: SliderStepConfigs[];
  stepNames: { [key: string]: string } = {};
  override ngOnInit(){
    this.rankingSliderConfigs = this.getRankingSliderConfigs();
  }
  override ngOnChanges(changes: SimpleChanges): void {
    this.updateSliderStepConfigs();
    this.updateStepNames();
  }

  private updateStepNames() {
    this.rankingSliderConfigs.forEach((e) => (this.stepNames[e.value] = e.name));
  }

  private updateSliderStepConfigs() {
    this.sliderStepConfigs = this.rankingSliderConfigs?.map((e) => ({
      value: e.value,
      color: e.pointerColor,
    }));
  }
  private getRankingSliderConfigs(): SliderConfigs[] {
    return [
      {
        value: RankingEnum.Basic,
        name: 'Basic',
        pointerColor: '#4ADE80',
        iconClassName: 'icon-ranking-basic',
      },
      {
        value: RankingEnum.Complementary,
        name: 'Complementary',
        pointerColor: '#FDE047',
        iconClassName: 'icon-ranking-complementary',
      },
      {
        value: RankingEnum.NotPublished,
        name: 'Not Published',
        pointerColor: '#fdba74',
        iconClassName: 'icon-ranking-not-published',
      },
      {
        value: RankingEnum.NoCuttingData,
        name: 'No Cutting Data',
        pointerColor: '#dc2626',
        iconClassName: 'icon-ranking-no-cutting-data',
      },
      {
        value: RankingEnum.NotDefined,
        name: 'Not Defined',
        pointerColor: '#ffffff',
        iconClassName: 'icon-ranking-undefined',
        disabled: this.isCurrentHierarchyLevelDefault,
      },
    ];
  }

  override createForm(response: any) {
    let controlsConfig: any = {
      capacityData: this.fb.array(
        response.map((ite) => this.getCapacityFormGroup(ite))
      ),
    };
    return this.fb.group(controlsConfig);
  }

  override mapModel(data: any) {
    return data.map(
      (item) =>
        new RankingModel({
          rank: item.rank,
          materialPath: item.materialPath,
          descriptor:item.descriptor
        })
    );
  }
  override valuePatched(data: any) {
    this.updateSliderStepConfigs();
  }

  private getCapacityFormGroup(capacity: RankingModel): FormGroup {
    return this.fb.group({
      ...capacity,
    });
  }

}
