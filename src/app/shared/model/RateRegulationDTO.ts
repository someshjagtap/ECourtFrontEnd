export interface RateRegulationDTO{
submissionDate?: string
totalNumCovidIsoBeds?: number
eightyIsoBedsUnderRegulation?: number
totalNumCovidPatientAdmitted?: number
 patientAdmitAgainstEightyIsoBeds?: number

patientsDischargedAgainstEightyIsoBeds?: number

patientsRcvdRegularisedBill?: number
patientsNotRcvdRegularisedBill?: number
patientReceivedRevisedBills?: number
patientReceivedReimbursement?: number
totalAmountReimbursed?: number
numPatientsReceivedReimbursment?: number
amountReimbursed?: number
amountNotReimbursed?: number
auditId?: number
auditorRemark?: string
complianceStatus?: boolean
freeField1?: string
freeField2?: string
freeField3?: string
freeField4?: string
id?: number
lastModified?: string
lastModifiedBy?: string
}
