import { NgModule, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
  RouterModule,
} from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { PasswordComponent } from './password/password.component';
import { LookupService } from '@shared/services';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { SecurityUserDTO } from '@shared/model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<SecurityUserDTO> {
  constructor(public lookupService: LookupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.lookupService
        .querySecurityUser(id)
        .pipe(map((res: HttpResponse<SecurityUserDTO>) => res.body));
    }
    return of(null);
  }
}

const routes: Routes = [
  {
    path: 'hospital/:accessId',
    component: ListComponent,
    data: { level: 'HOSPITAL', role: ['USERS_LIST'] },
  },
  {
    path: 'supplier/:accessId',
    component: ListComponent,
    data: { level: 'SUPPLIER', role: ['USERS_LIST'] },
  },
  {
    path: 'edit/:id',
    component: CreateComponent,
    resolve: {
      detail: UserResolve,
    },
    data: { role: ['USERS_EDIT'] },
  },
  {
    path: 'create',
    component: CreateComponent,
    data: { role: ['USERS_EDIT'] },
  },
  {
    path: 'change-password',
    component: PasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
