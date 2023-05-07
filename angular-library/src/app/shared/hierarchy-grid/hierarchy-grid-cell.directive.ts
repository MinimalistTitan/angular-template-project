import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[cell]',
})
export class HierarchyGridCellDirective {
  @Input() cell!: string;

  constructor(public template: TemplateRef<any>) {}
}