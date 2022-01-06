import { Component, Inject, OnInit,Input } from '@angular/core';
import { HospitalDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditDTO } from '@shared/model/AuditDTO';
import { FormGroup } from '@angular/forms';
import { AuditService } from '@shared/services/audit.service';
import { FormBDTO } from '@shared/model/FormBDTO';
import { RateRegulationDTO } from '@shared/model/RateRegulationDTO';
import { Router } from '@angular/router';
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
  maxDate = new Date().toISOString();
  action: string;
  isSaving = false;


  listLOV: HospitalDTO[];
  auditDTO: AuditDTO;
  formoneB: FormBDTO;
  regulation:RateRegulationDTO;



  constructor(
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    private auditService:AuditService,
    private auth: AuthService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<CreateComponent>
  ) {

    this.auditDTO=this.auditService.getSelectedAudit();

  }

  ngOnInit() {

    if(this.auditDTO==null)
    {
      this.router.navigateByUrl('/public/startaudit');
    }

    this.regulation = {
      auditId: this.auditDTO.id,
      submissionDate: undefined,
    totalNumCovidIsoBeds: null,
    eightyIsoBedsUnderRegulation: null,
    totalNumCovidPatientAdmitted: null,
    patientAdmitAgainstEightyIsoBeds: null,
    patientsDischargedAgainstEightyIsoBeds: null,
    patientsRcvdRegularisedBill: null,
    patientsNotRcvdRegularisedBill: null,
    patientReceivedRevisedBills: null,
    patientReceivedReimbursement: null,
    totalAmountReimbursed: null,
    numPatientsReceivedReimbursment: null,
    amountReimbursed: null,
    amountNotReimbursed: null,
    auditorRemark: undefined,
    // complianceStatus: undefined,
    freeField1: undefined,
    freeField2: undefined,
    freeField3: undefined,
    freeField4: undefined,
    //id: null,
    lastModified: undefined,
    lastModifiedBy: this.auth.user.name,

    };
  }

  onSearchChange(searchValue: number) {
  return this.regulation.eightyIsoBedsUnderRegulation =(this.regulation.totalNumCovidIsoBeds*80)/100;
  }
  onSearchChangee(searchValue: number) {
    this.regulation.patientAdmitAgainstEightyIsoBeds= (this.regulation.totalNumCovidPatientAdmitted*80)/100;
 }
 onSearchChang(searchValue: number) {
  this.regulation.patientsNotRcvdRegularisedBill= (this.regulation.patientsRcvdRegularisedBill-this.regulation.patientsDischargedAgainstEightyIsoBeds);
}
onSearchChangeee(searchValue: number){
  this.regulation.amountNotReimbursed=(this.regulation.totalAmountReimbursed-this.regulation.amountReimbursed);
}
  save() {

    this.submitted = true;
   //  this.regulation.eightyIsoBedsUnderRegulation =(this.regulation.totalNumCovidIsoBeds*80)/100;
   // this.regulation.patientAdmitAgainstEightyIsoBeds= (this.regulation.totalNumCovidPatientAdmitted*80)/100;
    //this.regulation.amountNotReimbursed=(this.regulation.totalAmountReimbursed-this.regulation.amountReimbursed);
   // this.regulation.patientsNotRcvdRegularisedBill= (this.regulation.patientsRcvdRegularisedBill-this.regulation.patientsDischargedAgainstEightyIsoBeds);


    //console.log("-------------------------------"+JSON.stringify(this.monitor));

   this.subscribeToSaveResponse(this.operationService.createRateRegulationForm(this.regulation));
  }

  protected subscribeToSaveResponse(
     result: Observable<HttpResponse<RateRegulationDTO>>
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
