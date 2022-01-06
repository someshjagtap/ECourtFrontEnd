import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { MtxGridColumn } from '@ng-matero/extensions';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS_PER_PAGE } from '@shared/constants/pagination.constants';
import { caseDTO } from '@shared/model/caseDTO';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  list: caseDTO[] = [];
  isLoading = true;
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,desc' };
  isSaving = false;
  search: any = {};
  expandable: boolean;

  columns: MtxGridColumn[] = [
    {
      header: "ID",
      field: 'id',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
    },
    {
      header: "Case No",
      field: 'caseNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      pinned: 'left',
    },
    {
      header: "villageName",
      field: 'villageName',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
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
      hide: true,
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
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "LAR",
      field: 'lar',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Increased Compensation Amount",
      field: 'incCompensation',
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
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "ChequeNo",
      field: 'chequeNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.caseFilingDate).format('DD MMM, YYYY'),
    },
    {
      header: "Cheque Date",
      field: 'chequeDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Appeal No",
      field: 'appealNo',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Court Amount",
      field: 'courtAmount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Appeal Amount",
      field: 'appealAmount',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Appeal Date",
      field: 'appealDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      formatter: (data: any) => moment(data.appealDate).format('DD MMM, YYYY'),
    },
    {
      header: "Description",
      field: 'description',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      hide: true,
      // pinned: 'left',
      // formatter: (data: any) => moment(data.chequeDate).format('DD MMM, YYYY'),
    },
    {
      header: "Case Status",
      field: 'caseStatus',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // formatter: (rowData: any) => this.getManupulatedStatus(rowData),
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
  constructor(
    public lookupService: LookupService,
    private router: Router,
    public helperService: HelperService,
    private location: Location,
    public operationService: OperationsService,
    private auth: AuthService,
    // public dialog: MtxDialog,
    private route: ActivatedRoute,
    private translate: TranslateService,
    // private auditService: AuditService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageContext.itemsPerPage = ITEMS_PER_PAGE;
    this.pageContext.totalItems = ITEMS_PER_PAGE;
    this.expandable = false;
   }

  ngOnInit(): void {
    this.queryData();
    this.operationsColumns();
  }



  queryData() {
    this.isLoading = true;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;



    this.lookupService.queryCases().subscribe((res: HttpResponse<caseDTO[]>)=> {
      this.list = res.body;
      this.isLoading=false;
      console.log(this.list);
    })

  }

  onPageChange(e: any) {
    this.pageContext.page = e.pageIndex;
    this.pageContext.previousPage = e.previousPageIndex;
    this.pageContext.itemsPerPage = e.pageSize;
    this.queryData();
  }

  changeSort(e: any) {
    this.pageContext.sort = e.active + ',' + e.direction;
    this.pageContext.page = 0;
    this.queryData();
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

  setSelectedDistrictHospitalName() {
    // this.districtList.forEach(element => {
    //   if (element.id == this.search['districtId.equals']) {
    //     this.selectedDtrictName = element.name;
    //     this.selectedDtrictId = element.id;
    //     this.filteredDistrictList.push(element);
    //   }
    // });
  }

  getManupulatedStatus(rowData: any): void {
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

  operationsColumns() {

    // this.auth.hasAnyAuthoritySub(['AUDIT_EDIT']).then(hasUserAllowedUpdateAudit => {

    //   this.hasUserAllowedUpdateAudit = hasUserAllowedUpdateAudit;
    // });


    this.auth.hasAnyAuthoritySub(['HOSPITAL_USER', 'AUDIT_LIST']).then(isAllowed => {
      // if (isAllowed)
        this.columns.push({
          header: 'Operation',
          field: 'operation',
          minWidth: 100,
          width: '170px',
          pinned: 'right',
          type: 'button',
          buttons: [
            {
              // text: 'Edit',
              icon: 'edit',
              type: 'basic',
              color: 'primary',
              tooltip: 'Edit',
              click: record => this.edit(record),
              // iif: (record: any) =>
              //   this.auth.hasAccess('HOSPITAL', record.hospId) || isAllowed

            },
            {
              // text: 'Delete',
              icon: 'delete',
              type: 'basic',
              color: 'warn',
              tooltip: 'Delete',
              click: (record:caseDTO) => this.delete(record.id),
              // iif: (record) => record.caseStatus != "COMPLETED" && this.hasUserAllowedUpdateAudit
            },
            {
              text: 'Hearing',
              type: 'basic',
              color: 'accent',
              tooltip: 'Hearing Details',
              click: record => this.hearing(record),
              // iif: (record) => record.caseStatus != "COMPLETED" && this.hasUserAllowedUpdateAudit
            },
          ],
        });
    });
  }

  add() {
    this.router.navigateByUrl('/public/createcase');
  }

  edit(data: any) {
    this.router.navigateByUrl('/public/editcase/' + data.id);
  }

  view(data: any) {
    this.router.navigateByUrl('/admin/view/' + data.id);
  }

  hearing(data: any) {
    this.router.navigateByUrl('/admin/hearings/hearingList/' + data.id);
  }

  delete(id) {
    this.subscribeToSaveResponse(this.operationService.deleteCase(id));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<caseDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      error => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.queryData();
    // this.previousState();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError(error: any) {
    this.isSaving = false;
  }
  // view(data) {
  //   var payLoadData = {
  //     crudOperation: 'View',
  //     data: data,
  //   };
  //   this.router.navigateByUrl('/public/view/', {
  //     state: payLoadData,
  //   });
  // }
}
