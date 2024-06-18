export interface Transaction {
    transactionType: string;
    user: string;
    role: string;
    location: string;
    department: string;
    revision: {
        field: string;
        oldValue: string;
        newValue: string;
    }[];
    equipmentId: string;
}