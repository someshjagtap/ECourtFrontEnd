import { NgModule } from '@angular/core';
import { FormARoutingModule } from './form-a-routing.module';
import { CreateFormAComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@shared';
import { ViewComponent } from './view/view.component';
import { SubmitComponent } from './submit/submit.component';

const COMPONENTS = [CreateFormAComponent, ListComponent, ViewComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, SubmitComponent],
  imports: [SharedModule, FormARoutingModule],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class FormAModule {}
