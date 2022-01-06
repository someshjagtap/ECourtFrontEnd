import { Component, Inject, OnInit,Input } from '@angular/core';
import { HospitalDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditDTO } from '@shared/model/AuditDTO';

import { FormGroup, FormBuilder } from '@angular/forms';
import { AuditService } from '@shared/services/audit.service';
import { FormBDTO } from '@shared/model/FormBDTO';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() readOnly: Boolean;
  editForm: FormGroup;
  submitted = false;


  isSaving = false;

  listLOV: HospitalDTO[];
  auditDTO: AuditDTO;
  formoneB: FormBDTO;


  constructor(
    private formBuilder: FormBuilder,
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    private auditService:AuditService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateComponent>
  ) {

    this.auditDTO=this.auditService.getSelectedAudit();
  }

  ngOnInit() {
    this.formoneB = {
      auditId:this.auditDTO.id,
      activeCovidPatientCount: undefined,
      numOfPatientsInhealthfacility: null,
      oxygenUtilisationForPatientsInhealthfacility: null,
      numOfpatientsInVentilator: null,
      oxygenUtilisationForPatientsInIcu: null,
      numOfPatientsOnHFNO: null,
      oxygenUtilisationOnHFNO: null,
      numVacentOxygenBeds: null,
      numVacentIcuBeds: null,
      numOfO2PatientsAdmitToday: null,
      numOfICUPatientsAdmitToday: null,
      numOfO2PatientsDischargeToday: null,
      numOfICUPatientsDischargeToday: null,
      averageNumOfDaysStayInHosp: null,
      numOfCovidDeathtoday: null,
      stepForRationalUseOfO2: undefined,
      remark: undefined,
       lastModified: null,
      // lastModifiedBy: undefined,
       // lastModified:  new Date().getDate(),
       lastModifiedBy: this.auth.user.name,
      freeField1: undefined,
      freeField2: undefined,
      freeField3: undefined,
      freeField4: undefined,
    };

  }



  save() {

    this.submitted = true;

    //console.log("-------------------------------"+JSON.stringify(this.monitor));

   this.subscribeToSaveResponse(this.operationService.createFormOneB(this.formoneB));
  }

  protected subscribeToSaveResponse(
     result: Observable<HttpResponse<FormBDTO>>
  ): void {
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
    this.dialogRef.close();
  }

  private onSaveError(error: any) {
    this.isSaving = false;
    this.helperService.showError(error);
  }
}
