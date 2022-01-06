import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form1ARoutingModule } from './form1-a-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [ ListComponent ];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Form1ARoutingModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class Form1AModule { }
