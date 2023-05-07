import { Component, Input, OnInit } from '@angular/core';
import { PopoverPlacement } from '../popover.directive';

@Component({
  selector: 'cdm-inheritance-popover',
  templateUrl: './inheritance-popover.component.html',
  styleUrls: ['inheritance-popover.component.scss'],
})
export class InheritancePopoverComponent implements OnInit {
  @Input('title') title: string;
  @Input('content') content: any;
  @Input('placement') placement: PopoverPlacement = 'left';
  icon: string;
  cssClass: string;

  ngOnInit(): void {}
}
