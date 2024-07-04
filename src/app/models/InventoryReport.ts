export interface InventoryReportInterface {
  _id: string;
  schoolYear: string;
  semester: string;
  department: string;
  issuer?: string,
  issuedBy?: Record<any, any>;
  approval: Record<any, any>[];
}
