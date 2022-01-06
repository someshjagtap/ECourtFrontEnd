import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { HospitalDTO, UserDTO } from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuthService } from '@core/authentication/auth.service';
import { tap, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { caseDTO } from '@shared/model/caseDTO';

@Component({
  selector: 'app-create-audit',
  templateUrl: './create-audit.component.html',
  styleUrls: ['./create-audit.component.scss']
})
export class CreateAuditComponent implements OnInit {
  // detail: AuditDTO;
  // isSaving = false;
  // listLOV: HospitalDTO[];
  // loading = false;
  // today = new Date();
  // tomorrow = new Date(this.today.getTime() + (1000 * 60 * 60 * 24)) ;
  // user: UserDTO;
  // selectedHospitalName: string;
  // selectedHospId: number;
  // selectedHospAddress: string;

  // search: any;
  // selectedDtrictName: string;
  // selectedDtrictId: number;
  // filteredDistrictList: any;



  // constructor(
  //   public lookupService: LookupService,
  //   public operationService: OperationsService,
  //   private auth: AuthService,
  //   private cdr: ChangeDetectorRef,
  //   public helperService: HelperService,
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   public dialogRef: MatDialogRef<CreateAuditComponent>) {

  // }

  // ngOnInit() {

  //   this.auth
  //     .user()
  //     .pipe(
  //       tap(user => {
  //         this.user = user
  //       }),
  //       debounceTime(10)
  //     )
  //     .subscribe(() => this.cdr.detectChanges());

  //   if (this.data != null) {
  //     this.detail = this.data["data"];

  //     this.lookupService.queryHospitals({ 'id.equals': this.detail.hospitalId }).subscribe(data => {
  //       this.listLOV = data.body;
  //       this.loading = false;

  //       this.listLOV.forEach(element => {
  //         this.selectedHospitalName = element.name;
  //         this.selectedHospId = element.id;
  //         this.selectedHospAddress = element.address1;
  //       });

  //     });

  //   } else {
  //     this.detail = {
  //       auditDate: new Date(),
  //       freeField1: undefined,
  //       freeField2: undefined,
  //       freeField3: undefined,
  //       freeField4: undefined,
  //       hospitalId: undefined,
  //       hospName: undefined,
  //       id: undefined,
  //       isAuditComplete: false,
  //       lastModified: new Date(),
  //       lastModifiedBy: undefined,
  //       remark: undefined,
  //       auditStatus: "CREATED",
  //       noOfDeficienciesFound: 0,
  //       noOfDeficienciesCompleted: 0,
  //       isRateRegulationStatus: "CREATED",
  //       isOxygenMonitoringStatus: "CREATED",
  //       isAnnexureStatus: "CREATED",
  //       isForm1Status: "CREATED",
  //       isForm2Status: "CREATED",
  //       isFormSStatus: "CREATED"

  //     };
  //   }



  // }

  // save() {

  //   this.isSaving = false;

  //   if (this.detail.hospitalId != null) {

  //     this.listLOV.forEach(element => {
  //       if (element.id == this.detail.hospitalId) {
  //         this.detail.hospName = element.name;
  //         this.detail.hospAddress = element.address1 + ", " + element.districtName;
  //       }
  //     });

  //     this.detail.lastModified = this.detail.auditDate;
  //     this.detail.lastModifiedBy = this.user != null ? this.user.firstName + " " + this.user.lastName : "admin";
  //     if (this.detail.id != null) {

  //       if (this.detail.auditStatus == "COMPLETED" ||
  //         this.detail.auditStatus == "INREVIEW" ||
  //         this.detail.auditStatus == "DEFECIENCIES") {
  //         this.detail.isOxygenMonitoringStatus = this.detail.auditStatus;
  //         this.detail.isRateRegulationStatus = this.detail.auditStatus;
  //         this.detail.isFormSStatus = this.detail.auditStatus;
  //         this.detail.isForm1Status = this.detail.auditStatus;
  //         this.detail.isForm2Status = this.detail.auditStatus;
  //         this.detail.isAnnexureStatus = this.detail.auditStatus;
  //       }

  //       if (this.detail.noOfDeficienciesFound < this.detail.noOfDeficienciesCompleted) {

  //         this.helperService.showErrorMessage('No of deficiencies completed should not be gretter than no of deficiencies found.');

  //       } else {
  //         this.subscribeToSaveResponse(this.operationService.updateAuditDetails(this.detail));
  //       }

  //     } else {
  //       let dt = new Date(this.detail.auditDate);
  //       this.detail.auditDate = new Date(dt.getTime() + (1000 * 60 * 60 * 24));
  //       this.subscribeToSaveResponse(this.operationService.createAuditDetails(this.detail));
  //     }


  //   } else {
  //     this.helperService.showErrorMessage('Please select hospital first');
  //   }
  // }

  // protected subscribeToSaveResponse(result: Observable<HttpResponse<AuditDTO>>): void {
  //   result.subscribe(
  //     () => this.onSaveSuccess(),
  //     error => this.onSaveError(error)
  //   );
  // }


  // searchHospitals(search) {
  //   this.loading = true;
  //   this.lookupService.queryHospitals({ 'name.contains': search.term }).subscribe(data => {
  //     this.listLOV = data.body;
  //     this.loading = false;
  //   });
  // }
  // protected onSaveSuccess(): void {

  //   this.helperService.showSuccess('Audit Updated Successfully.');
  //   this.isSaving = false;
  //   this.previousState();
  // }

  // previousState(): void {
  //   this.dialogRef.close();
  // }

  // private onSaveError(error: any) {
  //   this.helperService.showError('Unable to Update record!!.');
  //   this.isSaving = false;
  //   this.helperService.showError(error);
  // }


  // setSelectedHospitalName() {
  //   this.listLOV.forEach(element => {
  //     if (element.id == this.search['districtId.equals']) {
  //       this.selectedDtrictName = element.name;
  //       this.selectedDtrictId = element.id;
  //       this.filteredDistrictList.push(element);
  //     }
  //   });
  // }

  detail: caseDTO;
  loading = false;
  isSaving = false;
  listLOV: HospitalDTO[];
  user: UserDTO;
  selectedHospitalName: string;
  selectedHospId: number;
  selectedHospAddress: string;

  constructor(
    public lookupService: LookupService,
    public operationService: OperationsService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    public helperService: HelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateAuditComponent>) {
  }

  ngOnInit() {
    this.auth
      .user()
      .pipe(
        tap(user => {
          this.user = user
        }),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());

    if (this.data != null) {
      this.detail = this.data["data"];

      // this.lookupService.queryHospitals({ 'id.equals': this.detail.id }).subscribe(data => {
      //   this.listLOV = data.body;
      //   this.loading = false;

      //   this.listLOV.forEach(element => {
      //     this.selectedHospitalName = element.name;
      //     this.selectedHospId = element.id;
      //     this.selectedHospAddress = element.address1;
      //   });
      // });
    } else {
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
        caseFilingDate: undefined,
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
        villageName: undefined,
      };
    }
  }


  save() {

      // this.isSaving = false;

      // if (this.detail.hospitalId != null) {

      //   this.listLOV.forEach(element => {
      //     if (element.id == this.detail.hospitalId) {
      //       this.detail.hospName = element.name;
      //       this.detail.hospAddress = element.address1 + ", " + element.districtName;
      //     }
      //   });

      //   this.detail.lastModified = this.detail.auditDate;
      //   this.detail.lastModifiedBy = this.user != null ? this.user.firstName + " " + this.user.lastName : "admin";
      //   if (this.detail.id != null) {

      //     if (this.detail.auditStatus == "COMPLETED" ||
      //       this.detail.auditStatus == "INREVIEW" ||
      //       this.detail.auditStatus == "DEFECIENCIES") {
      //       this.detail.isOxygenMonitoringStatus = this.detail.auditStatus;
      //       this.detail.isRateRegulationStatus = this.detail.auditStatus;
      //       this.detail.isFormSStatus = this.detail.auditStatus;
      //       this.detail.isForm1Status = this.detail.auditStatus;
      //       this.detail.isForm2Status = this.detail.auditStatus;
      //       this.detail.isAnnexureStatus = this.detail.auditStatus;
      //     }

      //     if (this.detail.noOfDeficienciesFound < this.detail.noOfDeficienciesCompleted) {

      //       this.helperService.showErrorMessage('No of deficiencies completed should not be gretter than no of deficiencies found.');

      //     } else {
      //       this.subscribeToSaveResponse(this.operationService.updateAuditDetails(this.detail));
      //     }

      //   } else {
      //     let dt = new Date(this.detail.auditDate);
      //     this.detail.auditDate = new Date(dt.getTime() + (1000 * 60 * 60 * 24));
      //     this.subscribeToSaveResponse(this.operationService.createAuditDetails(this.detail));
      //   }


      // } else {
      //   this.helperService.showErrorMessage('Please select hospital first');
      // }

      this.isSaving = false;
      if (this.detail.id !== undefined) {
        this.subscribeToSaveResponse(this.operationService.updateCase(this.detail));
      } else {
        this.subscribeToSaveResponse(this.operationService.createCase(this.detail));
      }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<caseDTO>>): void {
        result.subscribe(
          () => this.onSaveSuccess(),
          error => this.onSaveError(error)
        );
      }


      searchHospitals(search) {
        this.loading = true;
        // this.lookupService.queryHospitals({ 'name.contains': search.term }).subscribe(data => {
        //   this.listLOV = data.body;
        //   this.loading = false;
        // });
      }
      protected onSaveSuccess(): void {

        this.helperService.showSuccess('Case Saved Successfully.');
        this.isSaving = false;
        this.previousState();
      }

      previousState(): void {
        this.dialogRef.close();
      }

      private onSaveError(error: any) {
        this.helperService.showError('Unable to Update record!!.');
        this.isSaving = false;
        this.helperService.showError(error);
      }


      // setSelectedHospitalName() {
      //   this.listLOV.forEach(element => {
      //     if (element.id == this.search['districtId.equals']) {
      //       this.selectedDtrictName = element.name;
      //       this.selectedDtrictId = element.id;
      //       this.filteredDistrictList.push(element);
      //     }
      //   });
      // }

}
