import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import {
  BedInventoryDTO,
  BedTypeDTO,
  CityDTO,
  DistrictDTO,
  HospitalDTO,
  HospitalTypeDTO,
  MunicipalCorpDTO,
  TalukaDTO,
} from '@shared/model';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FormBDTO } from '@shared/model/FormBDTO';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';
import { Form1ADTO } from '@shared/model/form1ADTO';
import { FireElectricalAuditDTO } from '@shared/model/fireElectricalAuditDTO';
import { AuditFormSHospGenInfoDTO } from '@shared/model/auditFormSHospGenInfoDTO';
import * as moment from 'moment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
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
  hospitalTypeList: HospitalTypeDTO[];
  bedTypesLOV: BedTypeDTO[];
  municipalCorpList: MunicipalCorpDTO[];
  Form1ADTOList: Form1ADTO[] = [];
  expandable: boolean;
  selectedDtrictName: String = '';
  selectedDtrictId: number;
  dataFromPreviousComp: { [k: string]: any; };
  data: any;
  auditId: any;
  auditDTO: AuditDTO;
  isSaving = false;
  supplier: HospitalDTO;

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

    this.auditId = this.auditService.getSelectedAudit();

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

    this.queryData();
  }

  listColumnsIntl() {
    this.isLoading = true;
    this.columns = [

      {
        header: this.translate.instant('hospital_list.Sr_no'),

        field: 'serial_no',
        sortable: false,
        minWidth: 0,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.districts'),
        field: 'District',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.inspection_authority'),
        field: 'inspection_authority',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hospital_name'),
        // DTO Value
        field: 'Name_of_Hospital',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.hospital_type'),
        field: 'hospital_type',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.inspection_date'),
        field: 'inspection_date',
        sortable: false,
        minWidth: 100,
        formatter: (data: any) => moment(data.auditDate).format('DD MMM, YYYY'),
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.number_of_audit_deficiencies_found'),
        field: 'number_of_audit_deficiencies_found',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.number_of_audit_deficiencies_completed'),
        field: 'number_of_audit_deficiencies_completed',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.Remarks'),
        field: 'Remarks',
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
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    // this.lookupService.queryHospitalType().subscribe((res: HttpResponse<HospitalTypeDTO[]>) => {
    //    this.hospitalTypeList = res.body;
    // });
    // this.lookupService.queryAudits(this.search).subscribe((res: HttpResponse<AuditDTO[]>) => {
    //   res.body.forEach(element => {
    //     var form1ADTO: Form1ADTO = {
    //       audit_id: element.id.toString(),
    //       hospitalId: element.hospitalId.toString(),
    //       serial_no: element.id.toString(),
    //       Name_of_Hospital: element.hospName,
    //       Remarks: element.remark,
    //       inspection_authority: element.freeField1,
    //       inspection_date: element.auditDate.toString(),
    //       number_of_audit_deficiencies_found: element.noOfDeficienciesFound,
    //       number_of_audit_deficiencies_completed: element.noOfDeficienciesCompleted
    //     }
    //     this.Form1ADTOList.push(form1ADTO);
    //   });


    //   this.Form1ADTOList.forEach((element, index) => {
    //     this.search["auditId.equals"] = element.serial_no;
    //     this.search["formName.contains"] = "Form S";

    //     this.search['id.equals'] = element.hospitalId;
    //     // this.lookupService.queryHospitals(this.search).subscribe((res: HttpResponse<HospitalDTO[]>) => {
    //     //   res.body.forEach((element) => {

    //     //     this.Form1ADTOList[index].District = element.districtName;

    //     //     this.hospitalTypeList.forEach(element1 => {
    //     //       if(element1.id == element.hospitalTypeId){
    //     //         this.Form1ADTOList[index].hospital_type = element1.name;
    //     //       }
    //     //     });

    //     //   });
    //     // });

    //   });

    //   this.list = this.Form1ADTOList;
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
          //click: record => this.add(record),
        },
      ],
    });
  }
}
