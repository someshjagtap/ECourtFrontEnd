import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HospitalRoutingModule } from './annexure-abc-routing.module';
import { AnnexureABCListComponent } from './list/list.component';
import { CreateAnnexureABCComponent } from './create/create.component';
import { AnnexureABCViewComponent } from './view/view.component';
import { SubmitComponent } from './submit/submit.component';

const COMPONENTS = [
  AnnexureABCListComponent,
  CreateAnnexureABCComponent,
  AnnexureABCViewComponent,
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, HospitalRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, SubmitComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class HospitalModule {}
