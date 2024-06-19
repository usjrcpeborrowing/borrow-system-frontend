export interface Transaction {
  _id?: string;
  transactionType: string;
  user: string;
  role: string;
  department: string;
  location: string;
  timeStamp: Date;
  equipmentId: string;
  disp?: boolean;
  revision: any[];
}
