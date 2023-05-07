import { MatTabChangeEvent } from '@angular/material/tabs';
import { HTMLHelper } from './../../../../utilities/html.helper';
import { Subject, takeUntil } from 'rxjs';
import {
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActiveElementTab } from './area-help.component';
import { Store } from '@ngrx/store';
import { HelpToolGuideDataState, HelpToolGuideResponseModel } from 'src/app/store/reducers/help-toolguide-export.reducers';
import { toolGuidExportAreaHelpSelector } from 'src/app/store/selectors/help-toolguide-export.selectors';
import { GetHelpToolGuideData } from 'src/app/store/actions/help-toolguide-export.actions';

@Component({
  selector: 'cdm-accordion-help',
  templateUrl: './accordion-help.component.html',
  styleUrls: ['./accordion-help.component.scss'],
})
export class AccordionHelpComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  busy: boolean = false;
  htmlContent: HelpToolGuideResponseModel = new HelpToolGuideResponseModel();
  listTabs = ['Help', 'ToolGuide export'];
  mapContent = {
    Help: '',
    'ToolGuide export': '',
  };
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<{ helpToolGuideData: HelpToolGuideDataState }>,
    private activeElementTab: ActiveElementTab,
    private _el: ElementRef
  ) {}

  ngOnInit(): void {
    this.handleToolGuideExportAreaHelp();
  }

  ngAfterViewInit(): void {
    const els = (this._el.nativeElement as HTMLElement).getElementsByTagName(
      'cdm-busy'
    );
    HTMLHelper.setChild(els, (element) => {
      element.remove();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleToolGuideExportAreaHelp() {
    this.store
      .select(toolGuidExportAreaHelpSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((ite) => {
        if (!ite || !ite[this.activeElementTab.hierarchyType]) {
          this.busy = true;
          this.store.dispatch(
            GetHelpToolGuideData({
              hierarchyType: this.activeElementTab.hierarchyType,
            })
          );
        } else {
          this.busy = false;
          let activeContent = this.getActiveContentForFirstLoad(
            !ite[this.activeElementTab.hierarchyType.toString()]
              .documentHtmlContent
              ? ''
              : ite[this.activeElementTab.hierarchyType.toString()]
                  .documentHtmlContent
          );

          this.htmlContent.documentHtmlContent = activeContent;

          this.htmlContent.exportInfoHtmlContent = !ite[
            this.activeElementTab.hierarchyType.toString()
          ].exportInfoHtmlContent
            ? ''
            : ite[this.activeElementTab.hierarchyType.toString()]
                .exportInfoHtmlContent;

          this.mapContent = {
            Help: this.htmlContent?.documentHtmlContent,
            'ToolGuide export': this.htmlContent?.exportInfoHtmlContent,
          };

          this.scrollToActiveElement();
        }
      });
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (!event) {
      return;
    }
    if (this.activeElementTab && this.activeElementTab.activeElement) {
      setTimeout(() => {
        this.findElementAndSetStyle(
          `tab${this.activeElementTab.activeElement}`
        );
      }, 1000);
    }
  }

  private scrollToActiveElement() {
    setTimeout(() => {
      let activeElement = document
        .getElementsByClassName('export-help-info-tab active')
        .item(0) as HTMLElement;
      activeElement && activeElement.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  private getActiveContentForFirstLoad(content: string) {
    const activeTab = `export-help-info-tab tab${this.activeElementTab.activeElement}`;
    if (content?.includes(activeTab)) {
      content = content.replace(new RegExp(`${activeTab}"`, 'g'), activeTab + ' active"');
    }
    return content;
  }

  private findElementAndSetStyle(name: string) {
    let element = document.getElementsByClassName(name).item(0) as HTMLElement;
    if (element) {
      element.classList.add('active');
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
