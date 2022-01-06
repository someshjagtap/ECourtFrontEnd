import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/authentication/auth.service';
// import { User } from '@core/authentication/interface';
import { Router } from '@angular/router';
import { UserDTO } from '../../shared/model';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{ user.firstName }} {{user.lastName}}</h4>
      <h5 class="matero-user-panel-email">{{ user.email }}</h5>
      <h5 class="matero-user-panel-email">{{ user.mobileNo }}</h5>
      <div class="matero-user-panel-icons">

        <a (click)="logout()" mat-icon-button>
          <mat-icon class="icon-20">exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  user: UserDTO;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
