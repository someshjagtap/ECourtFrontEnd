import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MtxDialog } from '@ng-matero/extensions';
import { AuditDTO } from '@shared/model/AuditDTO';
import { HelperService, OperationsService } from '@shared/services';
import { AuditService } from '@shared/services/audit.service';
import { SubmitComponent } from '../submit/submit.component';

@Component({
  selector: 'app-hospital-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateAnnexureABCComponent implements OnInit {
  auditDTO:AuditDTO;

  crudOperation:String="create";
  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private auditService:AuditService,
    private mtxDialog: MtxDialog,
    private helperService: HelperService,
    private operationService: OperationsService,
    public dialog: MatDialog,
    )
  {
     this.auditDTO=this.auditService.getSelectedAudit();

  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        //this.loadDetails(detail);
        console.info("Details comes from :"+JSON.stringify(detail));
      }

      console.info("Details comes from :"+JSON.stringify(detail));
    });
  }

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
}
