import { Component, Input, OnInit } from '@angular/core';

import {
  CityDTO,
  DistrictDTO,
  HospitalTypeDTO,
  MunicipalCorpDTO,
  StateDTO,
  TalukaDTO,
} from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditFormSHospGenInfoDTO } from '@shared/model/auditFormSHospGenInfoDTO';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuthService } from '@core';


@Component({
  selector: 'app-form-s',
  templateUrl: './form-s.component.html',
  styleUrls: ['./form-s.component.scss'],
})
export class FormSComponent implements OnInit {

  detail: AuditFormSHospGenInfoDTO;
  cityList: CityDTO[];
  districtList: DistrictDTO[];
  talukaList: TalukaDTO[];
  municipalCorpList: MunicipalCorpDTO[];
  hospitalTypeList: HospitalTypeDTO[];
  stateList: StateDTO[];
  isSaving = true;
  hasDone=false;
  isLoading = true;
  suppliers: any[] = [];
  @Input() search: any;
  @Input() crudOperation: String;
  auditDTO: AuditDTO;

  formName: any;
  type: any;

  constructor(
    public lookupService: LookupService,
    public helperService: HelperService,
    public operationService: OperationsService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    private auditService: AuditService,
    private router: Router,
    private auth: AuthService
  ) {

    this.auditDTO = this.auditService.getSelectedAudit();


  }

  save() {

    this.isSaving = false;
    if (this.detail.id == null) {

      if (this.detail.formName == null && this.detail.type == null ) {
        this.detail.formName = this.formName;
        this.detail.type = this.type;
      }

      this.subscribeToSaveResponse(this.operationService.createAudit(this.detail));

      this.updateAuditStatusToProgress();
    } else {

      this.subscribeToSaveResponse(this.operationService.updateAudit(this.detail));

    }
  }

  ngOnInit() {


    if(this.auditDTO==null)
    {
      this.router.navigateByUrl('/public/startaudit');
    }

    if (this.search['auditId.equals'] == null) {
      this.search['auditId.equals'] = this.auditDTO.id;
    }

    this.formName = this.search["formName.contains"];

    console.info(":::::::::::::::::+formName" + this.formName);

    // this.lookupService.queryHospitalType().subscribe((type: HttpResponse<HospitalTypeDTO[]>) => {
    //   this.hospitalTypeList = type.body;
    //   this.isLoading=false;

    // });


    if (this.search != null && this.search['rowData']) {
      this.detail = this.search['rowData'];
    } else {
      this.detail = {
        auditId: this.auditDTO.id,
        availableCylinderTypeB: undefined,
        availableCylinderTypeD7: undefined,
        availableLMOCapacityKL: undefined,
        cylinderAgencyAddress: undefined,
        cylinderAgencyName: undefined,
        formName: this.formName,
        freeField1: undefined,
        freeField2: undefined,
        freeField3: undefined,
        freeField4: undefined,
        hospAddress: undefined,
        hospName: this.auditDTO.hospName,
        hospPhoneNo: undefined,
        hospType: undefined,
        icuBeds: undefined,
        id: undefined,
        inchargeName: undefined,
        jumboSystemInstalledType: undefined,
        lastLmoSuppliedQuantity: undefined,
        lastModified: new Date(),
        lastModifiedBy: this.auth.user.name,
        lmoSupplierFrequency: undefined,
        lmoSupplierName: undefined,
        normalBeds: undefined,
        onCylinderPatient: undefined,
        onIntubated: undefined,
        onNIV: undefined,
        onPipedBedsPatient: undefined,
        oxygenBeds: undefined,
        remark: undefined,
        subType: undefined,
        type: undefined,
        ventilatorBeds: undefined,
      };
    }

  }
  handleEvent(): void {
    throw new Error('Method not implemented.');
  }


  addSuppliers(suppliers: any) {
    this.suppliers = suppliers;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<AuditFormSHospGenInfoDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = true;
    this.hasDone=true;
    this.isLoading=false;
    this.helperService.showSuccess('Hospital Information Saved Successfully.');

  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
    this.isLoading=false;
    this.hasDone=false;
  }

  updateAuditStatusToProgress(){
    console.log("this.search : "+this.search["formName.contains"]);
    if (this.search["formName.contains"] == "Form A"){
      this.auditDTO.isForm1Status="INPROGRESS";
    }else{
      this.auditDTO.isFormSStatus="INPROGRESS";
    }
    this.auditDTO.auditStatus="INPROGRESS";

    this.operationService.updateAuditStatus(this.auditDTO)
      .subscribe(res => {
      })
  }
}
