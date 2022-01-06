import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HearingRoutingModule } from './hearing-routing.module';
import { CreateHearingComponent } from './create-hearing/create-hearing.component';
import { SharedModule } from '@shared/shared.module';
import { ListHearingComponent } from './list-hearing/list-hearing.component';
import { ViewComponent } from './view/view.component';


const COMPONENTS = [
  CreateHearingComponent,
  ListHearingComponent,
  ViewComponent
];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  imports: [
    CommonModule,
    HearingRoutingModule,
    SharedModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class HearingModule { }
