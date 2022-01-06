import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS_PER_PAGE } from '@shared/constants/pagination.constants';
import { caseDTO } from '@shared/model/caseDTO';
import { LookupService, HelperService, OperationsService } from '@shared/services';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from '@core/authentication/auth.service';
import { HearingDTO } from '@shared/model/hearingDTO';

@Component({
  selector: 'app-list-hearing',
  templateUrl: './list-hearing.component.html',
  styleUrls: ['./list-hearing.component.scss']
})
export class ListHearingComponent implements OnInit {

  list: HearingDTO[] = [];
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
      header: "Accuser Name",
      field: 'freefield1',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      pinned: 'left',
    },
    {
      header: "Defendant Name",
      field: 'freefield2',
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
      header: "Participant Name",
      field: 'freefield3',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Hearing Date",
      field: 'hearingDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      formatter: (data: any) => moment(data.hearingDate).format('DD MMM, YYYY HH:MM'),
    },
    {
      header: "Status",
      field: 'status',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Comment",
      field: 'comment',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Conclusion",
      field: 'conclusion',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
    },
    {
      header: "Next Hearing Date",
      field: 'nextHearingDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      // pinned: 'left',
      formatter: (data: any) => moment(data.nextHearingDate).format('DD MMM, YYYY HH:MM'),
    },
    {
      header: "Previous Hearing Date",
      field: 'previousHearingDate',
      sortable: true,
      minWidth: 100,
      showExpand: false,
      formatter: (data: any) => moment(data.previousHearingDate).format('DD MMM, YYYY  HH:MM'),

      // pinned: 'left',
    },

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



    this.lookupService.queryHearing().subscribe((res: HttpResponse<HearingDTO[]>)=> {
      this.list = res.body;
      this.isLoading=false;
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
              tooltip: 'Delete ffffffffff',
              click: (record:HearingDTO) => this.delete(record.id),
              // iif: (record) => record.caseStatus != "COMPLETED" && this.hasUserAllowedUpdateAudit
            },
            // {
            //   text: 'Hearing',
            //   type: 'basic',
            //   color: 'accent',
            //   tooltip: 'Hearing Details',
            //   click: record => this.hearing(record),
            //   // iif: (record) => record.caseStatus != "COMPLETED" && this.hasUserAllowedUpdateAudit
            // },
          ],
        });
    });
  }

  add() {
    this.router.navigateByUrl('/admin/hearings/createHearing');
  }

  edit(data: any) {
    this.router.navigateByUrl('/admin/hearings/editHearing/' + data.id);
  }

  view(data: any) {
    this.router.navigateByUrl('/admin/view/' + data.id);
  }

  hearing(data: any) {
    this.router.navigateByUrl('/admin/hearings/hearingList/' + data.id);
  }

  delete(id:number) {
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
    this.previousState();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError(error: any) {
    // console.log('DELETE ID:::' + )
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
