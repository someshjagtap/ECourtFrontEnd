import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HearingDTO } from '@shared/model/hearingDTO';
import { LookupService } from '@shared/services';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateHearingComponent } from './create-hearing/create-hearing.component';
import { ListHearingComponent } from './list-hearing/list-hearing.component';
import { ViewComponent } from './view/view.component';

@Injectable({ providedIn: 'root' })
export class HearingResolve implements Resolve<HearingDTO> {
  constructor(public lookupService: LookupService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.lookupService
        .hearingbyId(id)
        .pipe(map((res: HttpResponse<HearingDTO>) => res.body));
    }
    return of(null);
  }
}

const routes: Routes = [
  {
    path: 'createHearing',
    component: CreateHearingComponent
  },
  {
    path: 'editHearing/:id',
    component: CreateHearingComponent,
    resolve: {
      detail: HearingResolve,
    },
  },
  {
    path: 'hearingList/:id',
    component: ListHearingComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      detail: HearingResolve,
    },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HearingRoutingModule { }
