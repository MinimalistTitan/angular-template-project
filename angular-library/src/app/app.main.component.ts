import { Component } from '@angular/core';

@Component({
    selector: 'shell-route',
    template: `
      <app-shell></app-shell>
    `,
    host: {
      class: 'cdm-shell-route'
    }
  })
export class AppMainComponent {

}
