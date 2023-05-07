import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[accordion]',
})
export class AccordionItemContentDirective {
  @Input() accordion!: string;

  constructor(public template: TemplateRef<any>) {}
}
