import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { debounceTime, tap } from 'rxjs/operators';
import { UserDTO } from '../../shared/model';

@Component({
  selector: 'app-user',
  template: `
  <button [routerLink]="['/auth/login']" *ngIf="user.login == null">LogIn</button>
    <button
      class="matero-toolbar-button matero-avatar-button"
      mat-button
      *ngIf="user.login != null"
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" [src]="user.avatar" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>{{ user.firstName }} {{user.lastName}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/public/startaudit" mat-menu-item>
        <mat-icon>dashboard</mat-icon>
        <span>Audit Page</span>
      </button>
      <button routerLink="/admin/users/change-password" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Change Passowrd</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit {
  user: UserDTO;

  constructor(private router: Router, private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.auth
      .user()
      .pipe(
        tap(user => {
          this.user = user
        }),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
