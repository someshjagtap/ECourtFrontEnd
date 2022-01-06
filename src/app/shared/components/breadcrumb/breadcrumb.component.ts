import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '@core/bootstrap/menu.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  @Input() nav: string[] = [];

  constructor(private router: Router, private menu: MenuService) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }
  }

  trackByNavlink(index: number, navlink: string): string {
    return navlink;
  }

  genBreadcrumb() {
    let routes = this.router.url.slice(1).split('/');
    if(routes.length>=2){
      routes[1]=routes[0]+'/'+routes[1]
      routes =routes.slice(1);
    }
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
  }
}
