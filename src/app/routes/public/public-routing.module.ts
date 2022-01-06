import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { caseDTO } from '@shared/model/caseDTO';
import { LookupService } from '@shared/services';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnnexureABCListComponent } from '../annexure-abc/list/list.component';
import { AuditListComponent } from './audit-list/audit.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { ViewComponent } from './view/view.component';

@Injectable({ providedIn: 'root' })
export class CaseResolve implements Resolve<caseDTO> {
  constructor(public lookupService: LookupService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.lookupService
        .casebyId(id)
        .pipe(map((res: HttpResponse<caseDTO>) => res.body));
    }
    return of(null);
  }
}

const routes: Routes = [
  { path: 'hospitals', component: AnnexureABCListComponent, data: { size: 200, expandable: false } },
  { path: '', redirectTo: 'startaudit', pathMatch: 'full' },
  { path: 'startaudit', component: AuditListComponent },
  { path: 'startaudit/:hospitalId', component: AuditListComponent },
  { path: '', redirectTo: 'caselist', pathMatch: 'full' },
  { path: 'caselist', component: CaseListComponent },
  { path: 'createcase', component: CreateCaseComponent },
  {
    path: 'editcase/:id',
    component: CreateCaseComponent,
    resolve: {
      detail: CaseResolve,
    },
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      detail: CaseResolve,
    },
  },
  { path: 'view', component: ViewComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
