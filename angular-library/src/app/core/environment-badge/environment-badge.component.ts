import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-environment-badge',
  templateUrl: './environment-badge.component.html',
  styleUrls: ['./environment-badge.component.scss']
})
export class EnvironmentBadgeComponent {
  @Input()
  environmentName:string;
}
