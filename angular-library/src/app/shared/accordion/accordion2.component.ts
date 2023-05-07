import { ContentChildren, Output, QueryList, TemplateRef } from '@angular/core';
import {
  Component,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';


import { last } from 'lodash';
import { IDictionary } from 'src/app/models';
import { AccordionItemModel } from './accordion.model';
import { ProductHierarchyTypeEnum } from 'src/app/models/enums';
import { MATERIAL_ARROW } from '../share.const';
import { AccordionItemContentDirective } from './accordion-item-content.directive';
import { AccordionService } from './accordion.service';


@Component({
  selector: 'cdm-accordion2',
  templateUrl: './accordion2.component.html',
  styleUrls: ['./accordion2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion2Component {
  @Input() externalTemplates: QueryList<AccordionItemContentDirective>;

  @ContentChildren(AccordionItemContentDirective)
  private _contentTemplates!: QueryList<AccordionItemContentDirective>;

  contentTemplates: IDictionary<TemplateRef<HTMLElement> | null> = {};
  private _dataSource: AccordionItemModel[] = [];
  @Input() get dataSource(): AccordionItemModel[] {
    return this._dataSource;
  }
  set dataSource(value: AccordionItemModel[]) {
    value
      .filter((item) => !item.mapToGridItem)
      .forEach((item) => {
        item.mapToGridItem = (item) => {
          return {
            path: item.productPath.nodes
              ?.slice(0, item.productPath?.nodes?.length - 1)
              .join(MATERIAL_ARROW),
            node: last(item.productPath.nodes),
            blank: '',
          };
        };
      });
    this._dataSource = value;
  }
  @Input() hierarchyType: ProductHierarchyTypeEnum;
  @Input() isStopPropagation: boolean;
  //
  @Output() itemOpened = new EventEmitter<AccordionItemModel>();
  @Output() propagationStopped = new EventEmitter<AccordionItemModel>();

  get composedTemplateRefs(): IDictionary<TemplateRef<HTMLElement> | null> {
    return [
      ...this._contentTemplates,
      ...(this.externalTemplates || []),
    ].reduce((prev, curr, index) => {
      const result = { ...prev, [curr.accordion]: curr.template };
      return result;
    }, {});
  }

  constructor(private accordionService: AccordionService) {}

  itemClicking(e: MouseEvent, item: AccordionItemModel) {
    e.stopImmediatePropagation();
    if (item.expanded) {
      return;
    }
    if (!this.isStopPropagation) {
      this.expandItem(item);
    } else {
      this.propagationStopped.emit(item);
    }
  }

  expandItem(item: AccordionItemModel, emitEventAlways: boolean = false) {
    if (item.disabled && !emitEventAlways) {
      return;
    }
    item.capacityDataPage = this.accordionService.getCapacityData(
      item.pageName,
      this.hierarchyType
    );

    if (!item.disabled && !item.expanded) {
      this.dataSource.forEach((_) => (_.expanded = _.id === item.id));
      emitEventAlways = true;
    }

    if (emitEventAlways) {
      this.itemOpened.next(item);
    }
  }
}
