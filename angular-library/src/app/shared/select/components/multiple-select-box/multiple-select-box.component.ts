import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'cdm-multiple-select-box',
    templateUrl: './multiple-select-box.component.html',
    styleUrls: ['./multiple-select-box.component.scss'],
    //encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class MultipleSelectBoxComponent implements OnChanges, AfterViewInit {
    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnChanges(changes: SimpleChanges): void {
        throw new Error("Method not implemented.");
    }

    
}