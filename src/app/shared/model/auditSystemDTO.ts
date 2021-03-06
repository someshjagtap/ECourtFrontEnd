/**
 * CovidCare API
 * CovidCare API documentation
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface AuditSystemDTO { 
    auditTypeId?: number;
    auditTypeName?: string;
    auditorName: string;
    defectCount?: number;
    defectFixCount?: number;
    hospitalId?: number;
    hospitalName?: string;
    id?: number;
    inspectionDate: Date;
    lastModified: Date;
    lastModifiedBy: string;
    remark?: string;
    status?: string;
    supplierId?: number;
    supplierName?: string;
}
