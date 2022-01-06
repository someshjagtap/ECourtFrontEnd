import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuditDTO } from '@shared/model/AuditDTO';
import { HelperService, OperationsService } from '@shared/services';
import { AuditService } from '@shared/services/audit.service';


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  auditDTO: AuditDTO;

  constructor(
    public dialogRef: MatDialogRef<SubmitComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private helperService: HelperService,
    private operationService: OperationsService,
    private router: Router,
    private auditService:AuditService,
    ) {}

  ngOnInit(): void {

    this.auditDTO=this.auditService.getSelectedAudit();

  }

  ok(){
    this.updateStatus();
    this.router.navigateByUrl('/public/startaudit');
    this.helperService.showSuccess("Form Submitted Successfully..")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStatus(){
    this.auditDTO.isForm1Status="COMPLETED";
    this.operationService.updateAuditStatus(this.auditDTO)
      .subscribe(res => {
      })
  }

}
