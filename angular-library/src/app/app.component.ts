import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG_ICONS } from './app-register-svg-icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-library';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.registerIcons();
  }
  
  private registerIcons(): void {
    SVG_ICONS.forEach((element) => {
      this.matIconRegistry.addSvgIcon(
        element.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icon/${element.path}`
        )
      );
    });
  }
}
