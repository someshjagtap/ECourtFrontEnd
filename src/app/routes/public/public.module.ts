import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { AuditListComponent } from './audit-list/audit.component';
import { CreateAuditComponent } from './create-audit/create-audit.component';
import { ViewComponent } from './view/view.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CreateCaseComponent } from './create-case/create-case.component';

const COMPONENTS = [AuditListComponent,CreateAuditComponent, ViewComponent,CaseListComponent,CreateCaseComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    PublicRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class PublicModule { }
