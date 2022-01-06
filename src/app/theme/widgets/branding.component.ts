import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="#/public/caselist">
      <img src="./assets/images/clogo.png" class="matero-branding-logo-expanded" alt="logo" />
    </a>
    <a class="matero-branding" href="#/public/caselist">
      <h2>{{'heading.main' | translate}}<strong>{{'heading.sub' | translate}}</strong>
      </h2>
    </a>

  `,
})
export class BrandingComponent {}
