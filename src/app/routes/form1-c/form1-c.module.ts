import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Form1CRoutingModule } from './form1-c-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListComponent } from './list/list.component';

const COMPONENTS = [ ListComponent ];
const COMPONENTS_DYNAMIC = [];

@NgModule({
 
  imports: [
    CommonModule,
    SharedModule,
    Form1CRoutingModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class Form1CModule { }
