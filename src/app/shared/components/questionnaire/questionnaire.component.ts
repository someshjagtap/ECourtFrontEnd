import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { AnnexureQuestionsDTO } from '@shared/model/AnnexureQuestionsDTO';
import { HttpResponse } from '@angular/common/http';
import { AnnexureAnswersDTO } from '@shared/model/annexureAnswersDTO';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';
import { UserDTO } from '@shared/model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class QuestionnaireComponent implements OnInit {
  annexureAnswersDTO: AnnexureAnswersDTO[];


  @Input() crudOperation: String;
  @Input() search: any;
  appraisalApplyForm: FormGroup;
  auditDTO: AuditDTO;
  readOnly: boolean = false;
  hasDone: boolean = false;
  invalid: boolean = true;
  isSaving = true;
  user: UserDTO;

  onClick(data): void {
    const json = JSON.stringify(data);

    console.log(json);
    this.isSaving = false;
    this.postQuestionnarie(data["questionnaireTableForm"]);
    this.hasDone = true;
  }

  constructor(private fb: FormBuilder,
    private operationsService: OperationsService,
    private auditService: AuditService,
    private lookupService: LookupService,
    private helperService: HelperService,
    private auth: AuthService,
    private router: Router,

  ) {

    this.auditDTO = this.auditService.getSelectedAudit();
  }

  factors: any;
  parameters: any;
  filtervar: any;
  disabled: boolean = true;

  annexureQuestionsDTOList: AnnexureQuestionsDTO[];

  data: any[] = [];

  get formArray() {
    return <FormArray>this.appraisalApplyForm.get('questionnaireTableForm');
  }

  ngOnInit() {

    this.user = this.auth.getUserDetails();

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }

    this.annexureAnswersDTO = [];

    console.log("search ::::::::::::::: " + JSON.stringify(this.search))

    this.appraisalApplyForm = this.fb.group({
      // fname: [null, [Validators.required, Validators.minLength(5)]],
      questionnaireTableForm: this.fb.array([]),
    });

    console.log(this.appraisalApplyForm);

    this.getQuestionnarie();
    //this.postQuestionnarie();

  }

  getQuestionnarie() {

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {

      this.readOnly = true;

      if (this.search['auditId.equals'] == null) {
        this.search['auditId.equals'] = this.auditDTO.id;
      }

      // this.lookupService.getQuestionariesAnswer(this.search).subscribe((res: HttpResponse<AnnexureAnswersDTO[]>) => {
      //   this.annexureAnswersDTO = res.body;

      //   this.fill_appraisal_form_answer(this.annexureAnswersDTO);
      // });
    } else {

      this.readOnly = false;

      // this.lookupService.getQuestionaries(this.search).subscribe((res: HttpResponse<AnnexureQuestionsDTO[]>) => {
      //   this.annexureQuestionsDTOList = res.body;

      //   this.fill_appraisal_form(this.annexureQuestionsDTOList);
      // });
    }


  }

  updateAuditStatusToProgress() {
    this.auditDTO.isAnnexureStatus = "INPROGRESS";
    this.auditDTO.auditStatus="INPROGRESS";
    this.operationsService.updateAuditStatus(this.auditDTO)
      .subscribe(res => {
      })
  }

  addForm() {
    const control = <FormArray>(
      this.appraisalApplyForm.controls['questionnaireTableForm']
    );
    control.push(
      this.fb.group({

        serial_no: this.fb.control(''),
        description: this.fb.control(''),
        compliance: this.fb.control(''),
        remarks: this.fb.control(''),

      })
    );
  }

  fill_appraisal_form_answer(annexureAnswersDTO: AnnexureAnswersDTO[]) {
    if(annexureAnswersDTO == null || annexureAnswersDTO.length == 0){
      this.hasDone = true;
    }
    for (let i = 0; i < annexureAnswersDTO.length; i++) {
      if (this.formArray.length < annexureAnswersDTO.length) {
        this.addForm();
      }

      var local = {
        id: annexureAnswersDTO[i].id,
        auditId: annexureAnswersDTO[i].auditId,
        formName: annexureAnswersDTO[i].formName,
        type: annexureAnswersDTO[i].type,
        subType: annexureAnswersDTO[i].subType,
        serial_no: annexureAnswersDTO[i].serialNo,
        description: annexureAnswersDTO[i].description,
        compliance: annexureAnswersDTO[i].compliance != null ? annexureAnswersDTO[i].compliance ? 'yes' : "no" : "",
        remarks: annexureAnswersDTO[i].remark,
      }

      this.data.push(local);

      this.formArray.at(i).patchValue(local);

    }
  }

  fill_appraisal_form(annexureQuestionsDTOList: AnnexureQuestionsDTO[]) {
    if(annexureQuestionsDTOList == null || annexureQuestionsDTOList.length == 0){
      this.hasDone = true;
    }
    for (let i = 0; i < annexureQuestionsDTOList.length; i++) {
      if (this.formArray.length < annexureQuestionsDTOList.length) {
        this.addForm();
      }
      var local = {
        serial_no: annexureQuestionsDTOList[i].serialNo,
        description: annexureQuestionsDTOList[i].description,
        compliance: "",
        remarks: "",
      };
      this.formArray.at(i).patchValue(local);

      this.data.push(local);
    }
  }

  submitApplyAppraisal(data) {
    let route = 'add-apply-appraisal';
    // let data = this.appraisalApplyForm.value;
    console.log(data);
    return;
  }
  //posting data
  postQuestionnarie(questionnaireTableForm: any[]) {
    if (this.crudOperation == 'edit' || this.crudOperation == 'view') {

      var annexureAnswersDTOTemp: AnnexureAnswersDTO[] = [];

      questionnaireTableForm.forEach((annexureAnswers, index) => {

        let local: AnnexureAnswersDTO = {
          id: this.annexureAnswersDTO[index].id,
          annexureQuestionsId: this.annexureAnswersDTO[index].annexureQuestionsId,
          auditId: this.auditDTO.id,
          comment: questionnaireTableForm[index].remarks,
          compliance: questionnaireTableForm[index].compliance == 'yes',
          createdBy: "",
          formName: this.annexureAnswersDTO[index].formName,
          serialNo: questionnaireTableForm[index].serial_no,
          description: questionnaireTableForm[index].description,
          freeField2: "",
          freeField3: "",
          freeField4: "",
          lastModified: new Date(),
          lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
          remark: questionnaireTableForm[index].remarks,
          subType: this.annexureAnswersDTO[index].subType,
          type: this.annexureAnswersDTO[index].type
        };

        annexureAnswersDTOTemp.push(local);
      });

      this.operationsService.createAnwsersOfQuestionaries(annexureAnswersDTOTemp).subscribe(
        res => {
          console.log(res);
          this.isSaving = true;
          this.helperService.showSuccess('Questionnaire Saved Successfully');
        },
        err => {
          alert('something went wrong')
        }
      );
    } else {
      //Create Mode
      this.annexureQuestionsDTOList.forEach((annexureQuestionsDTO, index) => {
        let local: AnnexureAnswersDTO = {
          id: questionnaireTableForm[index].id,
          annexureQuestionsId: annexureQuestionsDTO.id,
          auditId: this.auditDTO.id,
          comment: questionnaireTableForm[index].remarks,
          compliance: questionnaireTableForm[index].compliance == 'yes',
          createdBy: "",
          formName: this.search['formName.contains'],
          serialNo: questionnaireTableForm[index].serial_no,
          description: questionnaireTableForm[index].description,
          freeField2: "",
          freeField3: "",
          freeField4: "",
          lastModified: new Date(),
          lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
          remark: questionnaireTableForm[index].remarks,
          subType: annexureQuestionsDTO.subType,
          type: annexureQuestionsDTO.type
        }

        this.annexureAnswersDTO.push(local);
      });

      this.operationsService.createAnwsersOfQuestionaries(this.annexureAnswersDTO).subscribe(
        res => {
          console.log(res);
          this.helperService.showSuccess('Questionnaire Saved Successfully');
        },
        err => {
          alert('something went wrong')
        }
      );

      //Update Audit status to in progress
      if ("AnnexureABC" == this.search['formName.contains'] &&
        "A" == this.search['type.equals'] &&
        "Oxygen Manifold Supply System" == this.search['subType.equals']) {
        this.updateAuditStatusToProgress();
      }
    }


  }


}
