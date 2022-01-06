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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  columns: MtxGridColumn[] = [];
  search: any = {};
  today = new Date();
  list = [];
  isLoading = true;
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,asc' };

  cityList: CityDTO[];
  districtList: DistrictDTO[];
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
  @Input() readOnly: boolean;
  hasUserAllowedUpdateAudit: boolean;
  hasAuditDoneForThisForm: boolean = false;
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

    if (this.auditDTO != null && (this.auditDTO.auditStatus == "COMPLETED" || this.auditDTO.auditStatus == "INREVIEW")) {
      this.hasAuditAvailabeForEdit = false;
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => this.listColumnsIntl());
    this.pageContext.itemsPerPage = ITEMS_PER_PAGE;
    this.pageContext.totalItems = ITEMS_PER_PAGE;
    //var incomingData = this.location.getState();
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
        header: this.translate.instant('hospital_list.audit_id'),
        field: 'auditId',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hospital_name'),
        field: 'hospName',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hospital_address'),
        field: 'hospAddress',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hosp_type'),
        field: 'hospType',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hosp_phone'),
        field: 'hospPhoneNo',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.incharge_name'),
        field: 'inchargeName',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.form_name'),
        field: 'formName',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      }
      // ,
      // {
      //   header: this.translate.instant('hospital_list.Status'),
      //   field: 'formStatus',
      //   sortable: true,
      //   minWidth: 100,
      //   showExpand: this.expandable,
      //   // pinned: 'left',
      // }
    ];

    this.isLoading = false;
  }

  async ngOnInit() {

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }

    // this.lookupService.queryDistrict().subscribe((resp: HttpResponse<DistrictDTO[]>) => {
    //   this.districtList = resp.body;
    //   this.setSelectedDistrictHospitalName();
    // });

    // this.lookupService.queryHospitalType().subscribe((res: HttpResponse<HospitalDTO[]>) => {
    //   this.hospitalTypeList = res.body;
    // });

    if (this.auditDTO != null && (this.auditDTO.auditStatus == "COMPLETED"
      || this.auditDTO.auditStatus == "INREVIEW"
      || this.auditDTO.isForm1Status == "COMPLETED")) {
      this.hasAuditAvailabeForEdit = false;
    }


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
    this.router.navigate(['/admin/hospital/view', id]);
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
    this.search["formName.contains"] = "Form A";
    this.search["auditId.equals"] = this.auditDTO.id;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;
    Common.removeEmptyFields(this.search);
    // this.lookupService.queryAnnexureABCGeneralInfo(this.search).subscribe((res: HttpResponse<AuditFormSHospGenInfoDTO[]>) => {
    //   const headers = res.headers;
    //   this.pageContext.totalItems = +headers.get('x-total-count');
    //   this.list = res.body;
    //   this.isLoading = false;

    //   if (this.list.length > 0) {
    //     this.hasAuditDoneForThisForm = true;
    //   }
    //   if (this.auditDTO != null && (this.auditDTO.auditStatus == "COMPLETED" || this.auditDTO.auditStatus == "INREVIEW")) {
    //     this.hasAuditDoneForThisForm = true;
    //   }

    // });
  }

  onSearch(reset) {
    if (reset) {
      this.search = {};
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
    this.router.navigateByUrl('/admin/audit-form-a/create');
  }

  view(data: any) {

    var payLoadData = {
      crudOperation: "view",
      data: data,
    };
    this.router.navigateByUrl('/admin/audit-form-a/view/' + data.id, {
      state: payLoadData,
    });
  }

  edit(data: any) {

    var payLoadData = {
      crudOperation: "edit",
      data: data,
    };

    this.router.navigateByUrl('/admin/audit-form-a/edit/' + data.id, {
      state: payLoadData,
    });
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

    this.auth.hasAnyAuthoritySub(['AUDIT_FORM_A_EDIT']).then(hasUserAllowedUpdateAudit => {

      this.hasUserAllowedUpdateAudit = hasUserAllowedUpdateAudit;
    });

    this.auth.hasAnyAuthoritySub(['AUDIT_FORM_A_READ']).then(isAllowed => {
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
              tooltip: 'View Form A',
              click: record => this.view(record),
            },
            {
              color: 'primary',
              type: 'icon',
              icon: 'edit',
              tooltip: 'Edit Form A',
              click: record => this.edit(record),
              iif: () => this.hasAuditAvailabeForEdit && this.hasUserAllowedUpdateAudit
            },

          ],

        });
    });
  }
}
