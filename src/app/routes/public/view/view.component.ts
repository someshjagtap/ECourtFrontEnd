import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { caseDTO } from '@shared/model/caseDTO';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  isSaving: boolean;
  detail: caseDTO;
  search: any = {};
  crudOperation: any;

  constructor(
    // private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detail = {
      accuserName: undefined,
      amount: undefined,
      amountDepositeInCourt: undefined,
      amountPaidSLO: undefined,
      appealAmount: undefined,
      appealDate: undefined,
      appealNo: undefined,
      applicationNo: undefined,
      caseDescription: undefined,
      caseFilingDate : undefined,
      caseNo: undefined,
      caseOfficer: undefined,
      caseStatus: undefined,
      caselawyer: undefined,
      chequeDate: undefined,
      chequeNo: undefined,
      comment: undefined,
      courtAmount: undefined,
      courtName: undefined,
      defendantName: undefined,
      description: undefined,
      firstAppeal: undefined,
      freefield1: undefined,
      freefield2: undefined,
      freefield3: undefined,
      hearing: undefined,
      id: undefined,
      incCompensation: undefined,
      landReferenceNo: undefined,
      lar: undefined,
      lastModified: undefined,
      lastModifiedBy: undefined,
      nextHearingDate: undefined,
      projectName: undefined,
      totalClaimAmount: undefined,
      villageName: undefined
    }

    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        this.detail = detail;
      }
    });
  }

  save(): void {
    this.isSaving = true;
    if (this.detail.id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.updateCase(this.detail));
    } else {
      this.subscribeToSaveResponse(this.operationService.createCase(this.detail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<caseDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.helperService.showSuccess('Success');
    this.previousState();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
