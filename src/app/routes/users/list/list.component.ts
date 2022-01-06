import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { UserAccessDTO, SecurityUserDTO, SupplierDTO } from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { Common } from '@shared/utils/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  columns: MtxGridColumn[] = [];
  list = [];
  isLoading = true;
  pageContext = { page: 0, previousPage: 0, itemsPerPage: 0, totalItems: 0, sort: 'id,asc' };
  search: any = { 'activated.equals': 0 };
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
    this.search['accessId.equals'] = parseInt(this.route.snapshot.paramMap.get('accessId'));
    this.route.data.subscribe(data => {
      this.search['level.equals'] = data['level'];
      if (data['level'] == 'HOSPITAL') {
        // this.lookupService.getHospital(this.search['accessId.equals']).subscribe(data => {
        //   this.hospital = data.body;
        // });
      } else if (data['level'] == 'SUPPLIER') {
        // this.lookupService.querySupplier(this.search['accessId.equals']).subscribe(data => {
        //   this.supplier = data.body;
        // });
      }
    });
  }

  ngOnInit() {
    this.pageContext.page = 0;

    this.queryData();
  }

  async queryData() {
    this.columns = [];
    this.isLoading = true;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;
    Common.removeEmptyFields(this.search);
    this.lookupService
      .queryUserAccess(this.search)
      .subscribe((res: HttpResponse<UserAccessDTO[]>) => {
        const headers = res.headers;
        this.pageContext.totalItems = +headers.get('x-total-count');
        this.list = res.body;
        this.list.forEach((userAcc: UserAccessDTO, index)=> {
          this.getUser(userAcc,index);
        });
        if (this.list.length==0) {
          this.addBasicColumns();
          this.operationsColumns();
          this.isLoading = false;
        }
      });
  }

  getUser(userAcc: UserAccessDTO,index) {
    this.lookupService
      .querySecurityUser(userAcc.securityUserId)
      .subscribe((res: HttpResponse<SecurityUserDTO>) => {
        userAcc.securityUser = res.body;
        if (index+1== this.list.length) {
          this.addBasicColumns();
          this.operationsColumns();
          this.isLoading = false;
        }
      });
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
    let data: any = {
      access: { level: this.search['level.equals'], accessId: this.search['accessId.equals'] },
    };
    if (this.supplier) {
      if (this.supplier.supplierType == SupplierDTO.SupplierTypeEnum.REFILLER) {
        data.role = { id: 4 };
      } else if (this.supplier.supplierType == SupplierDTO.SupplierTypeEnum.MANUFACTURER) {
        data.role = { id: 5 };
      } else if (this.supplier.supplierType == SupplierDTO.SupplierTypeEnum.DEALER) {
        data.role = { id: 6 };
      } else if (this.supplier.supplierType == SupplierDTO.SupplierTypeEnum.DISTRIBUTOR) {
        data.role = { id: 7 };
      } else if (this.supplier.supplierType == SupplierDTO.SupplierTypeEnum.INDUSTRY) {
        data.role = { id: 8 };
      }
    }
    if (this.hospital) {
      data.role = { id: 3 };
    }

    this.router.navigateByUrl('/admin/users/create', {
      state: data,
    });
  }

  edit(data: any) {
    this.router.navigateByUrl('/admin/users/edit/' + data.securityUserId);
  }

  delete(value: any) {
    value.securityUser.activated = 1;
    this.operationService.updateSecurityUser(value.securityUser).subscribe(() => {
      this.subscribeToSaveResponse(this.operationService.deleteUserAccess(value.id));
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<SecurityUserDTO>>): void {
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
        header: 'First Name',
        field: 'securityUser.firstName',
        sortable: true,
        minWidth: 100,
        showExpand: false,
      },
      {
        header: 'Last Name',
        field: 'securityUser.lastName',
        sortable: false,
        minWidth: 100,
        hide: false,
      },
      {
        header: 'Username',
        field: 'securityUser.login',
        sortable: false,
        minWidth: 100,
        hide: false,
      },
      {
        header: 'Mobile No.',
        field: 'securityUser.mobileNo',
        minWidth: 100,
      },
      {
        header: 'Email',
        field: 'securityUser.email',
        minWidth: 100,
        hide: false,
      },
      {
        header: 'Updated By',
        field: 'securityUser.lastModifiedBy',
        minWidth: 100,
        hide: false,
      },
      {
        header: 'Updated',
        field: 'securityUser.lastModified',
        minWidth: 100,
        hide: false,
      },
    ];
  }

  operationsColumns() {
    this.auth.hasAnyAuthoritySub(['USERS_EDIT']).then(isAllowed => {
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
