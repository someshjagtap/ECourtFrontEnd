import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { PublicLayoutComponent } from '../theme/public-layout/public-layout.component';
import { LoginComponent } from './sessions/login/login.component';
import { AuthGuard } from '@core/authentication/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'sessions' },
      },
      {
        path: 'hearings',
        loadChildren: () => import('./hearing/hearing.module').then(m => m.HearingModule)
      },
      {
        path: 'annexure-abc',
        loadChildren: () => import('./annexure-abc/annexure-abc.module').then(m => m.HospitalModule),
      },
      {
        path: 'audit-form-s',
        loadChildren: () => import('./audit-form-s/audit-form-s.module').then(m => m.SupplierModule),
      },
      {
        path: 'audit-form-a',
        loadChildren: () => import('./audit-form-a/form-a.module').then(m => m.FormAModule),
      },
      {
        path: 'monitor-form',
        loadChildren: () => import('./monitor-form/monitor-form.module').then(m => m.MonitorFormModule),
      },
      {
        path: 'rate-regulation-form',
        loadChildren: () => import('./rate-regulation-form/rate-regulation-form.module').then(m => m.RateRegulationFormModule),
      },
      {
        path: 'form1-b',
        loadChildren: () => import('./form1-b/form1-b.module').then(m => m.Form1BModule),
      },
      {
        path: 'form1-a',
        loadChildren: () => import('./form1-a/form1-a.module').then(m => m.Form1AModule),
      },
      {
        path: 'form1-c',
       loadChildren: () => import('./form1-c/form1-c.module').then(m => m.Form1CModule)
      },

      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
      }
    ],
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: 'Login', titleI18n: 'login' } },
    ],
  },
  // { path: 'startaudit', redirectTo: 'public/startaudit' },
  // { path: '', redirectTo: 'public/startaudit', pathMatch: 'full' },
  { path: 'caselist', redirectTo: 'public/caselist' },
  { path: '', redirectTo: 'public/caselist', pathMatch: 'full' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule { }
