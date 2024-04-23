export interface Report {
    
    _id?: string;
    downloadedBy: string;
    role: object;
    department: object;
    location: string;
    selectedFilter: string;
    fileName: string;
    timeStamp: Date;
    disp?: boolean;
}