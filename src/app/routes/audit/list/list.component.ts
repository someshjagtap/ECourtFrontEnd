import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { AuditSystemDTO, SupplierDTO } from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { Common } from '@shared/utils/common';
import * as moment from 'moment';

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  columns: MtxGridColumn[] = [];
  list = [];
  isLoading = true;
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,asc' };
  search: any = {  };
  hospital;
  supplier: SupplierDTO;

  constructor(
    public lookupService: LookupService,
    private router: Router,
    public helperService: HelperService,
    public operationService: OperationsService,
    public dialog: MtxDialog,
    private location: Location,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.pageContext.itemsPerPage = ITEMS_PER_PAGE;

    this.route.data.subscribe(data => {
      if (data['level'] == 'HOSPITAL') {
        this.search['hospitalId.equals'] = parseInt(this.route.snapshot.paramMap.get('id'));
        // this.lookupService.getHospital(this.search['hospitalId.equals']).subscribe(data => {
        //   this.hospital = data.body;
        // });
      } else if (data['level'] == 'SUPPLIER') {
        this.search['supplierId.equals'] = parseInt(this.route.snapshot.paramMap.get('id'));
        // this.lookupService.querySupplier(this.search['supplierId.equals']).subscribe(data => {
        //   this.supplier = data.body;
        // });
      }
    });

  }

  ngOnInit() {
    this.columns = [];
    this.addBasicColumns();
    this.addOperationsColumns();
    this.pageContext.page = 0;
    this.queryData();
  }

  async queryData() {

    this.isLoading = true;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;
    Common.removeEmptyFields(this.search);
    // this.lookupService
    //   .queryAuditSystems(this.search)
    //   .subscribe((res: HttpResponse<AuditSystemDTO[]>) => {
    //     const headers = res.headers;
    //     this.pageContext.totalItems = +headers.get('x-total-count');
    //     this.list = res.body;
    //     this.isLoading=false;
    //   });
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

  onSearch(reset) {
    if (reset) {
      this.search = {};
    }
    this.queryData();
  }

  add() {
    let data: any ={};
    if(this.search['hospitalId.equals'] ){
      data.hospitalId=this.search['hospitalId.equals'] ;
    }else{
      data.supplierId=this.search['supplierId.equals'] ;
    }
    this.auth.user().subscribe(user=>{
      data.auditorName=user.firstName +' '+user.lastName;
      this.router.navigateByUrl('/admin/audit/create', {
        state: data,
      });
    });

  }

  edit(data: any) {
    this.router.navigateByUrl('/admin/audit/edit/' + data.id);
  }

  delete(value: any) {
    this.subscribeToSaveResponse(this.operationService.deleteAuditSystem(value.id));

  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(() => this.onSaveSuccess());
  }

  protected onSaveSuccess(): void {
    this.helperService.showSuccess('Success');
    this.queryData();
  }

  previousState(): void {
    this.location.back();
  }

  deletObj(value: string) {
    delete this.search[value];
  }

  addBasicColumns() {
    this.columns = [
      {
        header: 'Audit',
        field: 'auditTypeName',
        sortable: true,
        minWidth: 100,
        showExpand: false,
      },
      {
        header: 'Auditor Name',
        field: 'auditorName',
        sortable: false,
        minWidth: 100,
        hide: false,
      },
      {
        header: 'No. Of Deficiencies',
        field: 'defectCount',
        sortable: false,
        minWidth: 100,
        hide: false,
      },
      {
        header: 'No. Of Deficiencies Completed',
        field: 'defectFixCount',
        minWidth: 100,
      },
      {
        header: 'Inspection Date',
        field: 'inspectionDate',
        minWidth: 100,
        hide: false,
        formatter: (data: any) => moment(data.inspectionDate).format('DD MMM, YYYY'),
      },
      {
        header: 'Remark',
        field: 'remark',
        minWidth: 200,
        hide: false,
      },
      {
        header: 'Status',
        field: 'status',
        minWidth: 50,
        hide: false,
      },
      {
        header: 'Last Modified',
        field: 'lastModified',
        sortable: true,
        minWidth: 120,
        formatter: (data: any) => this.helperService.dateAgo(data.lastModified),
      },
    ];
  }

  addOperationsColumns() {
    this.auth.hasAnyAuthoritySub(['AUDIT_EDIT']).then(isAllowed => {
      if (isAllowed)
        this.columns.push({
          header: 'Operation',
          field: 'operation',
          minWidth: 120,
          pinned: 'right',
          type: 'button',
          buttons: [
            {
              type: 'icon',
              icon: 'edit',
              tooltip: 'Edit',
              click: record => this.edit(record),
            },
            {
              color: 'warn',
              icon: 'delete',
              text: 'Please cofirm delete.',
              tooltip: 'Delete ',
              pop: true,
              popTitle: 'Please cofirm delete?',
              popCloseText: 'No',
              popOkText: 'Yes',
              click: record => this.delete(record),
            },
          ],
        });
    });
  }
}
