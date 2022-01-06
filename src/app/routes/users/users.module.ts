import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { PasswordComponent } from './password/password.component';
import { PasswordStrengthBarComponent } from './password-strength-bar.component';

const COMPONENTS = [
  ListComponent,
  CreateComponent,
  PasswordStrengthBarComponent,
  PasswordComponent,
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, UsersRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class UsersModule {}
