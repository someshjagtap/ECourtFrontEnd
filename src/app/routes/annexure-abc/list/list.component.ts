import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { CityDTO, DistrictDTO, HospitalDTO, MunicipalCorpDTO, TalukaDTO } from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Observable } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { QuationariesAuditListDTO } from '@shared/model/QuationariesAuditListDTO';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';
import { Common } from '@shared/utils/common';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AnnexureABCListComponent implements OnInit {
  columns: MtxGridColumn[] = [];
  search: any = {};

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

  expandable: boolean;
  selectedDtrictName: String = '';
  municipalCorpList: MunicipalCorpDTO[];
  selectedDtrictId: number;
  auditDTO: AuditDTO;
  hasUserAllowedUpdateAudit: boolean;
  hasAuditDoneForThisForm: boolean = false;
  hasAuditAvailabeForEdit: boolean = true;

  constructor(
    public lookupService: LookupService,
    private router: Router,
    public helperService: HelperService,
    public operationService: OperationsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private auditService: AuditService,
    private auth: AuthService,

  ) {
    this.auditDTO = this.auditService.getSelectedAudit();


    this.translate.onLangChange.subscribe((event: LangChangeEvent) => this.listColumnsIntl());
    this.pageContext.itemsPerPage = ITEMS_PER_PAGE;
    this.pageContext.totalItems = ITEMS_PER_PAGE;

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
        field: 'hospitalName',
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
        header: this.translate.instant('hospital_list.form_name'),
        field: 'formName',
        sortable: true,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

    ];

    this.isLoading = false;
  }

  async ngOnInit() {

    if (this.auditDTO != null
      && (this.auditDTO.auditStatus == "COMPLETED"
        || this.auditDTO.auditStatus == "INREVIEW"
        || this.auditDTO.isAnnexureStatus == "INREVIEW")) {
      this.hasAuditAvailabeForEdit = false;

    }

    // this.lookupService.queryHospitalsById({"id.equals":this.auditDTO.hospitalId}).subscribe((res: HttpResponse<HospitalDTO[]>) => {
    //   this.hospitalDetails = res.body;
    // });

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }

    if (this.search['auditId.equals'] == null) {
      this.search['auditId.equals'] = this.auditDTO.id;
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
    //this.location.back();
    this.router.navigateByUrl('/public/startaudit');
  }

  private onSaveError() {
    this.isSaving = false;
  }

  queryData() {
    this.isLoading = true;
    this.search['formName.contains'] = 'AnnexureABC';
    this.search['auditId.equals'] = this.auditDTO.id;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    Common.removeEmptyFields(this.search);
    // this.lookupService
    //   .getAllAnnexureAnswersForAudit(this.search)
    //   .subscribe((res: HttpResponse<QuationariesAuditListDTO[]>) => {
    //     const headers = res.headers;
    //     this.pageContext.totalItems = +headers.get('x-total-count');

    //     if(res.body != null && res.body.length >0){
    //       // this.list = res.body;
    //        let tempList:QuationariesAuditListDTO[] = [];
    //       res.body.forEach(element => {
    //         element.hospAddress = this.hospitalDetails[0].address1;
    //         tempList.push(element);
    //       });
    //       this.list = tempList;
    //     }



    //     this.isLoading = false;
    //     if (this.list.length > 0) {
    //       this.hasAuditDoneForThisForm = true;
    //     }
    //     if (this.auditDTO != null && (this.auditDTO.isAnnexureStatus == "INREVIEW"
    //      || this.auditDTO.isAnnexureStatus == "COMPLETED"
    //      || this.auditDTO.auditStatus == "COMPLETED"
    //      || this.auditDTO.auditStatus == "INREVIEW")) {
    //       this.hasAuditDoneForThisForm = true;

    //     }
    //   });
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
    this.router.navigateByUrl('/admin/annexure-abc/create');
  }

  view(data: any) {
    var payLoadData = {
      crudOperation: 'view',
      data: data,
    };
    this.router.navigateByUrl('/admin/annexure-abc/view/' + data.auditId, {
      state: payLoadData,
    });
  }

  edit(data) {
    var payLoadData = {
      crudOperation: 'edit',
      data: data,
    };
    this.router.navigateByUrl('/admin/annexure-abc/edit/' + data.auditId, {
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
    // this.auth.hasAnyAuthoritySub(['AUDIT_FORM_EDIT']).then(hasUserAllowedUpdateAudit => {
    //   this.hasUserAllowedUpdateAudit = hasUserAllowedUpdateAudit;
    // });

    // this.auth.hasAnyAuthoritySub(['AUDIT_FORM_READ']).then(isAllowed => {
      // if (isAllowed) {
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
              tooltip: 'View AnnexureABC',
              click: record => this.view(record),
            },
            {
              color: 'primary',
              type: 'icon',
              icon: 'edit',
              tooltip: 'Edit Annexure ABC',
              click: record => this.edit(record),
              // iif: () => this.hasAuditAvailabeForEdit && this.hasUserAllowedUpdateAudit,
            },
          ],
        });
      // }
    // });
  }
}
