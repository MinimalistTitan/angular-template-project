import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'cdm-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['popover.component.scss']
})
export class PopoverComponent {
  @Input('placement') placement: string;
  @Input('class') customizeClass: string = '';
  @Input('title') title: string = '';
  @Input() contentTemplate: TemplateRef<any>;
  @Input('disableInteractivity') disableInteractivity:boolean = true;
  @Input('disableArrow') disableArrow:boolean = false;
  @Input('isDropDrag') isDropDrag:boolean = false;

}
