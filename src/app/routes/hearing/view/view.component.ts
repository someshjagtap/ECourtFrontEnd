import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HearingDTO } from '@shared/model/hearingDTO';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  isSaving: boolean;
  detail: HearingDTO;
  search: any = {};
  crudOperation: any;

  constructor(
    // private dateAdapter: DateAdapter<any>,
    // private translate: TranslateService,
    // public lookupService: LookupService,
    // public operationService: OperationsService,
    // public helperService: HelperService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    // private router: Router,
    // private auth: AuthService,
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

  // save(): void {
  //   this.isSaving = true;
  //   if (this.detail.id !== undefined) {
  //     this.subscribeToSaveResponse(this.operationService.updateCase(this.detail));
  //   } else {
  //     this.subscribeToSaveResponse(this.operationService.createCase(this.detail));
  //   }
  // }

  // protected subscribeToSaveResponse(result: Observable<HttpResponse<HearingDTO>>): void {
  //   result.subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }

  // protected onSaveSuccess(): void {
  //   this.isSaving = false;
  //   this.helperService.showSuccess('Success');
  //   this.previousState();
  // }

  previousState(): void {
    this.location.back();
  }

  // private onSaveError() {
  //   this.isSaving = false;
  // }

}
