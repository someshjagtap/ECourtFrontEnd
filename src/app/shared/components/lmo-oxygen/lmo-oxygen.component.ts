import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import {
  CityDTO,
  DistrictDTO,
  HospitalTypeDTO,
  MunicipalCorpDTO,
  StateDTO,
  TalukaDTO,
  UserDTO,
} from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { FireElectricalAuditDTO } from '@shared/model/fireElectricalAuditDTO';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuditService } from '@shared/services/audit.service';

@Component({
  selector: 'app-lmo-oxygen',
  templateUrl: './lmo-oxygen.component.html',
  styleUrls: ['./lmo-oxygen.component.scss']
})
export class LmoOxygenComponent implements OnInit {
  // detail: HospitalDTO;
  formName: any;
  detail: FireElectricalAuditDTO;
  cityList: CityDTO[];
  districtList: DistrictDTO[];
  talukaList: TalukaDTO[];
  municipalCorpList: MunicipalCorpDTO[];
  hospitalTypeList: HospitalTypeDTO[];
  stateList: StateDTO[];
  isSaving = true;
  suppliers: any[] = [];
  @Input() search: any;
  @Input() crudOperation: String;
  today = new Date();
  auditDTO: AuditDTO;
  hasDone = false;
  isLoading = true;
  selected: string = 'yes';
  user: UserDTO;

  constructor(
    private router: Router,
    public lookupService: LookupService,
    public helperService: HelperService,
    public operationService: OperationsService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    private auditService: AuditService,
    private auth: AuthService
  ) {
    this.auditDTO = this.auditService.getSelectedAudit();
  }

  save() {

    this.isSaving = false;

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {

      if (this.detail.id != null) {

        this.subscribeToSaveResponse(this.operationService.updateLMO(this.detail));
      }
      else {
        this.subscribeToSaveResponse(this.operationService.createLMO(this.detail));
      }
    }
    else {
      this.subscribeToSaveResponse(this.operationService.createLMO(this.detail));
    }

  }

  ngOnInit() {

    this.user = this.auth.getUserDetails();

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }

    if (this.search['auditId.equals'] == null) {
      this.search['auditId.equals'] = this.auditDTO.id;
    }

    this.formName = this.search["formName.contains"];

    // this.lookupService.queryHospitalType().subscribe((type: HttpResponse<HospitalTypeDTO[]>) => {
    //   this.hospitalTypeList = type.body;
    // });

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {

      // this.lookupService.getfireelectricalaudits(this.search).subscribe((type: HttpResponse<FireElectricalAuditDTO[]>) => {

      //   if (type.body.length > 0) {
      //     this.detail = type.body[0];
      //     this.detail.fireAuditDoneOrnot = this.detail.fireAuditDoneOrnot ? "true" : "false"
      //     this.detail.technicalPersonAppoint = this.detail.technicalPersonAppoint ? "true" : "false"
      //     this.detail.monitoringO2ValvesPort = this.detail.monitoringO2ValvesPort ? "true" : "false"
      //     this.detail.portValvesShutDown = this.detail.portValvesShutDown ? "true" : "false"
      //     this.detail.idPatientDrillDone = this.detail.idPatientDrillDone ? "true" : "false"
      //     this.detail.staffCheckingLeakage = this.detail.staffCheckingLeakage ? "true" : "false"
      //     this.detail.patientO2ReqFinalized = this.detail.patientO2ReqFinalized ? "true" : "false"
      //     this.detail.isLightingInstalled = this.detail.isLightingInstalled ? "true" : "false"
      //     this.detail.electricalAuditDone = this.detail.electricalAuditDone ? "true" : "false"
      //   } else {
      //     this.detail = this.initWithDefaultValues();
      //   }



      // });
    } else {

      this.detail = this.initWithDefaultValues();
    }
  }
  initWithDefaultValues(): FireElectricalAuditDTO {

    return {
      auditId: this.auditDTO.id,
      electricalAuditDate: undefined,
      electricalAuditDone: false,
      electricalAuditInspection: undefined,
      electricalCorrectiveAction: undefined,
      electricalFaults: undefined,
      fireAuditDate: new Date(),
      fireAuditDoneOrnot: undefined,
      fireAuditPlan: undefined,
      fireCorrectiveAction: undefined,
      fireFaults: undefined,
      freeField1: this.search['formName.contains'],
      freeField2: undefined,
      freeField3: undefined,
      freeField4: undefined,
      idPatientDrillDone: false,
      isLightingInstalled: false,
      lastModified: new Date(),
      lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
      locLightningArrerstor: undefined,
      monitoringO2ValvesPort: false,
      o2HospProjectedRequirement: undefined,
      o2HospRequirement: undefined,
      patientO2ReqFinalized: false,
      portValvesShutDown: false,
      saveO2RequirementPossibleMT: undefined,
      staffCheckingLeakage: false,
      techPersonMobNo: undefined,
      techPersonname: undefined,
      technicalPersonAppoint: false,
      technicalEngineerAddress: undefined,
      technicalEngineerAlternateMob: undefined,
      technicalEngineerMob: undefined,
      technicalEngineerName: undefined,
    };
  }
  handleEvent(): void {
    throw new Error('Method not implemented.');
  }


  addSuppliers(suppliers: any) {
    this.suppliers = suppliers;
    //this.detail.suppliers = suppliers;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<FireElectricalAuditDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = true;
    this.hasDone = true;
    this.isLoading = false;
    this.helperService.showSuccess('LMO Saved Successfully');
    // this.previousState();
  }

  previousState(): void {
    // this.router.navigate(['/admin/hospital']);
    // window.history.back();
    // this.router.navigate(['/admin/hospital']);
    //this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
    this.isLoading = false;
    this.hasDone = false;
    this.helperService.showError('Unable to save record!!');
  }

}
