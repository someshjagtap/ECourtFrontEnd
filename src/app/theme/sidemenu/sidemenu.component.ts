import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@core';
import { AuthService } from '@core/authentication/auth.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menu$ ;
  buildRoute = this.menu.buildRoute;

  constructor(private menu: MenuService,private auth: AuthService) {
    this.auth.user().subscribe(user=>{
      if(user.id!=null){
        this.menu.getAll().subscribe(menu=>{
          this.menu.handleAuthority(user,menu);
          this.menu$ = this.menu.getAll()
        });
      }
    });
  }
}
