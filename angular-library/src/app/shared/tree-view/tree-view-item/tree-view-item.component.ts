import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cdm-tree-view-item',
  templateUrl: './tree-view-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewItemComponent {}
