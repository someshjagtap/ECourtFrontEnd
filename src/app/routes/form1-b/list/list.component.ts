import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
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
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CreateComponent } from '../create/create.component';
import { FormBDTO } from '@shared/model/FormBDTO';
import { AuditService } from '@shared/services/audit.service';

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
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,desc' };

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
  dataFromPreviousComp: { [k: string]: any; };
  data: any;
  auditId: any;


  constructor(
    public lookupService: LookupService,
    private router: Router,
    public helperService: HelperService,
    private location: Location,
    public operationService: OperationsService,
    private auth: AuthService,
    public dialog: MtxDialog,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private auditService: AuditService,
  ) {


    this.dataFromPreviousComp = this.router.getCurrentNavigation().extras.state;
    if (this.dataFromPreviousComp != null && this.dataFromPreviousComp["data"] != undefined) {

      console.log("In List dataFromPreviousComp:::::::::::::::::" + JSON.stringify(this.dataFromPreviousComp));
      this.data = this.dataFromPreviousComp["data"];
     }

     this.auditId=this.auditService.getSelectedAudit().id;

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
        header: this.translate.instant('hospital_list.active_CovidPtnt'),

        field: 'activeCovidPatientCount',
        sortable: false,
        minWidth: 0,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.num_Ptnt_hlthfty'),
        field: 'numOfPatientsInhealthfacility',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.oxy_Ut_pat_Inhlthfty'),
        // DTO Value
        field: 'oxygenUtilisationForPatientsInhealthfacility',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.num_patnts_Vntr'),
        field: 'numOfpatientsInVentilator',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.oxy_UtlstnPtntsInIcu'),
        field: 'oxygenUtilisationForPatientsInIcu',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.num_Ptnts_HFNO'),
        field: 'numOfPatientsOnHFNO',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.oxy_Ut_HFNO'),
        field: 'oxygenUtilisationOnHFNO',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.num_VactOxy_Beds'),
        field: 'numVacentOxygenBeds',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.num_VctIcuBeds'),
        field: 'numVacentIcuBeds',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.num_Of_O2_Pts_Admt_Tdy'),
        field: 'numOfO2PatientsAdmitToday',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.numOf_ICU_PAdtTdy'),
        field: 'numOfICUPatientsAdmitToday',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.num_OfO2_Ptnts_Dschrge_Tdy'),
        field: 'numOfO2PatientsDischargeToday',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.num_ICU_Ptnts_DschrgeTdy'),
        field: 'numOfICUPatientsDischargeToday',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.avg_Days_StyInHosp'),
        field: 'averageNumOfDaysStayInHosp',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.numOf_CvdDth_tody'),
        field: 'numOfCovidDeathtoday',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.stp_Fr_Rtnal_UseOfO2'),
        field: 'stepForRationalUseOfO2',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.rmrk'),
        field: 'remark',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
    ];

    this.isLoading = false;
  }

  async ngOnInit() {


    this.listColumnsIntl();

    //this.operationsColumns();

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
    //this.search["formName.contains"] = "Monitor Form";
    this.search["auditId.equals"] == this.auditId;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    // this.lookupService.queryFormOneB(this.search).subscribe((res: HttpResponse<FormBDTO[]>) => {
    //   const headers = res.headers;
    //   this.pageContext.totalItems = +headers.get('x-total-count');
    //   this.list = res.body;
    //   this.isLoading = false;
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

  add(data) {

    const dialogRef = this.dialog.originalOpen(CreateComponent, {
      width: '100%',
      height:'650px',
     disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      this.queryData();
    });

  }


  editbedInventory(data: any) {
    var payLoadData = {
      'hospitalId.equals': data.id,
      'crudOperation': 'Edit',
    };
    this.router.navigateByUrl('/admin/hospital/view/inventory', {
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
    // this.auth.hasAnyAuthoritySub(['HOSPITAL_EDIT']).then(isAllowed => {
    // if (isAllowed)
    this.columns.push({
      header: 'Operation',
      field: 'operation',
      minWidth: 100,
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'visibility',
          tooltip: 'View Form A',
          click: record => this.add(record),
        },
        // {
        //     color: 'warn',
        //     icon: 'delete',
        //     text: 'Please cofirm delete.',
        //     tooltip: 'Please confirm',
        //     pop: true,
        //     popTitle: 'Confirm delete?',
        //     popCloseText: 'No',
        //     popOkText: 'Yes',
        //     click: record => this.delete(record),
        // },
        // {
        //   type: 'basic',
        //   icon: 'format_indent_increase',
        //   text:"Audit",
        //   tooltip: 'Audit Management',
        //   click: record => this.goToAudit(record),
        //   iif: (record: any) =>
        //     this.auth.hasAccess('DISTRICT', record.districtId) ||
        //     this.auth.hasAccess('STATE', record.stateId),
        // },
      ],
    });
    //  });
  }
}

