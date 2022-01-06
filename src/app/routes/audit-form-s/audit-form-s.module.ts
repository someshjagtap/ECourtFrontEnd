import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SupplierRoutingModule } from './audit-form-s-routing.module';
import { FormSListComponent } from './list/list.component';
import { FormSCreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSViewComponent } from './view/view.component';
import { SubmitComponent } from './submit/submit.component';



const COMPONENTS = [FormSListComponent, FormSCreateComponent,FormSViewComponent
  ];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    SubmitComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SupplierModule { }
