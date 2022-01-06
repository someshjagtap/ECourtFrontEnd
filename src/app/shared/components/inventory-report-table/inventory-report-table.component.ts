import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { UserDTO } from '@shared/model';
import { AuditDTO } from '@shared/model/AuditDTO';
import { InventoryReportDTO } from '@shared/model/inventoryReportDTO';
import { TableDetailsDTO } from '@shared/model/tableDetailsDTO';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { AuditService } from '@shared/services/audit.service';

@Component({
  selector: 'app-inventory-report-table',
  templateUrl: './inventory-report-table.component.html',
  styleUrls: ['./inventory-report-table.component.scss'],
})
export class InventoryReportTableComponent implements OnInit {

  inventoryReportDTO: InventoryReportDTO[];
  userModelObj: InventoryReportDTO;
  @Input() search: any;
  @Input() crudOperation: String;
  appraisalApplyForm: FormGroup;
  auditDTO: AuditDTO;
  factors: any;
  parameters: any;
  filtervar: any;
  disabled: boolean = true;
  hasDone: boolean = false;
  isSaving = true;
  invalid: boolean = true;
  tableDetailsDTOList: TableDetailsDTO[];
  data: any[] = [];
  user: UserDTO;

  onClick(data): void {
    const json = JSON.stringify(data);

    console.log(json);
    this.isSaving = false;
    this.postQuestionnarie(data['inventoryReportTableForm']);
    this.hasDone = true;

  }

  constructor(
    private fb: FormBuilder,
    private operationsService: OperationsService,
    private lookupService: LookupService,
    private helperService: HelperService,
    private auditService: AuditService,
    private auth: AuthService,
    private router: Router,
  ) {

    this.auditDTO = this.auditService.getSelectedAudit();
  }



  get formArray() {
    return <FormArray>this.appraisalApplyForm.get('inventoryReportTableForm');
  }

  ngOnInit() {

    this.user = this.auth.getUserDetails();

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }


    this.inventoryReportDTO = [];

    console.log('search ::::::::::::::: ' + JSON.stringify(this.search));

    this.appraisalApplyForm = this.fb.group({
      // fname: [null, [Validators.required, Validators.minLength(5)]],
      inventoryReportTableForm: this.fb.array([]),
    });

    console.log(this.appraisalApplyForm);
    this.getQuestionnarie();
  }

  getQuestionnarie() {

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {

      this.search['auditId.equals']=this.auditDTO.id;

      // this.lookupService
      //   .getInventoryReportDTO(this.search)
      //   .subscribe((res: HttpResponse<InventoryReportDTO[]>) => {
      //     this.inventoryReportDTO = res.body;

      //     this.fill_appraisal_form_answer(this.inventoryReportDTO);
      //   });
    } else {
      // this.lookupService
      //   .getQuestionInventoryReportTable(this.search)
      //   .subscribe((res: HttpResponse<TableDetailsDTO[]>) => {
      //     this.tableDetailsDTOList = res.body;

      //     this.fill_appraisal_form_quations(this.tableDetailsDTOList);
      //   });
    }
  }

  addForm() {
    const control = <FormArray>this.appraisalApplyForm.controls['inventoryReportTableForm'];
    control.push(
      this.fb.group({
        serial_no: this.fb.control(''),
        description: this.fb.control(''),
        descriptionParameter: this.fb.control(''),
        actualAvailable: this.fb.control(''),
        remark: this.fb.control(''),
      })
    );
  }

  fill_appraisal_form_quations(tableDetailsDTOList: TableDetailsDTO[]) {
    for (let i = 0; i < tableDetailsDTOList.length; i++) {

      if (this.formArray.length < tableDetailsDTOList.length) {
        this.addForm();
      }

      var local = {
        serial_no: i + 1,
        description: tableDetailsDTOList[i].description,
        descriptionParameter: tableDetailsDTOList[i].descriptionParameter,
        actualAvailable: '',
        remark: '',
      }
      this.data.push(local)

      this.formArray.at(i).patchValue(local);
    }
  }

  fill_appraisal_form_answer(inventoryReportDTO: InventoryReportDTO[]) {
    for (let i = 0; i < inventoryReportDTO.length; i++) {

      if (this.formArray.length < inventoryReportDTO.length) {
        this.addForm();
      }

      var local = {
        serial_no: i + 1,
        description: inventoryReportDTO[i].description,
        descriptionParameter: inventoryReportDTO[i].descriptionParameter,
        actualAvailable: inventoryReportDTO[i].actualAvailable,
        remark: inventoryReportDTO[i].remark,
      }

      this.data.push(local);

      this.formArray.at(i).patchValue(local);

    }
  }

  submitApplyAppraisal(data) {
    let route = 'add-apply-appraisal';
    // let data = this.appraisalApplyForm.value;
    console.log(data);
    return;
  }

  //posting data
  postQuestionnarie(inventoryReportTableForm: any) {
    console.log("Posted data---------------------" + JSON.stringify(inventoryReportTableForm));

    if (this.crudOperation == 'edit' || this.crudOperation == 'view') {

      var inventoryReportDTO: InventoryReportDTO[] = [];

      inventoryReportTableForm.forEach((tableQuestionsDTO, index) => {
        let local: InventoryReportDTO = {

          actualAvailable: inventoryReportTableForm[index].actualAvailable,
          auditId: this.auditDTO.id,
          description: inventoryReportTableForm[index].description,
          descriptionParameter: inventoryReportTableForm[index].descriptionParameter,
          formName: this.search['formName.contains'],
          freeField1: "",
          freeField2: "",
          freeField3: this.inventoryReportDTO[index].freeField3,
          id: this.inventoryReportDTO[index].id,
          lastModified: new Date().toISOString(),
          lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
          remark: inventoryReportTableForm[index].remark,
          subType: tableQuestionsDTO.subType,
          tableName: tableQuestionsDTO.tableName,
          type: this.search['type.equals']
        };

        inventoryReportDTO.push(local);
      });

      this.operationsService.createInventoryTableReport(inventoryReportDTO).subscribe(
        res => {
          console.log(res);
          this.isSaving = true;
          this.helperService.showSuccess('Inventory Report Saved Successfully..');
        },

        err => {
          alert('something went wrong');
        }
      );
    } else {

      this.tableDetailsDTOList.forEach((tableQuestionsDTO, index) => {
        let local: InventoryReportDTO = {

          actualAvailable: inventoryReportTableForm[index].actualAvailable,
          auditId: this.auditDTO.id,
          description: '',
          descriptionParameter: '',
          formName: this.search['formName.contains'],
          freeField1: '',
          freeField2: '',
          freeField3: tableQuestionsDTO.id.toString(),
          id: inventoryReportTableForm[index].id,
          lastModified: new Date().toISOString(),
          lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
          remark: inventoryReportTableForm[index].remark,
          subType: tableQuestionsDTO.subType,
          tableName: tableQuestionsDTO.tableName,
          type: this.search['type.equals']
        };

        this.inventoryReportDTO.push(local);
      });

      this.operationsService.createInventoryTableReport(this.inventoryReportDTO).subscribe(
        res => {
          console.log(res);
          this.helperService.showSuccess('Inventory Report Saved Successfully..');
          this.inventoryReportDTO;
        },
        err => {
          alert('something went wrong');
        }
      );
    }

  }

}

