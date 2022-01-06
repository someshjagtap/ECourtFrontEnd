import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import {
  BedTypeDTO,
  CityDTO,
  DistrictDTO,
  HospitalDTO,
  MunicipalCorpDTO,
  TalukaDTO,
} from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { Common } from '@shared/utils/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuditFormSHospGenInfoDTO } from '@shared/model/auditFormSHospGenInfoDTO';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class FormSListComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.instant('hospital_list.hospital_name'),
      field: 'hospName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: this.translate.instant('Audit Id'),
      field: 'auditId',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Audit Date",
      field: 'auditDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    }


  ];


  search: any = {};
  @Input() readOnly: boolean;
  list = [];
  isLoading = true;
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,asc' };

  cityList: CityDTO[];
  districtList: DistrictDTO[];
  inchargeNameList: any;
  filteredDistrictList: DistrictDTO[] = [];
  talukaList: TalukaDTO[];
  hospitalDetails: HospitalDTO[];
  hospitalTypeList: HospitalDTO[];
  isSaving = false;
  supplier: HospitalDTO;

  bedTypesLOV: BedTypeDTO[];

  expandable: boolean;
  selectedDtrictName: String = '';
  municipalCorpList: MunicipalCorpDTO[];
  selectedDtrictId: number;
  auditDTO: AuditDTO;
  hasUserAllowedUpdateAudit: boolean;
  hasAuditDoneForThisForm: boolean;
  hasAuditAvailabeForEdit: boolean = true;

  constructor(
    public lookupService: LookupService,
    private router: Router,
    public helperService: HelperService,
    private location: Location,
    public operationService: OperationsService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private auditService: AuditService
  ) {

    this.auditDTO = this.auditService.getSelectedAudit();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => this.listColumnsIntl());
    this.pageContext.itemsPerPage = ITEMS_PER_PAGE;
    this.pageContext.totalItems = ITEMS_PER_PAGE;
    var incomingData = this.location.getState();
    this.expandable = false;

    this.route.data.subscribe(data => {
      if (data.expandable != null) {
        this.expandable = data.expandable;
        this.pageContext.itemsPerPage = data.size;
      }
    });
  }

  listColumnsIntl() {
    this.isLoading = true;
    this.columns = [
      {
        header: this.translate.instant('Audit Id'),
        field: 'auditId',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hospital_name'),
        field: 'hospName',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('Hospital Address'),
        field: 'hospAddress',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('Hospital Type'),
        field: 'hospType',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('Hospital Phone'),
        field: 'hospPhoneNo',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('Incharge Name'),
        field: 'inchargeName',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('Form Name'),
        field: 'formName',
        sortable: true,
        minWidth: 100,
        showExpand: false,
        // pinned: 'left',
      }


    ];

    // this.bedTypesLOV.forEach(bedtype => {
    //   this.columns.push({
    //     header: this.translate.instant(bedtype.name),
    //     field: 'bed' + bedtype.id,
    //     hide: false,
    //     minWidth: 100,
    //     formatter: (data: any) => {
    //       var temp = 'bed' + bedtype.id;
    //       if (data[temp] != null) {
    //         return '' + data['bed' + bedtype.id].available + '/' + data['bed' + bedtype.id].total;
    //       } else {
    //         return '0/0';
    //       }
    //     },
    //   });
    // });
    this.isLoading = false;
  }

  async ngOnInit() {

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }

    if (this.auditDTO != null && (this.auditDTO.auditStatus == "COMPLETED" || this.auditDTO.auditStatus == "INREVIEW")) {
      this.hasAuditAvailabeForEdit = false;
    }

    // this.lookupService.queryDistrict().subscribe((resp: HttpResponse<DistrictDTO[]>) => {
    //   this.districtList = resp.body;
    //   this.setSelectedDistrictHospitalName();
    // });

    // this.lookupService.queryHospitalType().subscribe((res: HttpResponse<HospitalDTO[]>) => {
    //   this.hospitalTypeList = res.body;
    // });

    this.listColumnsIntl();

    this.operationsColumns();

    this.queryData();
  }

  resetCalculation() {
    this.bedTypesLOV.forEach(bedtype => {
      bedtype.total = 0;
      bedtype.available = 0;
    });
  }

  gotoView(id: number) {
    this.router.navigate(['/admin/audit-form-s/create', id]);
  }

  gotoCreate(id: any) {
    this.router.navigate(['/admin/hospital/edit', id]);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<HospitalDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  selectedDistrict(event: any) {
    // this.lookupService.queryDistrict().subscribe((resp: HttpResponse<DistrictDTO[]>) => {
    //   this.districtList = resp.body;
    // });
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.helperService.showSuccess('Success');
    this.queryData();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  queryData() {
    this.isLoading = true;
    this.search["formName.contains"] = "Form S";
    this.search["auditId.equals"] = this.auditDTO.id;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    Common.removeEmptyFields(this.search);
    // this.lookupService.queryAuditFormSGeneralInfoList(this.search).subscribe((res: HttpResponse<AuditFormSHospGenInfoDTO[]>) => {
    //   const headers = res.headers;
    //   this.pageContext.totalItems = +headers.get('x-total-count');
    //   this.list = res.body;
    //   this.isLoading = false;
    //   if (this.list.length > 0) {
    //     this.hasAuditDoneForThisForm = true;
    //   }
    //   if (this.auditDTO != null && (this.auditDTO.auditStatus == "COMPLETED" ||
    //     this.auditDTO.auditStatus == "INREVIEW" ||
    //     this.auditDTO.isFormSStatus == "INREVIEW"||
    //     this.auditDTO.isFormSStatus == "COMPLETED")) {
    //     this.hasAuditDoneForThisForm = true;
    //   }

    // });
  }

  onSearch(reset) {
    if (reset) {
      this.search = {};
      // if(this.selectedDtrictId)
      // {
      //   this.search['districtId.equals']=this.selectedDtrictId;
      // }
    }
    this.queryData();
    this.setSelectedDistrictHospitalName();
  }

  changeSort(e: any) {
    this.pageContext.sort = e.active + ',' + e.direction;
    this.pageContext.page = 0;
    this.queryData();
  }

  onPageChange(e: any) {
    this.pageContext.page = e.pageIndex;
    this.pageContext.previousPage = e.previousPageIndex;
    this.pageContext.itemsPerPage = e.pageSize;
    this.queryData();
  }

  add() {
    this.router.navigateByUrl('/admin/audit-form-s/create');
  }

  view(data: any) {

    var payLoadData = {
      crudOperation: "view",
      data: data,
    };
    this.router.navigateByUrl('/admin/audit-form-s/view/' + data.id, {
      state: payLoadData,
    });
  }

  edit(data: any) {
    var payLoadData = {
      crudOperation: 'edit',
      data: data,
    };

    this.router.navigateByUrl('/admin/audit-form-s/edit/' + data.id, {
      state: payLoadData,
    });
  }



  delete(value: any) {
    this.subscribeToSaveResponse(this.operationService.deleteHospital(value.id));
  }

  deletObj(value: string) {
    delete this.search[value];
  }

  setSelectedDistrictHospitalName() {
    this.districtList.forEach(element => {
      if (element.id == this.search['districtId.equals']) {
        this.selectedDtrictName = element.name;
        this.selectedDtrictId = element.id;
        this.filteredDistrictList.push(element);
      }
    });
  }

  changeSelect(e: any) { }

  goToInventory(hospital) {
    this.router.navigateByUrl('/admin/inventory/list', {
      state: { 'hospitalId.equals': hospital.id },
    });
  }

  goToAudit(data) {
    this.router.navigateByUrl('/admin/audit/hospital/' + data.id);
  }



  operationsColumns() {

    this.auth.hasAnyAuthoritySub(['AUDIT_FORM_EDIT']).then(hasUserAllowedUpdateAudit => {

      this.hasUserAllowedUpdateAudit = hasUserAllowedUpdateAudit;
    });

    this.auth.hasAnyAuthoritySub(['AUDIT_FORM_READ']).then(isAllowed => {
      if (isAllowed)
        this.columns.push({
          header: 'Operation',
          field: 'operation',
          minWidth: 100,
          pinned: 'right',
          type: 'button',
          buttons: [
            {
              color: 'accent',
              type: 'icon',
              icon: 'visibility',
              tooltip: 'View Form S',
              click: record => this.view(record),
            },
            {
              color: 'primary',
              type: 'icon',
              icon: 'edit',
              tooltip: 'Edit Form S',
              click: record => this.edit(record),
              iif: () => this.hasAuditAvailabeForEdit && this.hasUserAllowedUpdateAudit
            },

          ],

        });
    });
  }
}
