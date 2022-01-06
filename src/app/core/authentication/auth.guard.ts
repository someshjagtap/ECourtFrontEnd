import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticate(route, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.authenticate(childRoute, state);
  }

  private authenticate(route: ActivatedRouteSnapshot, url: any): boolean | UrlTree {
    // return this.auth.check() ? true : this.router.parseUrl('/auth/login');
    if (this.auth.check()) {
      if (route.data.role && this.auth.hasAnyAuthority(route.data.role)) {
        return true;
      } else if (!route.data.role) {
        return true;
      } else {
        return this.router.parseUrl('/admin/sessions/403');
      }
    } else {
      return this.router.parseUrl('/auth/login');
    }
  }
}
