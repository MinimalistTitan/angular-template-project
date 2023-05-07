import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
  } from '@angular/core';
import { TmcLevelEnum } from 'src/app/models/enums';
import { TmcLevel } from '../material.interface';


  
  @Component({
    selector: 'cdm-tmc-level',
    templateUrl: './tmc-level.component.html',
    styleUrls: ['./tmc-level.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TmcLevelComponent implements OnInit {
    @Output() selectedTmcLevelChange = new EventEmitter<TmcLevelEnum>();
    @Input() selectedLevel: TmcLevelEnum;
    @Input() maxAllowedTmcLevel: TmcLevelEnum;
    tmcLevelList: Array<TmcLevel> = [];
    constructor() {}
  
    ngOnInit(): void {
      this.initTmcLevels();
    }
  
    private initTmcLevels() {
      for (let i = 0; i < this.maxAllowedTmcLevel; i++) {
        this.tmcLevelList.push({
          tmcLevelName: i + 1,
          isSelected: false,
        });
      }
    }
  
    setTmcLevel(tmcLevel: number) {
      this.selectedTmcLevelChange.emit(tmcLevel);
    }
  }
  