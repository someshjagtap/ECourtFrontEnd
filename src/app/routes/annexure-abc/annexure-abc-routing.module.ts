import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HospitalDTO } from '@shared/model';
import { LookupService } from '@shared/services';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateAnnexureABCComponent } from './create/create.component';


import { AnnexureABCListComponent } from './list/list.component';
import { AnnexureABCViewComponent } from './view/view.component';

@Injectable({ providedIn: 'root' })
export class HospitalResolve implements Resolve<HospitalDTO> {
  constructor(public lookupService: LookupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return
      // this.lookupService
      //   .getHospital(id)
      //   .pipe(map((res: HttpResponse<HospitalDTO>) => res.body));
    }
    return of(null);
  }
}

const routes: Routes = [
  { path: 'create', component: CreateAnnexureABCComponent , data: { role: ['AUDIT_FORM_CREATE'] }},
  { path: 'list/:id', component: AnnexureABCListComponent, data: { role: ['AUDIT_LIST'] } },
  { path: 'list', component: AnnexureABCListComponent },

  {
    path: 'edit/:id',
    component: AnnexureABCViewComponent,
    data: { role: ['AUDIT_FORM_EDIT'] },

  },
  {
    path: 'view/:id',
    component: AnnexureABCViewComponent,
    data: { role: ['AUDIT_FORM_READ'] },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalRoutingModule {}
