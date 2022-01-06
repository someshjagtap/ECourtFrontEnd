import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/authentication/auth.service';
import { UserDTO } from '@shared/model';
import { AuditDTO } from '@shared/model/AuditDTO';
import { OxygenConsumptionDataDTO } from '@shared/model/listOxygenConsumptionDataDTO';
import { TableDetailsDTO } from '@shared/model/tableDetailsDTO';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { AuditService } from '@shared/services/audit.service';

@Component({
  selector: 'app-oxygen-use',
  templateUrl: './oxygen-use.component.html',
  styleUrls: ['./oxygen-use.component.scss'],
})
export class OxygenUseComponent implements OnInit {

  oxygenConsumptionDataDTO: OxygenConsumptionDataDTO[];
  userModelObj: OxygenConsumptionDataDTO;
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
  invalid : boolean = true;
  tableDetailsDTOList: TableDetailsDTO[];
  data: any[] = [];
  user: UserDTO;

  onClick(data): void {
    const json = JSON.stringify(data);

    console.log(json);
    this.isSaving = false;
    this.postQuestionnarie(data['oxygenUseTableForm']);
    this.hasDone=true;

  }

  constructor(
    private fb: FormBuilder,
    private operationsService: OperationsService,
    private lookupService: LookupService,
    private helperService: HelperService,
    private auditService: AuditService,
    private auth: AuthService
  ) {

    this.auditDTO = this.auditService.getSelectedAudit();
  }



  get formArray() {
    return <FormArray>this.appraisalApplyForm.get('oxygenUseTableForm');
  }

  ngOnInit() {

    this.user = this.auth.getUserDetails();


    this.oxygenConsumptionDataDTO = [];

    console.log('search ::::::::::::::: ' + JSON.stringify(this.search));

    this.appraisalApplyForm = this.fb.group({
      // fname: [null, [Validators.required, Validators.minLength(5)]],
      oxygenUseTableForm: this.fb.array([]),
    });

    console.log(this.appraisalApplyForm);
    this.getQuestionnarie();
  }

  getQuestionnarie() {

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {
      // this.lookupService
      //   .getAnswerOxygenConsumptionDataDTO(this.search)
      //   .subscribe((res: HttpResponse<OxygenConsumptionDataDTO[]>) => {
      //     this.oxygenConsumptionDataDTO = res.body;

      //     this.fill_appraisal_form_answer(this.oxygenConsumptionDataDTO);
      //   });
    } else {
      // this.lookupService
      //   .getQuestionariesFormS(this.search)
      //   .subscribe((res: HttpResponse<TableDetailsDTO[]>) => {
      //     this.tableDetailsDTOList = res.body;

      //     this.fill_appraisal_form_quations(this.tableDetailsDTOList);
      //   });
    }
  }

  addForm() {
    const control = <FormArray>this.appraisalApplyForm.controls['oxygenUseTableForm'];
    control.push(
      this.fb.group({
        serial_no: this.fb.control(''),
        description: this.fb.control(''),
        descriptionParameter: this.fb.control(''),
        noofPatients: this.fb.control(''),
        consumptionLitperMin: this.fb.control(''),
        consumptionLitperDay: this.fb.control(''),
        consumptionKLitperDay: this.fb.control(''),
        consumptionTotal: this.fb.control(''),
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
        noofPatients: '',
        consumptionLitperMin: '',
        consumptionLitperDay: '',
        consumptionKLitperDay: '',
        consumptionTotal: '',
      }
      this.data.push(local)

      this.formArray.at(i).patchValue(local);


    }
  }

  fill_appraisal_form_answer(oxygenConsumptionDataDTO: OxygenConsumptionDataDTO[]) {
    for (let i = 0; i < oxygenConsumptionDataDTO.length; i++) {

      if (this.formArray.length < oxygenConsumptionDataDTO.length) {
        this.addForm();
      }

      var local = {
        serial_no: i + 1,
        description: oxygenConsumptionDataDTO[i].description,
        descriptionParameter: oxygenConsumptionDataDTO[i].descriptionParameter,
        noofPatients: oxygenConsumptionDataDTO[i].noofPatients,
        consumptionLitperMin: oxygenConsumptionDataDTO[i].consumptionLitperMin,
        consumptionLitperDay: oxygenConsumptionDataDTO[i].consumptionLitperDay,
        consumptionKLitperDay: oxygenConsumptionDataDTO[i].consumptionKLitperDay,
        consumptionTotal: oxygenConsumptionDataDTO[i].consumptionTotal,
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
  postQuestionnarie(oxygenUseTableForm: any) {
    console.log("Posted data---------------------" + JSON.stringify(oxygenUseTableForm));

    if (this.crudOperation == 'edit' || this.crudOperation == 'view') {

      var oxygenConsumptionDataDTOTemp: OxygenConsumptionDataDTO[] = [];

      oxygenUseTableForm.forEach((tableQuestionsDTO, index) => {
        let local: OxygenConsumptionDataDTO = {
          id: this.oxygenConsumptionDataDTO[index].id,
          auditId: this.auditDTO.id,
          consumptionKLitperDay: oxygenUseTableForm[index].consumptionKLitperDay,
          consumptionLitperDay: oxygenUseTableForm[index].consumptionLitperDay,
          consumptionLitperMin: oxygenUseTableForm[index].consumptionLitperMin,
          consumptionTotal: oxygenUseTableForm[index].consumptionTotal,
          formName: this.search['formName.contains'],
          type: this.oxygenConsumptionDataDTO[index].type,
          subType: this.oxygenConsumptionDataDTO[index].subType,
          freeField2: '',
          freeField3: '',
          freeField1: '',
          lastModified: new Date().toISOString(),
          lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
          noofPatients: oxygenUseTableForm[index].noofPatients,
          tableDetailsId: this.oxygenConsumptionDataDTO[index].tableDetailsId,
          tableName: this.oxygenConsumptionDataDTO[index].tableName,
          description: oxygenUseTableForm[index].description,
          descriptionParameter: oxygenUseTableForm[index].descriptionParameter
        };

        oxygenConsumptionDataDTOTemp.push(local);
      });

      this.operationsService.createOxygenConsumptionData(oxygenConsumptionDataDTOTemp).subscribe(
        res => {
          console.log(res);
          this.isSaving = true;
          this.helperService.showSuccess('Oxygen Details Saved Successfully..');
        },

        err => {
          alert('something went wrong');
        }
      );
    } else {

      this.tableDetailsDTOList.forEach((tableQuestionsDTO, index) => {
        let local: OxygenConsumptionDataDTO = {
          id: oxygenUseTableForm[index].id,
          auditId: this.auditDTO.id,
          consumptionKLitperDay: oxygenUseTableForm[index].consumptionKLitperDay,
          consumptionLitperDay: oxygenUseTableForm[index].consumptionLitperDay,
          consumptionLitperMin: oxygenUseTableForm[index].consumptionLitperMin,
          consumptionTotal: oxygenUseTableForm[index].consumptionTotal,
          formName: this.search['formName.contains'],
          type: tableQuestionsDTO.type,
          subType: tableQuestionsDTO.subType,
          freeField2: '',
          freeField3: '',
          freeField1: '',
          lastModified: new Date().toISOString(),
          lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
          noofPatients: oxygenUseTableForm[index].noofPatients,
          tableDetailsId: tableQuestionsDTO.id,
          tableName: tableQuestionsDTO.tableName,
          description: oxygenUseTableForm[index].description,
          descriptionParameter: oxygenUseTableForm[index].descriptionParameter
        };

        this.oxygenConsumptionDataDTO.push(local);
      });

      this.operationsService.createOxygenConsumptionData(this.oxygenConsumptionDataDTO).subscribe(
        res => {
          console.log(res);
          this.helperService.showSuccess('Oxygen Details Saved Successfully..');
          this.oxygenConsumptionDataDTO;
        },
        err => {
          alert('something went wrong');
        }
      );
    }

  }
}
