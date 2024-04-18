
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportDownloadService {
    private downloadRecords = new BehaviorSubject<any[]>([]);
    currentDownloadRecords = this.downloadRecords.asObservable();

    constructor() { }

    addDownloadRecord(record: any) {
        const currentRecords = this.downloadRecords.getValue();
        this.downloadRecords.next([...currentRecords, record]);
    }
}