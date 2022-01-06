import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import {
  SupplierDTO,
  CityDTO,
  TalukaDTO,
  DistrictDTO,
  StateDTO,
  InventoryTypeDTO,
} from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';
import { MtxDialog } from '@ng-matero/extensions';
import { SubmitComponent } from '../submit/submit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class FormSCreateComponent implements OnInit {
  detail: SupplierDTO;
  cityList: CityDTO[];
  talukaList: TalukaDTO[];
  districtList: DistrictDTO[];
  inventoryTypeLOV: InventoryTypeDTO[];
  stateList: StateDTO[];
  isSaving = false;
  disable: boolean = false;
  crudOperation: any;
  search: any = {};
  auditDTO: AuditDTO;


  constructor(
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private auditService:AuditService,
    private mtxDialog: MtxDialog
  ) {

    this.auditDTO=this.auditService.getSelectedAudit();
  }

  ngOnInit() {



    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        this.detail = detail;
        if (this.detail.districtId) {
          this.search['districtId.equals'] = this.detail.districtId;
          // this.lookupService
          //   .queryTaluka({ 'districtId.equals': this.detail.districtId })
          //   .subscribe((res: HttpResponse<TalukaDTO[]>) => {
          //     this.talukaList = res.body;
          //   });
        }

        if (this.detail.talukaId) {
          this.search['talukaId.equals'] = this.detail.talukaId;
          // this.lookupService
          //   .queryCity({ 'talukaId.equals': this.detail.talukaId })
          //   .subscribe((res: HttpResponse<CityDTO[]>) => {
          //     this.cityList = res.body;
          //   });
        }
      } else {
        this.detail = {
          statusInd: SupplierDTO.StatusIndEnum.A,
          supplierType: this.search['supplierType.equals']
        };
      }

    });

  }

  save() {



  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<SupplierDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  delete(id) {
    this.subscribeToSaveResponse(this.operationService.deleteSupplier(id));
  }

  selectedDistrict(value: string) {
    this.detail.districtId = this.search[value];
    // this.lookupService
    //   .queryTaluka({ 'districtId.equals': this.detail.districtId })
    //   .subscribe((res: HttpResponse<TalukaDTO[]>) => {
    //     this.talukaList = res.body;
    //   });
  }

  selectedTaluka(value: string) {
    this.detail.talukaId = this.search[value];
    // this.lookupService
    //   .queryCity({ 'talukaId.equals': this.search[value] })
    //   .subscribe((res: HttpResponse<CityDTO[]>) => {
    //     this.cityList = res.body;
    //   });
  }

  selectedCity(value: string) {
    this.detail.cityId = this.search[value];
  }

  deletObj(value: string) {
    delete this.search[value];
  }

  onSubmit(form: NgForm): void {
    return;
  }

  // onClick(form: NgForm): void {
  //   const json = JSON.stringify(form.value);
  //  // this.open()

  //  // console.log(json);
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
