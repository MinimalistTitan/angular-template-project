
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { MaterialCode } from './material.interface';
import { first, isBoolean, isEqual } from 'lodash';
import { IMaterial, IMaterialNodePath } from 'src/app/models/materials/material-node-path';
import { ICapacityDataPage } from 'src/app/models/capacity';
import { ProductHierarchyTypeEnum, TmcLevelEnum } from 'src/app/models/enums';

@Component({
  selector: 'cdm-material-iso-code',
  templateUrl: './material-iso-code.component.html',
  styleUrls: ['./material-iso-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialIsoCodeComponent implements OnInit, OnChanges {
  //#region variables
  @Output() materialsChanged: EventEmitter<IMaterialNodePath[]> =
    new EventEmitter<IMaterialNodePath[]>();
  //
  private _capacityDataPage: ICapacityDataPage;
  @Input() get capacityDataPage(): ICapacityDataPage {
    return this._capacityDataPage;
  }
  set capacityDataPage(value: ICapacityDataPage) {
    this._capacityDataPage = value;

    if (
      this.previousSubTmcLevel &&
      this.previousSubTmcLevel > this.tmcLevels.Tmc1
    ) {
      this.tmcLevel = this.previousSubTmcLevel;
    } else {
      this.tmcLevel = this._capacityDataPage?.defaultTmcLevel;
    }

    if (this.isSubLevel) {
      this.selectedTmcLevelChange(this.tmcLevel);
    } else {
      this.emitMaterialChanged();
    }
    console.log('set capacityDataPage.....', this._capacityDataPage);
  }
  @Input() hierarchyType: ProductHierarchyTypeEnum;
  @Input() materials: IMaterial[];
  @Input() isStopPropagation: boolean;
  @Input() materialsValidation: IMaterial[] = [];
  //
  @Output() propagationStopped = new EventEmitter<{
    data: IMaterialNodePath | MaterialCode;
    type: 'root' | 'sub' | 'all';
    event?: MouseEvent;
  }>();
  get isTmcLevelChangeAllowed(): boolean {
    if (isBoolean(this._capacityDataPage?.isTmcLevelChangeAllowed))
      return this._capacityDataPage?.isTmcLevelChangeAllowed;
    const isAllowedForHierarchyType =
      this._capacityDataPage?.isTmcLevelChangeAllowed?.find(
        (m) => m.type == this.hierarchyType
      );
    return (
      !!isAllowedForHierarchyType &&
      isAllowedForHierarchyType.isAllowed === true
    );
  }
  //
  tmcLevels = TmcLevelEnum;
  tmcLevel = TmcLevelEnum.Tmc0;
  rootMaterials: MaterialCode[] = [];
  subMaterials: IMaterialNodePath[];
  previousSubTmcLevel: number;
  //
  get materialLevelTitle(): string {
    return this.tmcLevel < 1 ? 'MC' : `MC${this.tmcLevel || ''}`;
  }

  get selectedMaterial(): string {
    return first(this.selectedMaterialNodes);
  }

  get selectedMaterialNodes(): string[] {
    return this.rootMaterials.filter((_) => _.isSelected).map((_) => _.code);
  }

  get selectedSubNodes(): string[] {
    return this.subMaterials.find((_) => _.isSelected)?.material.nodes;
  }

  get isSubLevel(): boolean {
    return this.tmcLevel > this.tmcLevels.Tmc1;
  }

  get isRootLevel(): boolean {
    return this.tmcLevel === this.tmcLevels.Tmc0;
  }

  //#endregion
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['materialsValidation']) {
      this.refreshMaterialValidations(this.materialsValidation);
    }
    if (changes['capacityDataPage']) {
      console.log(
        'previousValue.......',
        changes['capacityDataPage'].previousValue
      );
      console.log(
        'currentValue.......',
        changes['capacityDataPage'].currentValue
      );
    }
  }

  ngOnInit(): void {
    this.initMaterials();
  }

  selectedTmcLevelChange(level: TmcLevelEnum) {
    this.tmcLevel = level;
    this.previousSubTmcLevel = level;

    if (this.isSubLevel && this.selectedMaterialNodes.length > 1) {
      this.rootMaterials.forEach((item) => (item.isSelected = false));
      this.rootMaterials[0].isSelected = true;
    } else {
      this.subMaterials.forEach((_) => (_.isSelected = false));
    }

    this.loadSubMaterials();
    this.emitMaterialChanged();
  }

  rootMaterialSelecting(event: MouseEvent, materialCode: MaterialCode) {
    if (!this.isStopPropagation) {
      this.rootMaterialSelected(event, materialCode);
    } else {
      this.propagationStopped.emit({ data: materialCode, type: 'root' });
    }
  }

  subMaterialSelecting(subMaterial: IMaterialNodePath) {
    if (!this.isStopPropagation) {
      this.subMaterialSelected(subMaterial);
    } else {
      this.propagationStopped.emit({ data: subMaterial, type: 'sub' });
    }
  }

  allMaterialSelecting() {
    if (!this.isStopPropagation) {
      this.allMaterialSelected();
    } else {
      this.propagationStopped.emit({ data: null, type: 'all' });
    }
  }

  refreshMaterialValidations(materials: IMaterial[]): void {
    const subMaterials = materials
      .filter((_) => _.tmcLevel > this.tmcLevels.Tmc1)
      .map((_) => _.nodes)
      .flat(1);

    this.materials
      .filter((_) => _.tmcLevel > this.tmcLevels.Tmc1)
      .forEach((_) =>
        _.nodes.forEach((n) => {
          const matchedNode = subMaterials.find((s) =>
            isEqual(n.material.nodes, s.material.nodes)
          );
          if (!!matchedNode) {
            n.isValid = matchedNode.isValid;
          }
        })
      );
    this.loadSubMaterials(false);
  }

  selectMaterial(payload: {
    data: IMaterialNodePath | MaterialCode;
    type: 'root' | 'sub' | 'all';
    event?: MouseEvent;
  }) {
    switch (payload.type) {
      case 'all':
        this.allMaterialSelected();
        break;
      case 'root':
        this.rootMaterialSelected(payload.event, payload.data as MaterialCode);
        break;
      case 'sub':
        this.subMaterialSelected(payload.data);
        break;
    }
  }

  //#region privates

  private ctrlClickMaterialCodeHandling(materialCode: MaterialCode) {
    const isValid = this.rootMaterials.some(
      (e) => e.code !== materialCode.code && e.isSelected
    );
    if (isValid) {
      this.rootMaterials = this.rootMaterials.map((e) => {
        if (e.code === materialCode.code) {
          return { ...e, isSelected: !materialCode.isSelected };
        }
        return e;
      });
    }
  }

  private emitMaterialChanged() {
    const materials: IMaterialNodePath[] = [];

    if (this.isRootLevel) {
      materials.push({ nodes: ['root'] });
    } else if (this.isSubLevel) {
      const material = { nodes: this.selectedSubNodes } as IMaterialNodePath;

      const matchedNode = this.subMaterials.find((_) =>
        isEqual(_.material?.nodes, this.selectedSubNodes)
      );

      if (!!matchedNode) {
        Object.assign(material, matchedNode);
      }

      materials.push(material);
    } else {
      this.selectedMaterialNodes.forEach((_) => {
        materials.push({ nodes: [_] });
      });
    }

    this.materialsChanged.emit(materials);
  }

  private initMaterials() {
    const rootLevel = this.materials?.find(
      (_) => _.tmcLevel === this.tmcLevels.Tmc1
    );
    this.rootMaterials = rootLevel?.nodes.map((node) => {
      return {
        code: node.material.nodes[0],
        isSelected: true,
        isValid: node.isValid,
      } as MaterialCode;
    });
    if (this.capacityDataPage.isMultiselectDisabledOnAllLevels) {
      this.rootMaterialSelected(null, first(this.rootMaterials));
    } else {
      this.allMaterialSelected();
    }
  }

  private loadSubMaterials(rootOrTmcLevelSelect: boolean = true) {
    const subLevel = this.materials?.find((_) => _.tmcLevel === this.tmcLevel);

    if (!subLevel) return;
    this.subMaterials = subLevel?.nodes
      .filter((_) => _.material.nodes.indexOf(this.selectedMaterial) === 0)
      .map((materialNode) => {
        const nodes = materialNode.material.nodes;
        materialNode.pathString = `${first(nodes)}${nodes.slice(1).join('.')}`;
        return materialNode;
      });

    if (rootOrTmcLevelSelect) {
      if (!!this.subMaterials?.length) {
        this.subMaterials.forEach((subMaterial) => {
          subMaterial.isSelected = false;
        });
        const currentSelects = this.subMaterials.filter((_) => _.isSelected);
        if (!!currentSelects && currentSelects.length > 0) {
          //already select
        }
        const released = this.subMaterials.find((_) => _.isReferenceMaterial);
        if (!!released) {
          released.isSelected = true;
        } else {
          this.subMaterials[0].isSelected = !this.subMaterials[0].isSelected;
        }
      }
    }
  }

  private rootMaterialSelected(event: MouseEvent, materialCode: MaterialCode) {
    if (
      !!event &&
      event.ctrlKey &&
      !this.isSubLevel &&
      !this.capacityDataPage.isMultiselectDisabledOnAllLevels
    ) {
      this.ctrlClickMaterialCodeHandling(materialCode);
    } else {
      this.rootMaterials = this.rootMaterials.map((e) => {
        if (e.code === materialCode.code) {
          return { ...e, isSelected: true };
        }
        return { ...e, isSelected: false };
      });
    }

    this.loadSubMaterials();
    this.emitMaterialChanged();
  }

  private subMaterialSelected(subMaterial: IMaterialNodePath) {
    this.subMaterials.forEach((_) => (_.isSelected = false));
    subMaterial.isSelected = true;
    this.emitMaterialChanged();
  }

  private allMaterialSelected() {
    this.rootMaterials = this.rootMaterials.map((e) => {
      return { ...e, isSelected: true };
    });

    this.emitMaterialChanged();
  }

  //#endregion
}
