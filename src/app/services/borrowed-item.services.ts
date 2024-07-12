import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class BorrowedItemsService {
    
    private borrowedItems = new BehaviorSubject<any[]>([]);
    currentBorrowedItems = this.borrowedItems.asObservable();

    token = localStorage.getItem('token');

    constructor(private http: HttpClient) {}

    addBorrowedItem(item: any) {
        const currentItems = this.borrowedItems.getValue();
        this.borrowedItems.next([...currentItems, item]);
    }

    getBorrowedList(){
        const headers = {
            Authorization: this.token as string,
        };
    
        return this.http.get<any>(environment.API_URL + '/api/borroweditems', { headers: { Authorization: this.token as string } }).pipe(
            map((response) => response.data),
            catchError(this.handleError)
        );
    }
    

    
    handleError(err: HttpErrorResponse) {
        return throwError(() => new Error(err.message));
    }
}