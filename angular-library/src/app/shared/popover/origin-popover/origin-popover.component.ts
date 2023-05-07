import { Component, Input, OnInit } from '@angular/core';
import { PopoverPlacement } from '../popover.directive';

@Component({
  selector: 'cdm-origin-popover',
  templateUrl: './origin-popover.component.html',
  styleUrls: ['origin-popover.component.scss'],
})
export class OriginPopoverComponent implements OnInit {
  @Input('title') title: string;
  @Input('content') content: any;
  @Input('placement') placement: PopoverPlacement = 'left';

  ngOnInit(): void {}
}
