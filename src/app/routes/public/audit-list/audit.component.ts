import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import {
  DistrictDTO,
  HospitalDTO,
  UserDTO

} from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { Common } from '@shared/utils/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuditDTO } from '@shared/model/AuditDTO';
import { CreateAuditComponent } from '../create-audit/create-audit.component';
import { AuditService } from '@shared/services/audit.service';
import * as moment from 'moment';
import { LoginComponent } from 'app/routes/sessions/login/login.component';
import { caseDTO } from '@shared/model/caseDTO';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditListComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: "ID",
      field: 'id',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "caseNo",
      field: 'caseNo',
      sortable: true,
      minWidth: 100,
      showExpand: false

      // pinned: 'left',
    },
    {
      header: "villageName",
      field: 'villageName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    // {
    //   header: "Audit Date",
    //   field: 'auditDate',
    //   sortable: true,
    //   minWidth: 100,
    //   showExpand: false,
    //   formatter: (data: any) => moment(data.auditDate).format('DD MMM, YYYY'),
    //   // pinned: 'left',
    // },
    {
      header: "Accuser Name",
      field: 'accuserName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Application No",
      field: 'applicationNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Land ReferenceNo",
      field: 'landReferenceNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "First Appeal",
      field: 'firstAppeal',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Amount",
      field: 'amount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Project Name",
      field: 'projectName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Court Name",
      field: 'courtName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Defendant Name",
      field: 'defendantName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Case Description",
      field: 'caseDescription',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "CaseFiling Date",
      field: 'caseFilingDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Total ClaimAmount",
      field: 'totalClaimAmount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
    },
    {
      header: "Case Officer",
      field: 'caseOfficer',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Case Lawyer",
      field: 'caselawyer',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "NextHearing Date",
      field: 'nextHearingDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      formatter: (data: any) => moment(data.nextHearingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Amount Deposite In Court",
      field: 'amountDepositeInCourt',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "LAR",
      field: 'lar',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Increased Compensation Amount",
      field: 'increasedCompensationAmount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Amount Paid SLO",
      field: 'amountPaidSLO',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "ChequeNo",
      field: 'chequeNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Cheque Date",
      field: 'chequeDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Appeal No",
      field: 'appealNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Court Amount",
      field: 'courtAmount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Appeal Amount",
      field: 'appealAmount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Appeal Date",
      field: 'appealDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      formatter: (data: any) => moment(data.appealDate).format('DD MMM, YYYY'),
    },
    {
      header: "Description",
      field: 'description',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
  {
      header: "Case Status",
      field: 'caseStatus',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      formatter: (rowData: any) => getManupulatedStatus(rowData),
      // pinned: 'left',
    }
    // {
    //   header: "Audit Status",
    //   field: 'auditStatus',
    //   sortable: true,
    //   minWidth: 100,
    //   showExpand: false,
    //   formatter: (rowData: any) => getManupulatedStatus(rowData),
    //   // pinned: 'left',
    // }
  ];
  search: any = {};

  list: any = [];
  isLoading = true;
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,desc' };

  districtList: DistrictDTO[];
  filteredDistrictList: DistrictDTO[] = [];

  today = new Date();
  hospitalDetails: HospitalDTO[];
  hospitalTypeList: HospitalDTO[];
  isSaving = false;
  supplier: HospitalDTO;


  expandable: boolean;
  selectedDtrictName: String = '';

  selectedDtrictId: number;
  hasUserAllowedUpdateAudit: boolean = false;
  hasHospitalUser: boolean = false;


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
    private activatedRoute: ActivatedRoute
  ) {
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


  async ngOnInit() {

    let user: UserDTO = this.auth.getUserDetails();

    if (user == null || (user.id == null && user.login == null)) {
      this.router.navigateByUrl('/auth/login');
    } else {
      // this.lookupService.queryDistrict().subscribe((resp: HttpResponse<DistrictDTO[]>) => {
      //   this.districtList = resp.body;
      //   this.setSelectedDistrictHospitalName();
      // });


      // this.lookupService.queryHospitalType().subscribe((res: HttpResponse<HospitalDTO[]>) => {
      //   this.hospitalTypeList = res.body;
      // });


      this.activatedRoute.params.subscribe(params => {
        const hospitalId = params['hospitalId'];

        this.search["hospitalId.equals"] = hospitalId;

        if (hospitalId == null) {

          this.auth.hasAnyAuthoritySub(['HOSPITAL_USER']).then(hasHospitalUser => {

            this.hasHospitalUser = hasHospitalUser;

            if (hasHospitalUser) {
              this.auth.user().subscribe(user => {

                this.search["hospitalId.equals"] = user.userAccess[0].accessId;

                this.queryData();
                this.operationsColumns();

              });


            } else {
              this.queryData();
              this.operationsColumns();
            }

          });
        } else {
          this.queryData();
          this.operationsColumns();
        }


      });
    }



  }


  gotoView(id: number) {
    this.router.navigate(['/admin/hospital/view', id]);
  }

  redirectToView(id: number) {
    this.router.navigate(['/public/view', id]);
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

  selectedDistrict() {
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
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    // if (this.search['queryDate'] != null) {
    //   let date = new Date(this.search['queryDate']);
    //   date.setDate(date.getDate() + 1);
    //   let dateString = moment(date).format('YYYY-MM-DD');
    //   this.search['auditDate.equals'] = dateString;
    // }
    // Common.removeEmptyFields(this.search);

    // this.lookupService.queryAudits(this.search).subscribe((res: HttpResponse<AuditDTO[]>) => {

    //   console.log(JSON.stringify(res.body));
    //   res.body.forEach((element, index) => {

    //     if (element.hospitalId != null) {

    //       this.lookupService
    //         .queryHospitals({ 'id.equals': element.hospitalId })
    //         .subscribe((resHospital: HttpResponse<HospitalDTO[]>) => {

    //           resHospital.body.forEach(hospital => {

    //             if (hospital != null) {
    //               this.list[index].hospName = hospital.name;
    //             }
    //           });
    //         });
    //     }

    //   });
    //   this.list = res.body;
    //   const headers = res.headers;
    //   this.pageContext.totalItems = +headers.get('x-total-count');
    //   this.isLoading = false;

    // });

    this.lookupService.queryCases().subscribe((res: HttpResponse<caseDTO[]>)=> {
      this.list = res.body;
      console.log(this.list);
    })

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
    this.router.navigateByUrl('/admin/hospital/create');
  }

  startAudit(data: any) {

    this.auditService.setSelectedAudit(data);

    var payLoadData = {
      crudOperation: 'startAudit',
      data: data,

    };
    this.router.navigateByUrl('/admin/rate-regulation-form/list/' + data.id, { state: payLoadData, }

    );
  }



  openCreateNewAuditDialog(data) {

    if (data != null) {

      var payLoadData = {
        crudOperation: 'update',
        data: data,

      };

      const dialogRef = this.dialog.originalOpen(CreateAuditComponent, {
        width: '750px',
        height: '750px',
        data: payLoadData
      });

      dialogRef.afterClosed().subscribe(() => {
        this.queryData();
      });

    } else {

      const dialogRef = this.dialog.originalOpen(CreateAuditComponent, {
        width: '750px'
      });

      dialogRef.afterClosed().subscribe(() => {
        this.queryData();
      });
    }

  }

  addNewAudit() {

    this.lookupService
  }

  view(data) {
    var payLoadData = {
      crudOperation: 'View',
      data: data,

    };
    this.router.navigateByUrl('/public/view', {
      state: payLoadData,
    });
  }

  goToForm1A() {
    var payLoadData = {};
    this.router.navigateByUrl('/admin/form1-a/list', {
      state: payLoadData,
    });
  }

  goToForm1B() {
    var payLoadData = {};
    this.router.navigateByUrl('/admin/form1-b/list', {
      state: payLoadData,
    });
  }


  goToForm1C() {
    var payLoadData = {};
    this.router.navigateByUrl('/admin/form1-c/list', {
      state: payLoadData,
    });
  }

  ///admin/form1-a/list

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


  goToAudit(data) {
    this.router.navigateByUrl('/admin/audit/hospital/' + data.id);
  }


  operationsColumns() {

    this.auth.hasAnyAuthoritySub(['AUDIT_EDIT']).then(hasUserAllowedUpdateAudit => {

      this.hasUserAllowedUpdateAudit = hasUserAllowedUpdateAudit;
    });


    this.auth.hasAnyAuthoritySub(['HOSPITAL_USER', 'AUDIT_LIST']).then(isAllowed => {
      // if (isAllowed)
        this.columns.push({
          header: 'Operation',
          field: 'operation',
          minWidth: 100,
          pinned: 'right',
          type: 'button',
          buttons: [
            {
              text: 'Case',
              type: 'basic',
              color: 'primary',
              tooltip: 'Case',
              click: record => this.startAudit(record),
              // iif: (record: any) =>
              //   this.auth.hasAccess('HOSPITAL', record.hospId) || isAllowed

            },

            {
              text: 'Update Case',
              type: 'basic',
              color: 'warn',
              tooltip: 'Update Case',
              click: record => this.openCreateNewAuditDialog(record),
              // iif: (record) => record.caseStatus != "COMPLETED" && this.hasUserAllowedUpdateAudit

            },
            {
              text: 'View Case',
              type: 'basic',
              color: 'accent',
              tooltip: 'View Case',
              click: record => this.view(record),
              // iif: (record) => record.caseStatus != "COMPLETED" && this.hasUserAllowedUpdateAudit

            },
          ],
        });
    });
  }
}

function getManupulatedStatus(rowData: any): void {
  switch (rowData.caseStatus) {
    case "STARTED":
      return rowData.caseStatus == "STARTED" ? "AUDIT STARTED" : rowData.caseStatus;
    case "DEFECIENCIES":
      return rowData.caseStatus == "DEFECIENCIES" ? "DEFECIENCIES FOUND" : rowData.caseStatus;
    case "CREATED":
      return rowData.caseStatus == "CREATED" ? "AUDIT CREATED" : rowData.caseStatus;
    case "INPROGRESS":
      return rowData.caseStatus == "INPROGRESS" ? "AUDIT INPROGRESS" : rowData.caseStatus;
    case "INREVIEW":
      return rowData.caseStatus == "INREVIEW" ? "AUDIT INREVIEW" : rowData.caseStatus;
    case "COMPLETED":
      return rowData.caseStatus == "COMPLETED" ? "AUDIT COMPLETED" : rowData.caseStatus;
  }
}

