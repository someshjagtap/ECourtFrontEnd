import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BedInventoryDTO,
  BedTransactionDTO,
  HospitalDTO,
  InventoryDTO,
  InventoryUsedDTO,
  SupplierDTO,
  TransactionsDTO,
  TripDetailsDTO,
  TripDTO,
  UserAccessDTO,
  SecurityUserDTO,
  AuditSystemDTO,
  AuditTypeDTO,
  ContactDTO,
  ContactTypeDTO,
  UserDTO
} from '@shared/model';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuditFormSHospGenInfoDTO } from '@shared/model/auditFormSHospGenInfoDTO';
//import { AuditPatientMonitoringFormDTO } from '@shared/model/patientMonitorFormAMDTO';
import { patientMonitorFormAMDTO } from '@shared/model/patientMonitorFormAMDTO';
import { FireElectricalAuditDTO } from '@shared/model/fireElectricalAuditDTO';

import { InventorySupplierDetailsDTO } from '@shared/model/inventorySupplierDetailsDTO';
import { OxygenConsumptionDataDTO } from '@shared/model/listOxygenConsumptionDataDTO';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { InventoryReportDTO } from '@shared/model/inventoryReportDTO';
import { AuthService } from '@core/authentication/auth.service';
import { caseDTO } from '@shared/model/caseDTO';
import { HearingDTO } from '@shared/model/hearingDTO';





@Injectable({
  providedIn: 'root',
})
export class OperationsService {

  private SERVER_API_URL = environment.serviceUrl;
  private AUDIT_SERVER_API_URL = environment.auditServiceUrl;
  private ECOURT_SERVER_API_URL = environment.courtServiceUrl  ;

  constructor(private http: HttpClient, private authService: AuthService) { }

  convertDatesFromClient(req) {

    req.lastModified = new Date().toISOString();
    //TODO Need to implemet as per the login user
    let user: UserDTO = this.authService.getUserDetails();
    req.lastModifiedBy = user ? user.firstName + user.lastName : "NA";

    return req;
  }

  createHospital(project: HospitalDTO): Observable<HttpResponse<HospitalDTO>> {
    const obj = this.convertDatesFromClient(project);
    return this.http
      .post<HospitalDTO>(this.SERVER_API_URL + '/hospitals', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<HospitalDTO>) => res));
  }

  createAudit(data: any): Observable<HttpResponse<AuditFormSHospGenInfoDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .post<AuditFormSHospGenInfoDTO>(this.AUDIT_SERVER_API_URL + '/audit-form-s-hosp-gen-infos', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<AuditFormSHospGenInfoDTO>) => res));
  }

  updateAudit(data: any): Observable<HttpResponse<AuditFormSHospGenInfoDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .put<AuditFormSHospGenInfoDTO>(this.AUDIT_SERVER_API_URL + '/audit-form-s-hosp-gen-infos', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<AuditFormSHospGenInfoDTO>) => res));
  }

  createLMO(data: any): Observable<HttpResponse<FireElectricalAuditDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .post<FireElectricalAuditDTO>(this.AUDIT_SERVER_API_URL + '/fire-electrical-audits', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<FireElectricalAuditDTO>) => res));
  }

  updateLMO(data: any): Observable<HttpResponse<FireElectricalAuditDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .put<FireElectricalAuditDTO>(this.AUDIT_SERVER_API_URL + '/fire-electrical-audits', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<FireElectricalAuditDTO>) => res));
  }

  // Inventory Form

  createInventoryReport(data: any): Observable<HttpResponse<InventorySupplierDetailsDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .post<InventorySupplierDetailsDTO>(this.AUDIT_SERVER_API_URL + '/inventory-supplier-details', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<InventorySupplierDetailsDTO>) => res));
  }

  updateInventoryReport(data: any): Observable<HttpResponse<InventorySupplierDetailsDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .put<InventorySupplierDetailsDTO>(this.AUDIT_SERVER_API_URL + '/inventory-supplier-details', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<InventorySupplierDetailsDTO>) => res));
  }

  updateHospital(project: HospitalDTO): Observable<HttpResponse<HospitalDTO>> {
    const obj = this.convertDatesFromClient(project);
    return this.http
      .put<HospitalDTO>(this.SERVER_API_URL + '/hospitals', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<HospitalDTO>) => res));
  }

  createSupplier(project: SupplierDTO): Observable<HttpResponse<SupplierDTO>> {
    const obj = this.convertDatesFromClient(project);
    return this.http
      .post<SupplierDTO>(this.SERVER_API_URL + '/suppliers', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<SupplierDTO>) => res));
  }

  updateSupplier(project: SupplierDTO): Observable<HttpResponse<SupplierDTO>> {
    const obj = this.convertDatesFromClient(project);
    return this.http
      .put<SupplierDTO>(this.SERVER_API_URL + '/suppliers', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<SupplierDTO>) => res));
  }

  deleteSupplier(id: number): Observable<HttpResponse<SupplierDTO>> {

    return this.http
      .delete<SupplierDTO>(this.SERVER_API_URL + '/suppliers/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<SupplierDTO>) => res));
  }

  deleteHospital(id: number): Observable<HttpResponse<HospitalDTO>> {
    return this.http
      .delete<SupplierDTO>(this.SERVER_API_URL + '/hospitals/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<SupplierDTO>) => res));
  }

  // deleteProject(id: number): Observable<HttpResponse<ProjectDTO>> {
  //     return this.http.delete<ProjectDTO>(this.SERVER_API_URL + '/projects/' + id
  //         , { observe: 'response' }).pipe(map((res: HttpResponse<ProjectDTO>) => res));
  // }

  createInventory(project: InventoryDTO): Observable<HttpResponse<InventoryDTO>> {
    const obj = this.convertDatesFromClient(project);
    return this.http
      .post<InventoryDTO>(this.SERVER_API_URL + '/inventories', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<InventoryDTO>) => res));
  }

  createHospitalBedInventory(
    bedInventory: BedInventoryDTO
  ): Observable<HttpResponse<BedInventoryDTO>> {
    const obj = this.convertDatesFromClient(bedInventory);
    return this.http
      .post<BedInventoryDTO>(this.SERVER_API_URL + '/bed-inventories', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<BedInventoryDTO>) => res));
  }

  updateHospitalBedInventory(
    bedinventory: BedInventoryDTO
  ): Observable<HttpResponse<BedInventoryDTO>> {
    const obj = this.convertDatesFromClient(bedinventory);
    return this.http
      .put<BedInventoryDTO>(this.SERVER_API_URL + '/bed-inventories', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<BedInventoryDTO>) => res));
  }

  updateInventory(inventory: InventoryDTO): Observable<HttpResponse<InventoryDTO>> {
    const obj = this.convertDatesFromClient(inventory);
    return this.http
      .put<InventoryDTO>(this.SERVER_API_URL + '/inventories', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<InventoryDTO>) => res));
  }

  deleteInventory(id: number): Observable<HttpResponse<InventoryDTO>> {
    return this.http
      .delete<InventoryDTO>(this.SERVER_API_URL + '/inventories/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<InventoryDTO>) => res));
  }

  createTransacations(project: TransactionsDTO): Observable<HttpResponse<TransactionsDTO>> {
    const obj = this.convertDatesFromClient(project);
    return this.http
      .post<TransactionsDTO>(this.SERVER_API_URL + '/transactions', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TransactionsDTO>) => res));
  }

  updateTransacations(transactions: TransactionsDTO): Observable<HttpResponse<TransactionsDTO>> {
    const obj = this.convertDatesFromClient(transactions);
    return this.http
      .put<TransactionsDTO>(this.SERVER_API_URL + '/transactions', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TransactionsDTO>) => res));
  }

  deleteTransacation(id: number): Observable<HttpResponse<TransactionsDTO>> {
    return this.http
      .delete<TransactionsDTO>(this.SERVER_API_URL + '/transactions/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<TransactionsDTO>) => res));
  }
  updateTransactions(transactions: TransactionsDTO): Observable<HttpResponse<TransactionsDTO>> {
    const obj = this.convertDatesFromClient(transactions);
    return this.http
      .put<TransactionsDTO>(this.SERVER_API_URL + '/transactions', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TransactionsDTO>) => res));
  }
  createHospitalBedTransaction(
    bedInventory: BedTransactionDTO
  ): Observable<HttpResponse<BedTransactionDTO>> {
    const obj = this.convertDatesFromClient(bedInventory);
    return this.http
      .post<BedTransactionDTO>(this.SERVER_API_URL + '/bed-transactions', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<BedTransactionDTO>) => res));
  }
  updateHospitalBedTransaction(
    bedinventory: BedTransactionDTO
  ): Observable<HttpResponse<BedTransactionDTO>> {
    const obj = this.convertDatesFromClient(bedinventory);
    return this.http
      .put<BedTransactionDTO>(this.SERVER_API_URL + '/bed-transactions', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<BedTransactionDTO>) => res));
  }
  deleteBedTransaction(id: number): Observable<HttpResponse<BedTransactionDTO>> {
    return this.http
      .delete<BedTransactionDTO>(this.SERVER_API_URL + '/bed-transactions/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<BedTransactionDTO>) => res));
  }
  createInventoryUsed(bedInventory: InventoryUsedDTO): Observable<HttpResponse<InventoryUsedDTO>> {
    const obj = this.convertDatesFromClient(bedInventory);
    return this.http
      .post<InventoryUsedDTO>(this.SERVER_API_URL + '/inventory-useds', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<InventoryUsedDTO>) => res));
  }
  updateInventoryUsed(bedinventory: InventoryUsedDTO): Observable<HttpResponse<InventoryUsedDTO>> {
    const obj = this.convertDatesFromClient(bedinventory);
    return this.http
      .put<BedTransactionDTO>(this.SERVER_API_URL + '/inventory-useds', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<InventoryUsedDTO>) => res));
  }
  deleteInventoryUsed(id: number): Observable<HttpResponse<InventoryUsedDTO>> {
    return this.http
      .delete<InventoryUsedDTO>(this.SERVER_API_URL + '/inventory-useds/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<InventoryUsedDTO>) => res));
  }

  createTrip(bedInventory: TripDTO): Observable<HttpResponse<TripDTO>> {
    const obj = this.convertDatesFromClient(bedInventory);
    return this.http
      .post<TripDTO>(this.SERVER_API_URL + '/trips', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TripDTO>) => res));
  }
  updateTrip(param: TripDTO): Observable<HttpResponse<TripDTO>> {
    const obj = this.convertDatesFromClient(param);
    return this.http
      .put<TripDTO>(this.SERVER_API_URL + '/trips', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TripDTO>) => res));
  }

  createTripDetails(param: TripDetailsDTO): Observable<HttpResponse<TripDetailsDTO>> {
    const obj = this.convertDatesFromClient(param);
    return this.http
      .post<TripDetailsDTO>(this.SERVER_API_URL + '/trip-details', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TripDetailsDTO>) => res));
  }

  createCase(param: caseDTO): Observable<HttpResponse<caseDTO>> {
    const obj = this.convertDatesFromClient(param);
    return this.http
      .post<caseDTO>(this.ECOURT_SERVER_API_URL + '/court-cases', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<caseDTO>) => res));
  }

  createHearing(param: HearingDTO): Observable<HttpResponse<HearingDTO>> {
    const obj = this.convertDatesFromClient(param);
    return this.http
      .post<HearingDTO>(this.ECOURT_SERVER_API_URL + '/hearings', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<HearingDTO>) => res));
  }

  updateCase(param: caseDTO): Observable<HttpResponse<caseDTO>> {
    const obj = this.convertDatesFromClient(param);
    return this.http
      .put<caseDTO>(this.ECOURT_SERVER_API_URL + `/court-cases/${obj.id}`, obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<caseDTO>) => res));
  }

  updateHearing(param: HearingDTO): Observable<HttpResponse<HearingDTO>> {
    const obj = this.convertDatesFromClient(param);
    return this.http
      .put<HearingDTO>(this.ECOURT_SERVER_API_URL + `/hearings/${obj.id}`, obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<HearingDTO>) => res));
  }

  updateAuditStatus(param: AuditDTO): Observable<HttpResponse<AuditDTO>> {
    const obj = this.convertDatesFromClient(param);
    let dt = new Date(param.auditDate);
    param.auditDate = new Date(dt.getTime() + (1000 * 60 * 60 * 24));
    return this.http
      .put<AuditDTO>(this.AUDIT_SERVER_API_URL + '/audits', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<AuditDTO>) => res));
  }

  updateTripDetails(bedinventory: TripDetailsDTO): Observable<HttpResponse<TripDetailsDTO>> {
    const obj = this.convertDatesFromClient(bedinventory);
    return this.http
      .put<TripDetailsDTO>(this.SERVER_API_URL + '/trip-details', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<TripDetailsDTO>) => res));
  }

  createUserAccess(bedInventory: UserAccessDTO): Observable<HttpResponse<UserAccessDTO>> {
    const obj = this.convertDatesFromClient(bedInventory);
    return this.http
      .post<UserAccessDTO>(this.SERVER_API_URL + '/user-accesses', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<UserAccessDTO>) => res));
  }
  updateUserAccess(bedinventory: UserAccessDTO): Observable<HttpResponse<UserAccessDTO>> {
    const obj = this.convertDatesFromClient(bedinventory);
    return this.http
      .put<UserAccessDTO>(this.SERVER_API_URL + '/user-accesses', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<UserAccessDTO>) => res));
  }
  deleteUserAccess(id: number): Observable<HttpResponse<UserAccessDTO>> {
    return this.http
      .delete<UserAccessDTO>(this.SERVER_API_URL + '/user-accesses/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<UserAccessDTO>) => res));
  }

  createSecurityUser(objVal: InventoryUsedDTO): Observable<HttpResponse<SecurityUserDTO>> {
    const obj = this.convertDatesFromClient(objVal);
    return this.http
      .post<SecurityUserDTO>(this.SERVER_API_URL + '/security-users', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<SecurityUserDTO>) => res));
  }
  updateSecurityUser(objVal: SecurityUserDTO): Observable<HttpResponse<SecurityUserDTO>> {
    const obj = this.convertDatesFromClient(objVal);
    return this.http
      .put<SecurityUserDTO>(this.SERVER_API_URL + '/security-users', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<SecurityUserDTO>) => res));
  }
  deleteSecurityUser(id: number): Observable<HttpResponse<SecurityUserDTO>> {
    return this.http
      .delete<SecurityUserDTO>(this.SERVER_API_URL + '/security-users/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<SecurityUserDTO>) => res));
  }

  changePassword(newPassword: string, currentPassword: string): Observable<{}> {
    return this.http.post(this.SERVER_API_URL + '/account/change-password', {
      currentPassword,
      newPassword,
    });
  }

  createAuditSystem(objVal: AuditSystemDTO): Observable<HttpResponse<AuditSystemDTO>> {
    const obj = this.convertDatesFromClient(objVal);
    return this.http
      .post<AuditSystemDTO>(this.SERVER_API_URL + '/audit-systems', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<AuditSystemDTO>) => res));
  }
  updateAuditSystem(objVal: AuditSystemDTO): Observable<HttpResponse<AuditSystemDTO>> {
    const obj = this.convertDatesFromClient(objVal);
    return this.http
      .put<AuditSystemDTO>(this.SERVER_API_URL + '/audit-systems', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<AuditSystemDTO>) => res));
  }
  deleteAuditSystem(id: number): Observable<HttpResponse<AuditSystemDTO>> {
    return this.http
      .delete<AuditSystemDTO>(this.SERVER_API_URL + '/audit-systems/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<AuditSystemDTO>) => res));
  }

  deleteCase(id: number): Observable<HttpResponse<caseDTO>> {
    return this.http
      .delete<caseDTO>(this.ECOURT_SERVER_API_URL + '/court-cases/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<caseDTO>) => res));
  }

  createContact(objVal: ContactDTO): Observable<HttpResponse<ContactDTO>> {
    const obj = this.convertDatesFromClient(objVal);
    return this.http
      .post<ContactDTO>(this.SERVER_API_URL + '/contacts', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<ContactDTO>) => res));
  }
  updateContact(objVal: SecurityUserDTO): Observable<HttpResponse<ContactDTO>> {
    const obj = this.convertDatesFromClient(objVal);
    return this.http
      .put<ContactDTO>(this.SERVER_API_URL + '/contacts', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<ContactDTO>) => res));
  }
  deleteContact(id: number): Observable<HttpResponse<ContactDTO>> {
    return this.http
      .delete<ContactDTO>(this.SERVER_API_URL + '/contacts/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<ContactDTO>) => res));
  }


  createAnwsersOfQuestionaries(data: any) {
    const obj = this.convertDatesFromClient(data);
    return this.http.post<any>(this.AUDIT_SERVER_API_URL + "/annexure-answers/list", obj)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  oxygenConsumptionDataFormSTable(data: any) {
    const obj = this.convertDatesFromClient(data);

    return this.http.post<any>(this.AUDIT_SERVER_API_URL + "/oxygen-consumption-data", obj)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  // Oxygen Consumption Table

  createOxygenConsumptionData(data: any): Observable<HttpResponse<OxygenConsumptionDataDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .post<OxygenConsumptionDataDTO>(this.AUDIT_SERVER_API_URL + '/oxygen-consumption-data/list', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<OxygenConsumptionDataDTO>) => res));
  }

  // updateOxygenConsumptionData(data: any, id: number): Observable<HttpResponse<OxygenConsumptionDataDTO>> {
  //   const obj = this.convertDatesFromClient(data);
  //   return this.http
  //     .put<OxygenConsumptionDataDTO>(this.AUDIT_SERVER_API_URL + '/oxygen-consumption-data/list', obj, { observe: 'response' })
  //     .pipe(map((res: HttpResponse<OxygenConsumptionDataDTO>) => res));
  // }

  updateOxygenConsumptionData(data: any, id: number): Observable<HttpResponse<OxygenConsumptionDataDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .put<OxygenConsumptionDataDTO>(this.SERVER_API_URL + '/oxygen-consumption-data/list', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<OxygenConsumptionDataDTO>) => res));
  }

  //Inventory table

  createInventoryTableReport(data: any): Observable<HttpResponse<InventoryReportDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .post<InventoryReportDTO>(this.AUDIT_SERVER_API_URL + '/inventory-reports/list', obj, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<InventoryReportDTO>) => res));
  }


  updateInventoryTableReport(data: any, id: number): Observable<HttpResponse<InventoryReportDTO>> {
    const obj = this.convertDatesFromClient(data);
    return this.http
      .put<InventoryReportDTO>(this.SERVER_API_URL + '/inventory-reports', obj, { observe: 'response' })
      .pipe(map((res: HttpResponse<InventoryReportDTO>) => res));
  }

  //monitor form AM
  createMonitorForm(data: any) {
    const obj = this.convertDatesFromClient(data);
    return this.http.post<any>(this.AUDIT_SERVER_API_URL + "/patient-monitor-form-ams", data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  //monitorform PM
  createMonitorFormPM(data: any) {
    const obj = this.convertDatesFromClient(data);
    return this.http.post<any>(this.AUDIT_SERVER_API_URL + "/patient-monitor-form-pms", data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  //form1B
  createFormOneB(data: any) {

    return this.http.post<any>(this.AUDIT_SERVER_API_URL + "/form-bs", data)
      .pipe(map((res: any) => {
        return res;
      }))

  }


  //rate regulation
  createRateRegulationForm(data: any) {

    return this.http.post<any>(this.AUDIT_SERVER_API_URL + "/rate-regulations", data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

}
