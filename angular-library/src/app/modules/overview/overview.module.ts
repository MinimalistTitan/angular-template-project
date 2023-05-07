import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolGuideVersionService } from '../../core/services/toolguide-version.service';
import { SharedModule } from 'src/app/share/share.module';
import { ToolGuideVersionComponent } from './tool-guide-version/tool-guide-version.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  }
];

@NgModule({
  declarations: [OverviewComponent, ToolGuideVersionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
  ],
  exports: [OverviewComponent],
  providers: [ToolGuideVersionService],
})
export class OverviewModule {}
