import { Component, Inject, OnInit,Input } from '@angular/core';
import { HospitalDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditDTO } from '@shared/model/AuditDTO';
import { patientMonitorFormAMDTO } from '@shared/model/patientMonitorFormAMDTO';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuditService } from '@shared/services/audit.service';
import { patientMonitorFormPMDTO } from '@shared/model/patientMonitorFormPMDTO';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-createevening',
  templateUrl: './createevening.component.html',
  styleUrls: ['./createevening.component.scss']
})
export class CreateeveningComponent implements OnInit {

 maxDate = new Date().toISOString();
  @Input() readOnly: Boolean;
  editForm: FormGroup;
  submitted = false;
  isSaving = false;
  //monitor: patientMonitorFormAMDTO;

  monitorpm:patientMonitorFormPMDTO;
  listLOV: HospitalDTO[];
  auditDTO: AuditDTO;


  constructor(
    // private formBuilder: FormBuilder,
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    private auditService:AuditService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateeveningComponent>
  ) {
    this.auditDTO=this.auditService.getSelectedAudit();

  }

  ngOnInit() {

    this.monitorpm = {
      auditId: this.auditDTO.id,
      bedNo: null,
      dateOfAdmission: undefined,
      drName: undefined,
      eightToTenPM: null,
      fourToSixAM: null,
      freeField1: undefined,
      freeField2: undefined,
      freeField3: undefined,
      freeField4: undefined,
      id: null,
      lastModified: new Date().toISOString(),
      lastModifiedBy: this.auth.user.name,
      nurseName: undefined,
      oxyEightToTenPM: null,
      oxyFourToSixAM: null,
      oxySixToEightPM: null,
      oxyTenToTwelvePM: null,
      oxyTwelveToTwoAM: null,
      oxyTwoToFourAM: null,
      oxygenType: undefined,
      patientName: undefined,
      sixToEightPM: null,
      tenToTwelvePM: null,
      twelveToTwoAM: null,
      twoToFourAM: null,
      wardNo: null
    };
  }

  save() {
 this.submitted = true;
 //console.log("-------------------------------"+JSON.stringify(this.monitor));
    this.subscribeToSaveResponse(this.operationService.createMonitorFormPM(this.monitorpm));
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<patientMonitorFormPMDTO>>
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
