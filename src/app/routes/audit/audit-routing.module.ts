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
import { LookupService } from '@shared/services';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { AuditSystemDTO } from '@shared/model';

// @Injectable({ providedIn: 'root' })
// export class AuditResolve implements Resolve<AuditSystemDTO> {
//   constructor(public lookupService: LookupService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const id = route.params['id'] ? route.params['id'] : null;
//     if (id) {
//       return this.lookupService
//         .getAuditSystem(id)
//         .pipe(map((res: HttpResponse<AuditSystemDTO>) => res.body));
//     }
//     return of(null);
//   }
// }

const routes: Routes = [
  {
    path: 'hospital/:id',
    component: ListComponent,
    data: { level: 'HOSPITAL', role: ['AUDIT_LIST'] },
  },
  {
    path: 'supplier/:id',
    component: ListComponent,
    data: { level: 'SUPPLIER', role: ['AUDIT_LIST'] },
  },
  {
    path: 'edit/:id',
    component: CreateComponent,
    // resolve: {
    //   detail: AuditResolve,
    // },
    data: { role: ['AUDIT_EDIT'] },
  },
  {
    path: 'create',
    component: CreateComponent,
    data: { role: ['AUDIT_EDIT'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
