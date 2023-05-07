import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PopoverPlacement } from '../popover.directive';
import { TypedPopoverEnum } from 'src/app/models/enums';

@Component({
  selector: 'cdm-typed-popover',
  templateUrl: './typed-popover.component.html',
  styleUrls: ['typed-popover.component.scss'],
})
export class TypePopoverComponent implements OnInit {
  @Input('type') type: string;
  @Input('title') title: string;
  @Input('content') content: string;
  @Input('placement') placement: PopoverPlacement = 'left';
  @Input('disableInteractivity') disableInteractivity: boolean = false;
  @Input('canShowValidationTooltip') canShowValidationTooltip: boolean = true;
  @Input('icon') tpIcon: string;
  @Input('useSvgIcon') useSvgIcon = true;
  icon: string;
  cssClass: string;

  ngOnInit(): void {
    const typedPopoverEnum: TypedPopoverEnum = TypedPopoverEnum[this.type];
    switch (typedPopoverEnum) {
      case TypedPopoverEnum.Help:
        this.icon = 'help';
        this.cssClass = 'help text-primary-500';
        break;
      case TypedPopoverEnum.Warning:
        this.icon = 'pencil-square';
        this.cssClass = 'warning';
        break;
      case TypedPopoverEnum.Error:
        this.icon = 'exclamation-circle';
        this.cssClass = 'error';
        break;
      case TypedPopoverEnum.Check:
        this.icon = 'check';
        this.cssClass = 'check';
        break;
      default:
        this.icon = 'info-circle';
        this.cssClass = 'info';
    }

    if (this.tpIcon) {
      this.icon = this.tpIcon;
    }
  }
}
