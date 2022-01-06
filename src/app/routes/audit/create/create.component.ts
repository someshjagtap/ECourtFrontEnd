import { Component, OnInit } from '@angular/core';
import { AuditSystemDTO, AuditTypeDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  detail: AuditSystemDTO;
  auditTypeLOV: AuditTypeDTO[];
  isSaving = false;

  constructor(
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    private router: Router,
    private location: Location,
    protected activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        this.detail = detail;
      } else {
        const incomingData: any = this.location.getState();
        if (incomingData != undefined) {
          this.detail = incomingData;
        }
      }
    });
  }

  ngOnInit() {
    // this.lookupService.queryAuditTypes().subscribe((resInv: HttpResponse<AuditTypeDTO[]>) => {
    //   this.auditTypeLOV = resInv.body;
    // });
  }
  save() {
    if (this.detail.id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.updateAuditSystem(this.detail));
    } else {
      this.subscribeToSaveResponse(this.operationService.createAuditSystem(this.detail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<AuditSystemDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      error => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError(error: any) {
    this.isSaving = false;
  }

  goToList() {
    this.router.navigate(['/admin/audit/list']);
  }

  delete(id) {
    this.subscribeToSaveResponse(this.operationService.deleteAuditSystem(id));
  }
}
