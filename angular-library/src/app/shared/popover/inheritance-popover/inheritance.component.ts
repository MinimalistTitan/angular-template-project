import { Component, Input } from '@angular/core';

@Component({
  selector: 'cdm-inheritance',
  templateUrl: './inheritance.component.html',
  styleUrls: ['inheritance.component.scss'],
})
export class InheritanceComponent {
  @Input('content') content: any;
}
