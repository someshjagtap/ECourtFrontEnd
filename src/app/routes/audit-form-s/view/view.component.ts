import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { SubmitComponent } from '../submit/submit.component';

import {
  SupplierDTO,
  CityDTO,
  TalukaDTO,
  DistrictDTO,
  StateDTO,
  InventoryTypeDTO,
} from '@shared/model';
import { LookupService, OperationsService, HelperService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '@core/authentication/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class FormSViewComponent implements OnInit {

  detail: SupplierDTO;
  cityList: CityDTO[];
  talukaList: TalukaDTO[];
  districtList: DistrictDTO[];
  inventoryTypeLOV: InventoryTypeDTO[];
  stateList: StateDTO[];
  isSaving = false;
  disable: boolean = false;
  readOnly: boolean = true;
  crudOperation: String;
  search: any = {};
  dataFromPreviousComp: { [k: string]: any; };
  data: any;
  auditId: any;

  constructor(
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    public lookupService: LookupService,
    public operationService: OperationsService,
    public helperService: HelperService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {

    this.dataFromPreviousComp = this.router.getCurrentNavigation().extras.state;
    if (this.dataFromPreviousComp != null && this.dataFromPreviousComp["data"] != undefined) {

      console.log("In List dataFromPreviousComp:::::::::::::::::" + JSON.stringify(this.dataFromPreviousComp));
      this.data = this.dataFromPreviousComp["data"];
      this.crudOperation=this.dataFromPreviousComp["crudOperation"];
      this.readOnly=this.crudOperation == "View"?true:false;

      this.auditId = this.data["auditId"];
      console.log("In List data:::::::::::::::::" + JSON.stringify(this.auditId));
      console.log("In List data:::::::::::::::::" + JSON.stringify(this.data));
    }

  }

  ngOnInit() {

    // this.lookupService.queryDistrict().subscribe((resDist: HttpResponse<DistrictDTO[]>) => {
    //   this.districtList = resDist.body;
    // });

  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<SupplierDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  delete(id) {
    this.subscribeToSaveResponse(this.operationService.deleteSupplier(id));
  }

  deletObj(value: string) {
    delete this.search[value];
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
