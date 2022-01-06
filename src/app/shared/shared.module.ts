import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { MaterialExtensionsModule } from '@ng-matero/extensions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ErrorCodeComponent } from './components/error-code/error-code.component';

import { DisableControlDirective } from './directives/disable-control.directive';
import { AuthorityDisableLinkDirective } from './directives/authority-disable-link.directive';
import { AuthorityHideDirective } from './directives/authority-hide.directive';
import { AuthorityShowDirective } from './directives/authority-show.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { LowercaseDirective } from './directives/lowercase.directive';
import { PositiveNumberOnlyDirective } from './directives/posivitive-number.directive';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ToObservablePipe } from './pipes/to-observable.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FormSComponent } from './components/form-s/form-s.component';
import { InventoryReportTableComponent } from './components/inventory-report-table/inventory-report-table.component';
import { OxygenUseComponent } from './components/oxygen-use/oxygen-use.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LmoOxygenComponent } from './components/lmo-oxygen/lmo-oxygen.component';
import { MtxDialogModule } from '@ng-matero/extensions/dialog';
import { NgxCaptchaModule } from 'ngx-captcha';

const MODULES = [
  MaterialModule,
  MaterialExtensionsModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgSelectModule,
  NgOptionHighlightModule,
  FormlyModule,
  FormlyMaterialModule,
  ToastrModule,
  TranslateModule,
  GoogleMapsModule,
  MtxDialogModule,
  NgxCaptchaModule
];
const COMPONENTS = [
  BreadcrumbComponent,
  PageHeaderComponent,
  ErrorCodeComponent,
  QuestionnaireComponent,
  FormSComponent,
  InventoryReportTableComponent,
  OxygenUseComponent,
  InventoryComponent,
  LmoOxygenComponent
];
const COMPONENTS_DYNAMIC = [];
const DIRECTIVES = [
  DisableControlDirective,
  AuthorityDisableLinkDirective,
  AuthorityHideDirective,
  AuthorityShowDirective,
  UppercaseDirective,
  PositiveNumberOnlyDirective,
  LowercaseDirective
];
const PIPES = [SafeUrlPipe, ToObservablePipe, DateAgoPipe];

@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...MODULES],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  providers: [GoogleMap],

  entryComponents: COMPONENTS_DYNAMIC,
})
export class SharedModule {}
