import { Component, Injector, Input } from '@angular/core';
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { DialogService } from 'src/app/share/dialog/dialog.service';
import { IDialogConfig } from 'src/app/share/dialog/model';
import { AccordionHelpComponent } from './accordion-help.component';

@Component({
  selector: 'cdm-area-help',
  templateUrl: './area-help.component.html',
  styleUrls: ['./area-help.component.scss'],
})
export class AreaHelpComponent {
  @Input() hierarchyType: ProductHierarchyTypeEnum;
  @Input() activeElement: string;
  constructor(private dialogService: DialogService) {}

  showHelpDialog() {
    const data = {
      hierarchyType: this.hierarchyType,
      activeElement: this.activeElement,
    } as ActiveElementTab;
    const injector = Injector.create({
      providers: [{ provide: ActiveElementTab, useValue: data, deps: [] }],
    });

    const config: IDialogConfig = {
      minHeight: '95vh',
      title: toTitleAreaHelp(this.hierarchyType),
      width: '50vw',
      component: AccordionHelpComponent,
      injector: injector,
      position: {
        top: '42px',
      },
      customClassContainer:"max-h-[89vh]"
    };
    this.dialogService.open(config);
  }
}

export class ActiveElementTab {
  hierarchyType: ProductHierarchyTypeEnum;
  activeElement: string;
}

export const toTitleAreaHelp = (
  productHierarchyTypeEnum: ProductHierarchyTypeEnum
): string => {
  const key = ProductHierarchyTypeEnum[productHierarchyTypeEnum];

  if (key.indexOf('Geometry') > -1) {
    return 'Geometry Capacity Data';
  } else if (key.indexOf('Grade') > -1) {
    return 'Grade Capacity Data';
  } else if (key.indexOf('Body') > -1) {
    return 'Body Capacity Data';
  } else if (key.indexOf('ProductData') > -1) {
    return 'Data on Products';
  } else if (key.indexOf('FirstChoice') > -1) {
    return 'First Choice';
  }

  return '';
};
