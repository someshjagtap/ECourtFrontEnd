import { Component, OnInit } from '@angular/core';
import { HearingDTO } from '@shared/model/hearingDTO';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-hearing',
  templateUrl: './create-hearing.component.html',
  styleUrls: ['./create-hearing.component.scss']
})
export class CreateHearingComponent implements OnInit {

  isSaving: boolean;
  detail: HearingDTO;
  search: any = {};

  constructor(
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
      comment: undefined,
      conclusion: undefined,
      description: undefined,
      hearingDate: undefined,
      id: undefined,
      lastModified: undefined,
      lastModifiedBy: undefined,
      nextHearingDate: undefined,
      previousHearingDate: undefined,
      status: undefined,
      freefield1: undefined, //Accuser name
      freefield2: undefined, //Defender name
      freefield3: undefined, //Participant name
      freefield4: undefined,
      freefield5: undefined,
    }

    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        this.detail = detail;
      }
    });
  }

  save() {
    this.isSaving = true;
    if (this.detail.id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.updateHearing(this.detail));
    } else {
      this.subscribeToSaveResponse(this.operationService.createHearing(this.detail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<HearingDTO>>): void {
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

  private onSaveError() {
    this.isSaving = false;
  }

  previousState(): void {
    this.location.back();
  }

}
