export interface InventoryReportInterface {
  schoolYear: string;
  semester: string;
  department: string;
  issuer?: string,
  issuedBy?: Record<any, any>;
  approval: Record<any, any>[];
}
