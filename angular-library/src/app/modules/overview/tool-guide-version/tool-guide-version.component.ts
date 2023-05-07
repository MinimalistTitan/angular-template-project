import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TargetToolGuideRelease } from '../../../models/toolguide-validation/toolguide-version.model';
@Component({
  selector: 'tool-guide-version',
  templateUrl: './tool-guide-version.component.html',
  styleUrls: ['./tool-guide-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolGuideVersionComponent {
  @Input()
  data: TargetToolGuideRelease;
}
