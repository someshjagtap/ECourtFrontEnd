import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MtxDialog } from '@ng-matero/extensions';
import { AuditDTO } from '@shared/model/AuditDTO';
import { HelperService, OperationsService } from '@shared/services';
import { SubmitComponent } from '../submit/submit.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateFormAComponent implements OnInit {
  dataFromPreviousComp: { [k: string]: any; };
  data: any;
  auditId: any;
  crudOperation: String="create";
  auditDTO: AuditDTO;

  constructor(
    protected activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private mtxDialog: MtxDialog,
    private helperService: HelperService,
    private operationService: OperationsService
    )
  {
    this.dataFromPreviousComp=this.router.getCurrentNavigation().extras.state;
    if(this.dataFromPreviousComp!=null && this.dataFromPreviousComp["data"]){
      this.data=this.dataFromPreviousComp["data"];
      this.auditId=this.dataFromPreviousComp["auditId"];

      console.log(":::::::::::::::::"+JSON.stringify(history.state));
    }
  }
  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    return;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  updateStatus(){
    this.auditDTO.isFormSStatus="INREVIEW";
    this.operationService.updateAuditStatus(this.auditDTO)
      .subscribe(res => {
      })
  }
}
