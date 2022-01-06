import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormAComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'create', component: CreateFormAComponent ,data: { role: ['AUDIT_FORM_A_CREATE'] }},
  { path: 'list', component: ListComponent ,data: { role: ['AUDIT_LIST'] }},
  { path: 'view/:id', component: ViewComponent ,data: { role: ['AUDIT_FORM_A_READ'] }},
  { path: 'edit/:id', component: ViewComponent, data: { role: ['AUDIT_FORM_A_EDIT'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormARoutingModule {}
