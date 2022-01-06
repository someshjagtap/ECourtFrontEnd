import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { SecurityUserDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SAVING_MESSAGE } from '@shared/constants/input.constants';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  detail: SecurityUserDTO;
  isSaving = false;
  useraccess;

  constructor(
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        this.detail = detail;
      } else {
        this.detail = { langKey: 'en', activated: 0 };
        const incomingData: any = this.location.getState();
        if (incomingData != undefined) {
          this.useraccess = incomingData.access;
          this.detail.securityRoles = [incomingData.role];
        }
      }
      delete this.detail['passwordHash'];
    });
  }

  save() {
    if (this.detail.id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.updateSecurityUser(this.detail));
    } else {
      this.subscribeToCreatSaveResponse(this.operationService.createSecurityUser(this.detail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<SecurityUserDTO>>): void {
    result.subscribe(
      (res) => this.onSaveSuccess(res, false),
      (error) => this.onSaveError(error)
    );
  }

  protected subscribeToCreatSaveResponse(result: Observable<HttpResponse<SecurityUserDTO>>): void {
    result.subscribe(
      (res) => this.onSaveSuccess(res, true),
      (error) => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(res, add): void {
    if (add) {
      this.useraccess.securityUserId = res.body.id;
      this.subscribeToSaveResponse(this.operationService.createUserAccess(this.useraccess));
    } else {
      this.isSaving = false;
      this.previousState();
    }
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError(error) {
    if(error.error.detail && error.error.detail.includes('ux_security_user_login')){
      this.helperService.showErrorMessage('Username already exixts.');
    }
    this.isSaving = false;
  }

  delete(id) {
    this.subscribeToSaveResponse(this.operationService.deleteSecurityUser(id));
  }
}
