import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BorrowedItemsService {
  private borrowedItems = new BehaviorSubject<any[]>([]);

  currentBorrowedItems = this.borrowedItems.asObservable();
  changeBorrowStatus: Subject<any> = new Subject<any>();
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  addBorrowedItem(item: any) {
    const currentItems = this.borrowedItems.getValue();
    this.borrowedItems.next([...currentItems, item]);
  }

  getBorrowedList() {
    return this.http.get<any>(environment.API_URL + '/api/borroweditems', { headers: { Authorization: this.token as string } }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  createBorrowItems(borrowedItems: any) {
    return this.http.post<any>(environment.API_URL + '/api/borroweditems', borrowedItems, { headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }

  getBorrowedItemStatuses() {
    return this.http.get<{ data: { itemborrowed: { status: string }[] }[] }>(environment.API_URL + '/api/borroweditems', {
      headers: { Authorization: this.token as string }
    }).pipe(
      map(response => {
        // Flatten the array of statuses
        return response.data.flatMap((item: { itemborrowed: { status: string }[] }) =>
          item.itemborrowed.map((borrowed: { status: string }) => borrowed.status)
        );
      }),
      catchError(this.handleError)
    );
  }
  
  updateBorrowedItemStatus(body: any, id: string) {
    return this.http.patch<any>(environment.API_URL + '/api/borroweditems/' + id, body, { headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }

  onChangeBorrowStatus() {
    return this.changeBorrowStatus.asObservable();
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
