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
import { DatePipe, Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { Common } from '@shared/utils/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuditFormSHospGenInfoDTO } from '@shared/model/auditFormSHospGenInfoDTO';

import { CreateComponent } from '../create/create.component';
import { RateRegulationDTO } from '@shared/model/RateRegulationDTO';
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
  auditDTO: AuditDTO;
  hasAuditDoneForThisForm: boolean=false;


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
    private auditService:AuditService
     ) {
      this.auditDTO = this.auditService.getSelectedAudit();

    this.auditDTO=this.auditService.getSelectedAudit();

    this.dataFromPreviousComp = this.router.getCurrentNavigation().extras.state;
    if (this.dataFromPreviousComp != null && this.dataFromPreviousComp["data"] != undefined) {

      console.log("In List dataFromPreviousComp:::::::::::::::::" + JSON.stringify(this.dataFromPreviousComp));
      this.data = this.dataFromPreviousComp["data"];
      //this.auditId = this.data["auditId"];

      console.log("In List data:::::::::::::::::" + JSON.stringify(this.data));
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
        header: this.translate.instant('hospital_list.date_submission'),
        field: 'submissionDate',
        sortable: false,
        minWidth: 10,
        maxWidth:20,
        // field: 'name',
        // minWidth: 200,
        // maxWidth: 300,
        showExpand: this.expandable,
        // pinned: 'left',
      },

     {
        header: this.translate.instant('hospital_list.total_number_of_isolation_beds'),
        field: 'totalNumCovidIsoBeds',
        sortable: false,
        minWidth: 20,

        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Isolation_beds_under_Regulation'),
        field: 'eightyIsoBedsUnderRegulation',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.total_No_of_Covid_Patients_Admitted'),
        field: 'totalNumCovidPatientAdmitted',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Covid_patient_beds_under_Regulation'),
        field: 'patientAdmitAgainstEightyIsoBeds',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.no_covid_patient_discharged_regulation'),
        field: 'patientsDischargedAgainstEightyIsoBeds',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Total_No_of_pat_rec_bills_Rate_Regulation_notification'),
        field: 'patientsRcvdRegularisedBill',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Total_not_received_RegulationNotification'),
        field: 'patientsNotRcvdRegularisedBill',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.patients_received_revised_bills'),
        field: 'patientReceivedRevisedBills',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.patient_received_reimbursement'),
        field: 'patientReceivedReimbursement',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Total_amount_reimbursed'),
        field: 'totalAmountReimbursed',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.patients_received_reimbursment'),
        field: 'numPatientsReceivedReimbursment',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.Actual_amount_reimbursed'),
        field: 'amountReimbursed',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Amount_not_reimbursed'),
        field: 'amountNotReimbursed',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Auditors_Remarks'),
        field: 'auditorRemark',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.compliance_status'),
        field: 'complianceStatus',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

    ];

    this.isLoading = false;
  }

  async ngOnInit() {
    if(this.auditDTO==null)
    {
      this.router.navigateByUrl('/public/startaudit');
    }

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
    // this.search['formName.contains'] = "Rate Regulation";
    this.search['auditId.equals'] = this.auditDTO.id;
    //this.search["formName.contains"] = "Monitor Form";
    this.search["auditId.equals"] == this.auditDTO.id;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    // this.lookupService.queryRateRegulationForms(this.search).subscribe((res: HttpResponse<RateRegulationDTO[]>) => {
    //   const headers = res.headers;
    //   this.pageContext.totalItems = +headers.get('x-total-count');
    //   this.list = res.body;
    //   this.isLoading = false;

    //   if(this.auditDTO != null && (this.auditDTO.auditStatus == "COMPLETED"
    //   || this.auditDTO.auditStatus == "INREVIEW"
    //   || this.auditDTO.isRateRegulationStatus == "INREVIEW"
    //   || this.auditDTO.isRateRegulationStatus == "COMPLETED"))
    //   {
    //     this.hasAuditDoneForThisForm= true;
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

  add(data) {

    const dialogRef = this.dialog.originalOpen(CreateComponent,{

        width: '100%',
        height: '650px',
        disableClose: true

     }
    );

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





















































// import { Component } from '@angular/core';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   tested: string;
//   test: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     position: 1,
//     name: 'Hydrogen',
//     weight: 1.0079,
//     symbol: 'H',
//     tested: 'B',
//     test: 'A',
//   },];
//   @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.scss'],
// })
// export class ListComponent {
//   displayedColumns: string[] = [
//     'position',
//     'name',
//     'weight',
//     'symbol',
//     'tested',
//     'test',
//   ];
//   dataSource = ELEMENT_DATA;
// }
