export interface AuditDTO {
  id?: number;
  hospitalId?: number;
  auditDate?: Date;
  isAuditComplete?: boolean;
  securityUserLogin?: any;
  auditStatus?: any;
  noOfDeficienciesFound?: any;
  noOfDeficienciesCompleted?: any;
  freeField1?: string;
  freeField2?: any;
  freeField3?: any;
  freeField4?: any;
  isFormSStatus?: any;
  isRateRegulationStatus?: any;
  isOxygenMonitoringStatus?: any;
  isAnnexureStatus?: any;
  isForm1Status?: any;
  isForm2Status?: any;
  remark?: string;
  lastModified?: Date;
  lastModifiedBy?: string;
  hospName?: any;
  
}
