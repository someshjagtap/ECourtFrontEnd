import { Injectable } from '@angular/core';
import { AuditDTO } from '@shared/model/AuditDTO';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  auditDTO: AuditDTO;

  setSelectedAudit(auditDTO: AuditDTO) {
    this.auditDTO=auditDTO;
  }

  getSelectedAudit() {
    return this.auditDTO;
  }

  clearAudit() {
    this.auditDTO=null;
  }
}
