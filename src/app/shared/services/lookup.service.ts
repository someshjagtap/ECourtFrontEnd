import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BedInventoryDTO,
  BedTransactionDTO,
  BedTypeDTO,
  CityDTO,
  DistrictDTO,
  DivisionDTO,
  HospitalDTO,
  HospitalTypeDTO,
  InventoryDTO,
  InventoryMasterDTO,
  InventoryTypeDTO,
  InventoryUsedDTO,
  MunicipalCorpDTO,
  StateDTO,
  SupplierDTO, TransactionsDTO,
  TripDetailsDTO,
  TripDTO,
  UserAccessDTO,
  VehiclesDTO,
  SecurityUserDTO,
  AuditSystemDTO,
  AuditTypeDTO,
  ContactDTO,
  ContactTypeDTO
} from '@shared/model';
import { AnnexureAnswersDTO } from '@shared/model/annexureAnswersDTO';
import { AnnexureQuestionsDTO } from '@shared/model/AnnexureQuestionsDTO';
import { AuditDTO } from '@shared/model/AuditDTO';
import { AuditFormSHospGenInfoDTO } from '@shared/model/auditFormSHospGenInfoDTO';
import { patientMonitorFormAMDTO } from '@shared/model/patientMonitorFormAMDTO';
//import { AuditPatientMonitoringFormDTO } from '@shared/model/patientMonitorFormAMDTO';
import { patientMonitorFormPMDTO } from '@shared/model/patientMonitorFormPMDTO';
import { FormBDTO } from '@shared/model/FormBDTO';
import { InventorySupplierDetailsDTO } from '@shared/model/inventorySupplierDetailsDTO';
import { OxygenConsumptionDataDTO } from '@shared/model/oxygenConsumptionDataDTO';
import { QuationariesAuditListDTO } from '@shared/model/QuationariesAuditListDTO';
import { RateRegulationDTO } from '@shared/model/RateRegulationDTO';
import { TableDetailsDTO } from '@shared/model/tableDetailsDTO';
import {
  createRequestOptionAllRecords
} from 'app/shared/utils/request-util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { InventoryReportDTO } from '@shared/model/inventoryReportDTO';
import { FireElectricalAuditDTO } from '@shared/model/fireElectricalAuditDTO';
import { caseDTO } from '@shared/model/caseDTO';
import { HearingDTO } from '@shared/model/hearingDTO';


@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private SERVER_API_URL = environment.serviceUrl;
  private AUDIT_SERVER_API_URL = environment.auditServiceUrl;
  private COURT_SERVER_API_URL = environment.courtServiceUrl;
  createRequestOptionAllRecords;

  constructor(private http: HttpClient) {}

  /**  Query Methods  STARTS */

  checkParameterType(req) {
    return createRequestOptionAllRecords(req);
  }

//   queryDivisions(req?: any): Observable<HttpResponse<DivisionDTO[]>> {
//     return this.http.get<DivisionDTO[]>(this.SERVER_API_URL + '/divisions', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryDistrict(req?: any): Observable<HttpResponse<DistrictDTO[]>> {
//     return this.http.get<DistrictDTO[]>(this.SERVER_API_URL + '/districts', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getDistrict(id: number): Observable<HttpResponse<DistrictDTO>> {
//     return this.http.get<DistrictDTO>(this.SERVER_API_URL + '/districts/' + id, {
//       observe: 'response',
//     });
//   }

//   queryHospitals(req?: any): Observable<HttpResponse<HospitalDTO[]>> {
//     return this.http.get<HospitalDTO[]>(this.SERVER_API_URL + '/hospitals', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryAuditFormSGeneralInfoList(req?: any): Observable<HttpResponse<AuditFormSHospGenInfoDTO[]>> {
//     return this.http.get<AuditFormSHospGenInfoDTO[]>(this.AUDIT_SERVER_API_URL + '/audit-form-s-hosp-gen-infos', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getAuditFormSGeneralInfo(req?: any,auditId?:number): Observable<HttpResponse<AuditFormSHospGenInfoDTO>> {
//     return this.http.get<AuditFormSHospGenInfoDTO>(this.AUDIT_SERVER_API_URL + '/audit-form-s-hosp-gen-infos/'+auditId, {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }


//   queryAuditFormAGeneralInfo(req?: any): Observable<HttpResponse<AuditFormSHospGenInfoDTO[]>> {
//     return this.http.get<AuditFormSHospGenInfoDTO[]>(this.AUDIT_SERVER_API_URL + '/audit-form-s-hosp-gen-infos', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryAnnexureABCGeneralInfo(req?: any): Observable<HttpResponse<AuditFormSHospGenInfoDTO[]>> {
//     return this.http.get<AuditFormSHospGenInfoDTO[]>(this.AUDIT_SERVER_API_URL + '/audit-form-s-hosp-gen-infos', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }
//   queryAudits(req?: any): Observable<HttpResponse<AuditDTO[]>> {
//     return this.http.get<AuditDTO[]>(this.AUDIT_SERVER_API_URL + '/audits', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

  queryCases(req?: any): Observable<HttpResponse<caseDTO[]>> {
    return this.http.get<caseDTO[]>(this.COURT_SERVER_API_URL + '/court-cases', {
      params: this.checkParameterType(req),
      observe: 'response',
    });
  }

  queryHearing(req?: any): Observable<HttpResponse<HearingDTO[]>> {
    return this.http.get<HearingDTO[]>(this.COURT_SERVER_API_URL + '/hearings', {
      params: this.checkParameterType(req),
      observe: 'response',
    });
  }

  casebyId(id: number): Observable<HttpResponse<caseDTO>> {
    return this.http
      .get<caseDTO>(this.COURT_SERVER_API_URL + '/court-cases/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res));
  }

  hearingbyId(id: number): Observable<HttpResponse<HearingDTO>> {
    return this.http
      .get<HearingDTO>(this.COURT_SERVER_API_URL + '/hearings/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res));
  }

//   getHospital(id: number): Observable<HttpResponse<HospitalDTO>> {
//     return this.http.get<HospitalDTO>(this.SERVER_API_URL + '/hospitals/' + id, {
//       observe: 'response',
//     });
//   }


//table B
  // getQuestionaries(req?: any): Observable<HttpResponse<AnnexureQuestionsDTO[]>> {
  //   return this.http.get<AnnexureQuestionsDTO[]>(this.AUDIT_SERVER_API_URL+'/annexure-questions/', {
  //     params: this.checkParameterType(req),
  //     observe: 'response',
  //   });
  // }

//   getQuestionariesAnswer(req?: any): Observable<HttpResponse<AnnexureAnswersDTO[]>> {
//     return this.http.get<AnnexureAnswersDTO[]>(this.AUDIT_SERVER_API_URL+'/annexure-answers/all', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }




//   //modified for formS table
//   getQuestionariesFormS(req?: any): Observable<HttpResponse<TableDetailsDTO[]>> {
//     return this.http.get<TableDetailsDTO[]>(this.AUDIT_SERVER_API_URL+'/table-details', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryHospitalType(req?: any): Observable<HttpResponse<HospitalTypeDTO[]>> {
//     return this.http.get<HospitalTypeDTO[]>(this.SERVER_API_URL + '/hospital-types', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryHospitalsById(req?: any): Observable<HttpResponse<HospitalDTO[]>> {
//     return this.http.get<HospitalDTO[]>(this.SERVER_API_URL + '/hospitals', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   //inventory-supplier-details
//   queryInventorySupplierDetails(req?: any): Observable<HttpResponse<InventorySupplierDetailsDTO[]>> {
//     return this.http.get<InventorySupplierDetailsDTO[]>(this.AUDIT_SERVER_API_URL + '/inventory-supplier-details', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getfireelectricalaudits(req?: any): Observable<HttpResponse<FireElectricalAuditDTO[]>> {
//     return this.http.get<FireElectricalAuditDTO[]>(this.AUDIT_SERVER_API_URL + '/fire-electrical-audits', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }


//   queryInventoryMaster(req?: any): Observable<HttpResponse<InventoryMasterDTO[]>> {
//     return this.http.get<InventoryMasterDTO[]>(this.SERVER_API_URL + '/inventory-masters', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryBedTypes(req?: any): Observable<HttpResponse<BedTypeDTO[]>> {
//     return this.http.get<BedTypeDTO[]>(this.SERVER_API_URL + '/bed-types', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   // getCumulativeSpendPerAccount(id: number): Observable<HttpResponse<any>> {
//   //     return this.http.get<any>(this.SERVER_API_URL + '/graphs/cumulativespend/' + id, { observe: 'response' })
//   //         .pipe(map((res: HttpResponse<any>) => res));
//   // }

//   queryInventoryList(req?: any): Observable<HttpResponse<InventoryDTO[]>> {
//     return this.http.get<InventoryDTO[]>(this.SERVER_API_URL + `/inventories`, {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryTransacationsList(req?: any): Observable<HttpResponse<TransactionsDTO[]>> {
//     return this.http.get<TransactionsDTO[]>(this.SERVER_API_URL + `/transactions`, {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryBedInventories(req?: any): Observable<HttpResponse<BedInventoryDTO[]>> {
//     return this.http.get<BedInventoryDTO[]>(this.SERVER_API_URL + `/bed-inventories`, {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryTaluka(req?: any): Observable<HttpResponse<DistrictDTO[]>> {
//     return this.http.get<DistrictDTO[]>(this.SERVER_API_URL + '/talukas', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryCity(req?: any): Observable<HttpResponse<CityDTO[]>> {
//     return this.http.get<CityDTO[]>(this.SERVER_API_URL + '/cities', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getInventory(id: number): Observable<HttpResponse<InventoryDTO>> {
//     return this.http
//       .get<InventoryDTO>(this.SERVER_API_URL + '/inventories/' + id, { observe: 'response' })
//       .pipe(map((res: HttpResponse<any>) => res));
//   }

//   getBedInventory(id: number): Observable<HttpResponse<BedInventoryDTO>> {
//     return this.http
//       .get<BedInventoryDTO>(this.SERVER_API_URL + '/bed-inventories/' + id, { observe: 'response' })
//       .pipe(map((res: HttpResponse<any>) => res));
//   }

//   getInventoryMaster(id: number): Observable<HttpResponse<InventoryMasterDTO>> {
//     return this.http
//       .get<InventoryMasterDTO>(this.SERVER_API_URL + '/inventory-masters/' + id, {
//         observe: 'response',
//       })
//       .pipe(map((res: HttpResponse<any>) => res));
//   }

//   queryInventoryTypes(req?: any): Observable<HttpResponse<InventoryTypeDTO[]>> {
//     return this.http.get<InventoryTypeDTO[]>(this.SERVER_API_URL + '/inventory-types', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getInventoryType(id: number): Observable<HttpResponse<any>> {
//     return this.http
//       .get<InventoryTypeDTO>(this.SERVER_API_URL + '/inventory-types/' + id, {
//         observe: 'response',
//       })
//       .pipe(map((res: HttpResponse<any>) => res));
//   }

//   queryMunCorp(req?: any): Observable<HttpResponse<MunicipalCorpDTO[]>> {
//     return this.http.get<MunicipalCorpDTO[]>(this.SERVER_API_URL + '/municipal-corps', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryState(req?: any): Observable<HttpResponse<StateDTO[]>> {
//     return this.http.get<StateDTO[]>(this.SERVER_API_URL + '/states', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   querySupplierList(req?: any): Observable<HttpResponse<SupplierDTO[]>> {
//     return this.http.get<SupplierDTO[]>(this.SERVER_API_URL + '/suppliers', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryHospitalById(id: number): Observable<HttpResponse<HospitalDTO>> {
//     return this.http
//       .get<HospitalDTO>(this.SERVER_API_URL + '/hospitals/' + id, { observe: 'response' })
//       .pipe(map((res: HttpResponse<HospitalDTO>) => res));
//   }

//   querySupplier(id: number): Observable<HttpResponse<SupplierDTO>> {
//     return this.http
//       .get<SupplierDTO>(this.SERVER_API_URL + '/suppliers/' + id, { observe: 'response' })
//       .pipe(map((res: HttpResponse<any>) => res));
//   }

//   queryHospital(id: number): Observable<HttpResponse<BedTransactionDTO>> {
//     return this.http
//       .get<BedTransactionDTO>(this.SERVER_API_URL + '/hospitals/' + id, { observe: 'response' })
//       .pipe(map((res: HttpResponse<BedTransactionDTO>) => res));
//   }
//   queryBedTransaction(req?: any): Observable<HttpResponse<BedTransactionDTO[]>> {
//     return this.http.get<BedTransactionDTO[]>(this.SERVER_API_URL + '/bed-transactions', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryInventoryUsed(req?: any): Observable<HttpResponse<InventoryUsedDTO[]>> {
//     return this.http.get<InventoryUsedDTO[]>(this.SERVER_API_URL + '/inventory-useds', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryTankers(): Observable<HttpResponse<any>> {
//     return this.http
//       .post<any>(environment.mobaUrl, {
//         cmd: 'api_vehicles',
//         api_key: '83810f53da6f4ee076345b8660fff8de',
//       }, { observe: 'response' })
//       .pipe(map((res: HttpResponse<VehiclesDTO>) => res));
//   }

//   queryTrips(req?: any): Observable<HttpResponse<TripDTO[]>> {
//     return this.http.get<TripDTO[]>(this.SERVER_API_URL + '/trips', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getTrip(id: number): Observable<HttpResponse<TripDTO>> {
//     return this.http.get<TripDTO>(this.SERVER_API_URL + '/trips/' + id, {
//       observe: 'response',
//     });
//   }

//   queryTripDetails(req?: any): Observable<HttpResponse<TripDetailsDTO[]>> {
//     return this.http.get<TripDetailsDTO[]>(this.SERVER_API_URL + '/trip-details', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getTripDetails(id: number): Observable<HttpResponse<TripDetailsDTO>> {
//     return this.http.get<TripDetailsDTO>(this.SERVER_API_URL + '/trip-details/' + id, {
//       observe: 'response',
//     });
//   }


  queryUserAccess(req?: any): Observable<HttpResponse<UserAccessDTO[]>> {
    return this.http.get<UserAccessDTO[]>(this.SERVER_API_URL + '/user-accesses', {
      params: this.checkParameterType(req),
      observe: 'response',
    });
  }

  querySecurityUser(id: number): Observable<HttpResponse<SecurityUserDTO>> {
    return this.http.get<SecurityUserDTO>(this.SERVER_API_URL + '/security-users/' + id, {
      observe: 'response',
    });
  }

//   queryAuditSystems(req?: any): Observable<HttpResponse<AuditSystemDTO[]>> {
//     return this.http.get<AuditSystemDTO[]>(this.SERVER_API_URL + '/audit-systems', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getAuditSystem(id: number): Observable<HttpResponse<AuditSystemDTO>> {
//     return this.http.get<AuditSystemDTO>(this.SERVER_API_URL + '/audit-systems/' + id, {
//       observe: 'response',
//     });
//   }

//   queryAuditTypes(req?: any): Observable<HttpResponse<AuditTypeDTO[]>> {
//     return this.http.get<AuditTypeDTO[]>(this.SERVER_API_URL + '/audit-types', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryContacts(req?: any): Observable<HttpResponse<ContactDTO[]>> {
//     return this.http.get<ContactDTO[]>(this.SERVER_API_URL + '/contacts', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getContact(id: number): Observable<HttpResponse<ContactDTO>> {
//     return this.http.get<ContactDTO>(this.SERVER_API_URL + '/contacts/' + id, {
//       observe: 'response',
//     });
//   }

//   queryContactTypes(req?: any): Observable<HttpResponse<ContactTypeDTO[]>> {
//     return this.http.get<ContactTypeDTO[]>(this.SERVER_API_URL + '/contact-types', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }


// //Inventory table
//   getQuestionInventoryReportTable(req?: any): Observable<HttpResponse<TableDetailsDTO[]>> {
//     return this.http.get<TableDetailsDTO[]>(this.AUDIT_SERVER_API_URL+'/table-details', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getInventoryReportDTO(req?: any): Observable<HttpResponse<InventoryReportDTO[]>> {
//     return this.http.get<InventoryReportDTO[]>(this.AUDIT_SERVER_API_URL+'/inventory-reports/all', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   // Oxygen Consumption

//   getAnswerOxygenConsumptionDataDTO(req?: any): Observable<HttpResponse<OxygenConsumptionDataDTO[]>> {
//     return this.http.get<OxygenConsumptionDataDTO[]>(this.AUDIT_SERVER_API_URL+'/oxygen-consumption-data/all', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getAllAnnexureAnswersForAudit(req?: any): Observable<HttpResponse<QuationariesAuditListDTO[]>> {
//     return this.http.get<QuationariesAuditListDTO[]>(this.AUDIT_SERVER_API_URL+'/annexure-answers/audit', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getQuestionInventoryTableDTO(req?: any): Observable<HttpResponse<TableDetailsDTO[]>> {
//     return this.http.get<TableDetailsDTO[]>(this.AUDIT_SERVER_API_URL+'/table-details', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   getAnswerInventoryTableDTO(req?: any): Observable<HttpResponse<OxygenConsumptionDataDTO[]>> {
//     return this.http.get<OxygenConsumptionDataDTO[]>(this.AUDIT_SERVER_API_URL+'/inventory-reports/all', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

//   queryAuditPatientMonitoringForms(req?: any): Observable<HttpResponse<patientMonitorFormAMDTO[]>> {
//     return this.http.get<patientMonitorFormAMDTO[]>(this.AUDIT_SERVER_API_URL + '/patient-monitor-form-ams', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }
// //PM
//   queryAuditPatientMonitoringFormsPM(req?: any): Observable<HttpResponse<patientMonitorFormPMDTO[]>> {
//     return this.http.get<patientMonitorFormPMDTO[]>(this.AUDIT_SERVER_API_URL + '/patient-monitor-form-pms', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }


//   //FormONEB
//   queryFormOneB(req?: any): Observable<HttpResponse<FormBDTO[]>> {
//     return this.http.get<FormBDTO[]>(this.AUDIT_SERVER_API_URL + '/form-bs', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }


// //rate regulation
//   queryRateRegulationForms(req?: any): Observable<HttpResponse<RateRegulationDTO[]>> {
//     return this.http.get<RateRegulationDTO[]>(this.AUDIT_SERVER_API_URL + '/rate-regulations', {
//       params: this.checkParameterType(req),
//       observe: 'response',
//     });
//   }

}
