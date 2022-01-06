import { NgModule, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
  RouterModule,
} from '@angular/router';
import { FormSListComponent } from './list/list.component';
import { FormSCreateComponent } from './create/create.component';
import { LookupService } from '@shared/services';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { SupplierDTO } from '@shared/model';
import { FormSViewComponent } from './view/view.component';

// @Injectable({ providedIn: 'root' })
// export class SupplierResolve implements Resolve<SupplierDTO> {
//   constructor(public lookupService: LookupService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const id = route.params['id'] ? route.params['id'] : null;
//     if (id) {
//       return this.lookupService
//         .querySupplier(id)
//         .pipe(map((res: HttpResponse<SupplierDTO>) => res.body));
//     }
//     return of(null);
//   }
// }
const routes: Routes = [
  { path: 'create', component: FormSCreateComponent, data: { role: ['AUDIT_FORM_CREATE'] } },
  { path: 'view/:id', component: FormSViewComponent, data: { role: ['AUDIT_FORM_READ'] } },
  {
    path: 'list',
    component: FormSListComponent,
    data: { role: ['AUDIT_LIST'] },
  },
  {
    path: 'edit/:id',
    component: FormSViewComponent,
    data: { role: ['AUDIT_FORM_EDIT'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
