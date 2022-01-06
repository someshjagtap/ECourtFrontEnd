import { Component, Input, OnInit } from '@angular/core';
import { HelperService, LookupService, OperationsService } from '@shared/services';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InventorySupplierDetailsDTO } from '@shared/model/inventorySupplierDetailsDTO';
import { AuditService } from '@shared/services/audit.service';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuthService } from '@core/authentication/auth.service';
import { UserDTO } from '@shared/model';



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  detail: InventorySupplierDetailsDTO;

  isSaving = true;
  @Input() crudOperation: String;
  @Input() search: any;
  today = new Date();
  auditDTO: AuditDTO;
  formName: any;
  hasDone = false;
  isLoading = true;
  user: UserDTO;

  constructor(
    public lookupService: LookupService,
    public helperService: HelperService,
    public operationService: OperationsService,
    protected activatedRoute: ActivatedRoute,
    private location: Location,
    private auditService: AuditService,
    private auth: AuthService,
    private router: Router,
  ) {

    this.auditDTO = this.auditService.getSelectedAudit();


  };

  save() {
    this.isSaving = false;
    this.detail.formName = this.search["formName.contains"];
    this.detail.type = this.search["type.equals"];

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {

      if (this.detail.id != null) {
        this.subscribeToSaveResponse(this.operationService.updateInventoryReport(this.detail));
      } else {
        this.subscribeToSaveResponse(this.operationService.createInventoryReport(this.detail));
      }
    } else {
      this.subscribeToSaveResponse(this.operationService.createInventoryReport(this.detail));
    }

  }

  ngOnInit() {

    this.user = this.auth.getUserDetails();

    if (this.auditDTO == null) {
      this.router.navigateByUrl('/public/startaudit');
    }

    if (this.search['auditId.equals'] == null) {
      this.search['auditId.equals'] = this.auditDTO.id;
    }

    this.formName = this.search["formName.contains"];

    if (this.crudOperation == 'view' || this.crudOperation == 'edit') {
      // this.lookupService.queryInventorySupplierDetails(this.search).subscribe((type: HttpResponse<InventorySupplierDetailsDTO[]>) => {
      //   if (type.body.length > 0) {
      //     this.detail = type.body[0];
      //   } else {
      //     this.detail = this.initDTOWithDefaultValues();
      //   }

      // });
    } else {
      this.detail = this.initDTOWithDefaultValues();
    }

  }
  initDTOWithDefaultValues(): InventorySupplierDetailsDTO {
    return {
      auditId: this.auditDTO.id,
      formName: this.formName,
      freeField1: undefined,
      freeField2: undefined,
      freeField3: undefined,
      //id: undefined,
      lastModified: new Date().toISOString(),
      lastModifiedBy: this.user ? this.user.firstName + this.user.lastName : "NA",
      subType: undefined,
      supplierAddress: undefined,
      supplierContactName: undefined,
      supplierContactNameNumber: undefined,
      supplierName: undefined,
      tableName: undefined,
      type: this.search['type.equals'],
    };
  }


  handleEvent(): void {
    throw new Error('Method not implemented.');
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<InventorySupplierDetailsDTO>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = true;
    this.hasDone = true;
    this.isLoading = false;
    this.helperService.showSuccess('Inventory Details Saved Successfully');
  }

  previousState(): void {
    this.location.back();
  }

  private onSaveError() {
    this.isSaving = false;
    this.hasDone = false;
    this.helperService.showErrorMessage('There is Problem');
  }
}
