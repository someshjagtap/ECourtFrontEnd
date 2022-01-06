import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorFormRoutingModule } from './monitor-form-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@shared/shared.module';
import { CreateeveningComponent } from './create_evening/createevening.component';
import { ListeveningComponent } from './list_evening/listevening.component';

const COMPONENTS = [CreateComponent,ListComponent];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, CreateeveningComponent, ListeveningComponent],
  imports: [SharedModule,MonitorFormRoutingModule],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class MonitorFormModule { }
