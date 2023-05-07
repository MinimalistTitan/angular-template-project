
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { PipeModule } from 'src/app/share/pipe/pipe.module';
import { LoadingIndicatorModule } from 'src/app/share/loading-indicator';
import { AreaHelpComponent } from './area-help.component';
import { AccordionHelpComponent } from './accordion-help.component';

@NgModule({
    declarations: [
        AreaHelpComponent,
        AccordionHelpComponent
    ],
    imports: [
        LoadingIndicatorModule,
        CommonModule,
        MatIconModule,
        MatTabsModule,
        PipeModule
    ],
    exports: [
        AreaHelpComponent
    ]
})
export class AreaHelpModule { }