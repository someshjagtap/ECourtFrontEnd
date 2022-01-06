import { Component, Inject, OnInit,Input } from '@angular/core';
import { HospitalDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditDTO } from '@shared/model/AuditDTO';
//import { AuditPatientMonitoringFormDTO } from '@shared/model/AuditPatientMonitoringFormDTO';
import { patientMonitorFormAMDTO } from '@shared/model/patientMonitorFormAMDTO';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuditService } from '@shared/services/audit.service';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  maxDate = new Date().toISOString();
  @Input() readOnly: Boolean;
  editForm: FormGroup;
  submitted = false;

  action: string;
  isSaving = false;
  monitor: patientMonitorFormAMDTO;
  listLOV: HospitalDTO[];
  auditDTO: AuditDTO;


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
    this.monitor = {
      auditId: this.auditDTO.id,
      bedNo: undefined,
      dateOfAdmission: undefined,
      drName: undefined,
      eightToTenAM: null,
      eightToTenPM: null,
      fourToSixAM: null,
      fourToSixPM: null,
      freeField1: undefined,
      freeField2: undefined,
      freeField3: undefined,
      freeField4: undefined,
      lastModified: new Date().toISOString(),
      lastModifiedBy: this.auth.user.name,
      nurseName: undefined,
      oxyEightToTenAM: null,
      oxyEightToTenPM: null,
      oxyFourToSixAM: null,
      oxyFourToSixPM: null,
      oxySixToEightAM: null,
      oxySixToEightPM: null,
      oxyTenToTwelveAM: null,
      oxyTenToTwelvePM: null,
      oxyTwelveToTowPM: null,
      oxyTwelveToTwoAM: null,
      oxyTwoToFourAM: null,
      oxyTwoToFourPM: null,
      oxygenType: undefined,
      patientName: undefined,
      sixToEightAM: null,
      sixToEightPM: null,
      tenToTwelveAM: null,
      tenToTwelvePM: null,
      twelveToTowPM: null,
      twelveToTwoAM: null,
      twoToFourAM: null,
      twoToFourPM: null,
      wardNo: null,
    };
  }

  save() {
 this.submitted = true;
 //console.log("-------------------------------"+JSON.stringify(this.monitor));
    this.subscribeToSaveResponse(this.operationService.createMonitorForm(this.monitor));
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<patientMonitorFormAMDTO>>
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
