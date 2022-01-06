import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@shared/shared.module';
import { RateRegulationFormRoutingModule } from './rate-regulation-form-routing.module';
const COMPONENTS = [CreateComponent,ListComponent];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  imports: [SharedModule,RateRegulationFormRoutingModule],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RateRegulationFormModule { }
