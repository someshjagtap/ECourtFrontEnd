import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SubmitComponent } from '../submit/submit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class AnnexureABCViewComponent implements OnInit {

  crudOperation: String = "view";
  dataFromPreviousComp: { [k: string]: any; };
  data: any;
  auditId: any;

  constructor(protected activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog,
  ) {

    this.dataFromPreviousComp = this.router.getCurrentNavigation().extras.state;
    if (this.dataFromPreviousComp != null && this.dataFromPreviousComp["data"] != undefined) {
      this.data = this.dataFromPreviousComp["data"];
      this.crudOperation = this.dataFromPreviousComp["crudOperation"];

    }
  }
  ngOnInit(): void {


    this.activatedRoute.data.subscribe(({ detail }) => {
      if (detail != null) {
        //this.loadDetails(detail);
        console.info("Details comes from :" + JSON.stringify(detail));
      }

      console.info("Details comes from :" + JSON.stringify(detail));
    });
  }

  onSubmit(form: NgForm): void {
    return;
  }

  onClick(form: NgForm): void {
    const json = JSON.stringify(form.value);

    console.log(json);
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

