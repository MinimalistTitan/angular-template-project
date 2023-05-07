import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdm-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['origin.component.scss'],
})
export class OriginComponent {
  @Input('content') content: any;
}
