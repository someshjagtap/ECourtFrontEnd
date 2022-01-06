import { LongDateFormatKey } from "moment";

export interface Form1ADTO{
  hospitalId ?: string;
  audit_id ?: string;
  serial_no?: string;
  District?: string;
  Name_of_Hospital?: string;
  hospital_type?: string;
  Level_of_Hosp_city?: string;
  Level_of_Hosp_District?: string;
  Sub_Dist?: string;
  Taluka?: string;
  Name_of_Head_of_Institiute?: string;
  Mobile_No_of_Head_of_Institiute?: string;
  email_of_Head_of_Institiute?: string;
  Name_of_Head_of_Oxygen_Facility?: string;
  Mobile_No_of_Head_of_Oxygen_Facility?: string;
  email_No_of_Head_of_Oxygen_Facility?: string;
  Oxygen_Bed_Sanctioned_nos?: string;
  ICU_Bed_nos?: string;
  Ventilator_Bed_nos?: string;
  Oxygen_Audit_Done?: string;
  Structural_Audit_Done?: string;
  Fire_Audit_Done?: string;
  Electricity_Audit_Done?: string;
  Remarks?: string;
  inspection_authority?: string;
  inspection_date?: string;
  number_of_audit_deficiencies_found?: number;
  number_of_audit_deficiencies_completed?: number
 }
