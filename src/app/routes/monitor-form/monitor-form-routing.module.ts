import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { CreateeveningComponent } from './create_evening/createevening.component';
import { ListeveningComponent } from './list_evening/listevening.component';



const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'list', component: ListComponent },
  { path: 'createevening', component: CreateeveningComponent },
  { path: 'listevening', component: ListeveningComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorFormRoutingModule { }
