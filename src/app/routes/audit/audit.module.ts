import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuditRoutingModule } from './audit-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

const COMPONENTS = [
  ListComponent,
  CreateComponent,
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, AuditRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class AuditModule {}
