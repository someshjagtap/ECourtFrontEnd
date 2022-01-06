import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Form1BRoutingModule } from './form1-b-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [CreateComponent, ListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Form1BRoutingModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})

export class Form1BModule { }
