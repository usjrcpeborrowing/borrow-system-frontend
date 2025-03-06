import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BorrowedItemFilter } from '../models/BorrowedItemFilter';

interface Response {
  data: any[];
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BorrowedItemsService {
  private borrowedItems = new BehaviorSubject<any[]>([]);

  currentBorrowedItems = this.borrowedItems.asObservable();
  changeBorrowStatus: Subject<any> = new Subject<any>();
  returnSelectedItemSubject: Subject<any> = new Subject<any>();
  itemSelectedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  addBorrowedItem(item: any) {
    const currentItems = this.borrowedItems.getValue();
    this.borrowedItems.next([...currentItems, item]);
  }

  getBorrowedList(filter: BorrowedItemFilter) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    let params = new HttpParams({
      fromObject: {
        status: filter.status,
        borrower: filter.borrower,
        instructor: filter.instructor,
      },
    });
    return this.http.get<any>(environment.API_URL + '/api/borroweditems', { headers: headers, params }).pipe(
      map((response) => {
        console.log(response);
        response.data.forEach((data: any) => {
          data.itemborrowed.forEach((item: any) => {
            let history = data.history.filter((his: any) => his.borrowItemId == item._id);
            item.history = history;
          });
          return data;
        });

        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  createBorrowItems(borrowedItems: any) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http.post<any>(environment.API_URL + '/api/borroweditems', borrowedItems, { headers: headers }).pipe(catchError(this.handleError));
  }

  getBorrowedItemStatuses() {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http
      .get<{ data: { itemborrowed: { status: string }[] }[] }>(environment.API_URL + '/api/borroweditems', {
        headers: headers,
      })
      .pipe(
        map((response) => {
          // Flatten the array of statuses
          return response.data.flatMap((item: { itemborrowed: { status: string }[] }) => item.itemborrowed.map((borrowed: { status: string }) => borrowed.status));
        }),
        catchError(this.handleError)
      );
  }

  updateBorrowedItemStatus(body: any, id: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http.patch<any>(environment.API_URL + '/api/borroweditems/' + id, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  getBorrowedItemHistory(equipmentId: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http.get<Response>(environment.API_URL + '/api/borroweditems/getborrowhistory/' + equipmentId, { headers: headers }).pipe(catchError(this.handleError));
  }

  onChangeBorrowStatus() {
    return this.changeBorrowStatus.asObservable();
  }

  onReturnSelectedItem() {
    return this.returnSelectedItemSubject.asObservable();
  }

  onItemSelected(){
    return this.itemSelectedSubject.asObservable();
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
