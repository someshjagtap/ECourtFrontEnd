import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/authentication/auth.service';
import { OperationsService,HelperService } from '@shared/services';
import { UserDTO } from 'app/shared/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
  error = false;
  account$?: Observable<UserDTO | null>;
  currentPassword:string;
  newPassword:string;
  confirmPassword:string;

  detail: any = {};

  isSaving = false;
  constructor(
    private authService: AuthService,
    private oper: OperationsService,
    private location: Location,
    public helperService: HelperService,
  ) {}

  ngOnInit(): void {
    this.account$ = this.authService.user();
  }

  save(): void {
    this.isSaving = true;
    this.error = false;
    if (this.newPassword !== this.confirmPassword) {
    } else {
      this.oper
        .changePassword(this.newPassword , this.currentPassword)
        .subscribe(
          () => ( (this.isSaving = false),(this.helperService.showSuccess("Password changed!"))),
          () => ((this.error = true), (this.isSaving = false))
        );
    }
  }

  previousState(): void {
    this.location.back();
  }
}
