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
        header: this.translate.instant('hospital_list.Level_of_Hosp_city'),
        field: 'Level_of_Hosp_city',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Level_of_Hosp_District'),
        field: 'Level_of_Hosp_District',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Sub_Dist'),
        field: 'Sub_Dist',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Taluka'),
        field: 'Taluka',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Name_of_Head_of_Institiute'),
        field: 'Name_of_Head_of_Institiute',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Mobile_No_of_Head_of_Institiute'),
        field: 'Mobile_No_of_Head_of_Institiute',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.email_of_Head_of_Institiute'),
        field: 'email_of_Head_of_Institiute',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      // {
      //   header: this.translate.instant('hospital_list.Name_of_Head_of_Oxygen_Facility'),
      //   field: 'Name_of_Head_of_Oxygen_Facility',
      //   sortable: false,
      //   minWidth: 100,
      //   showExpand: this.expandable,
      //   // pinned: 'left',
      // },

      // {
      //   header: this.translate.instant('hospital_list.Mobile_No_of_Head_of_Oxygen_Facility'),
      //   field: 'Mobile_No_of_Head_of_Oxygen_Facility',
      //   sortable: false,
      //   minWidth: 100,
      //   showExpand: this.expandable,
      //   // pinned: 'left',
      // },
      // {
      //   header: this.translate.instant('hospital_list.email_No_of_Head_of_Oxygen_Facility'),
      //   field: 'email_No_of_Head_of_Oxygen_Facility',
      //   sortable: false,
      //   minWidth: 100,
      //   showExpand: this.expandable,
      //   // pinned: 'left',
      // },

      {
        header: this.translate.instant('hospital_list.Oxygen_Bed_Sanctioned_nos'),
        field: 'Oxygen_Bed_Sanctioned_nos',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },

      {
        header: this.translate.instant('hospital_list.ICU_Bed_nos'),
        field: 'ICU_Bed_nos',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Ventilator_Bed_nos'),
        field: 'Ventilator_Bed_nos',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Oxygen_Audit_Done'),
        field: 'Oxygen_Audit_Done',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Structural_Audit_Done'),
        field: 'Structural_Audit_Done',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Fire_Audit_Done'),
        field: 'Fire_Audit_Done',
        sortable: false,
        minWidth: 100,
        showExpand: this.expandable,
        // pinned: 'left',
      },
      {
        header: this.translate.instant('hospital_list.Electricity_Audit_Done'),
        field: 'Electricity_Audit_Done',
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

    //this.operationsColumns();

    // this.queryData();
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
    // this.search["auditId.equals"] == this.auditId;
    this.search.page = this.pageContext.page;
    this.search.size = this.pageContext.itemsPerPage;
    this.search.sort = this.pageContext.sort;

    // this.lookupService.queryHospitalType().subscribe((res: HttpResponse<HospitalTypeDTO[]>) => {
    //    this.hospitalTypeList = res.body;
    // });
    // this.lookupService.queryAudits(this.search).subscribe((res: HttpResponse<AuditDTO[]>) => {
    //   // const headers = res.headers;
    //   // this.pageContext.totalItems = +headers.get('x-total-count');
    //   console.log(JSON.stringify(res.body));

    //   res.body.forEach(element => {
    //     var form1ADTO: Form1ADTO = {
    //       audit_id: element.id.toString(),
    //       hospitalId: element.hospitalId.toString(),
    //       serial_no: element.id.toString(),
    //       Name_of_Hospital: element.hospName,
    //       Remarks: element.remark,
    //     }
    //     this.Form1ADTOList.push(form1ADTO);
    //   });


    //   this.Form1ADTOList.forEach((element, index) => {
    //     this.search["auditId.equals"] = element.serial_no;
    //     this.search["formName.contains"] = "Form S";

    //     // this.lookupService.getfireelectricalaudits(this.search).subscribe((type: HttpResponse<FireElectricalAuditDTO[]>) => {

    //     //   type.body.forEach((element) => {
    //     //     this.Form1ADTOList[index].Fire_Audit_Done = element.fireAuditDoneOrnot;
    //     //     this.Form1ADTOList[index].Electricity_Audit_Done = element.electricalAuditDone;
    //     //   });
    //     // });

    //     // this.lookupService.queryAuditFormSGeneralInfoList(this.search).subscribe((res: HttpResponse<AuditFormSHospGenInfoDTO[]>) => {
    //     //   res.body.forEach((element) => {
    //     //     this.Form1ADTOList[index].Name_of_Head_of_Institiute = element.inchargeName;
    //     //     this.Form1ADTOList[index].Mobile_No_of_Head_of_Institiute = element.hospPhoneNo;
    //     //     this.Form1ADTOList[index].Structural_Audit_Done = element.freeField1;
    //     //     this.Form1ADTOList[index].Oxygen_Audit_Done = element.freeField2;
    //     //   });
    //     // });

    //     this.search['id.equals'] = element.hospitalId;
    //     // this.lookupService.queryHospitals(this.search).subscribe((res: HttpResponse<HospitalDTO[]>) => {
    //     //   res.body.forEach((element) => {
    //     //     this.Form1ADTOList[index].Sub_Dist = element.municipalCorpName;
    //     //     this.Form1ADTOList[index].District = element.districtName;
    //     //     this.Form1ADTOList[index].Level_of_Hosp_city = element.cityName;
    //     //     this.Form1ADTOList[index].Level_of_Hosp_District = element.districtName;
    //     //     this.Form1ADTOList[index].Taluka = element.talukaName;
    //     //     this.Form1ADTOList[index].email_of_Head_of_Institiute = element.email;

    //     //     this.hospitalTypeList.forEach(element1 => {
    //     //       if(element1.id == element.hospitalTypeId){
    //     //         this.Form1ADTOList[index].hospital_type = element1.desciption;
    //     //       }
    //     //     });

    //     //   });
    //     // });

    //     // this.lookupService.queryBedInventories({ "hospitalId.equals": element.hospitalId }).subscribe((res: HttpResponse<BedInventoryDTO[]>) => {
    //     //   res.body.forEach((element) => {
    //     //    if (element.bedTypeName == "Oxygen") {
    //     //       this.Form1ADTOList[index].Oxygen_Bed_Sanctioned_nos = element.bedCount?.toString();
    //     //     } else if (element.bedTypeName == "ICU") {
    //     //       this.Form1ADTOList[index].ICU_Bed_nos = element.bedCount?.toString();
    //     //     } else if (element.bedTypeName == "ICU Ventilator") {
    //     //       this.Form1ADTOList[index].Ventilator_Bed_nos = element.bedCount?.toString();
    //     //     }
    //     //   });
    //     // });
    //   });



    //   this.list = this.Form1ADTOList;
    //   // const headers = res.headers;
    //   // this.pageContext.totalItems = +headers.get('x-total-count');
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
          //click: record => this.add(record),
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
