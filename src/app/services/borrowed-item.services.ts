import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, forkJoin, map, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BorrowedItemFilter } from '../models/BorrowedItemFilter';
import { Pagination } from '../models/Pagination';

interface Response {
  data: any[];
  message: string;
  success: boolean;
}

interface DataTapped {
  borrowedItemId: string;
  items: any[];
  status: string;
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

  getBorrowedList(filter: BorrowedItemFilter, pagination: Pagination) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    let params = new HttpParams({
      fromObject: {
        status: filter.status,
        borrower: filter.borrower,
        instructor: filter.instructor,
        department: filter.department,
        className: filter.className,
        page: pagination.page,
        limit: pagination.limit,
      },
    });
    return this.http.get<any>(environment.API_URL + '/api/borroweditems', { headers: headers, params }).pipe(
      map((response) => {
        response.data.forEach((data: any) => {
          data.itemborrowed.status = data.itemborrowed.status.replace(/_/g, ' ');
        });

        return response;
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

  getClassNamesByIntructor(instructorId: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };

    return this.http.get<Response>(environment.API_URL + '/api/borroweditems/getclassnamesbyintructor/' + instructorId, { headers: headers }).pipe(
      map((response) => {
        response.data = response.data.map((x) => x._id);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateBorrowedItemStatus(body: DataTapped[], id: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return forkJoin(body.map(bd=> {
      return this.http.patch<any>(environment.API_URL + '/api/borroweditems/' + bd.borrowedItemId, bd, { headers: headers }).pipe(catchError(this.handleError))
    }))
    // return this.http.patch<any>(environment.API_URL + '/api/borroweditems/' + id, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  getBorrowedItemHistory(equipmentId: string) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    return this.http.get<Response>(environment.API_URL + '/api/borroweditems/getborrowhistory/' + equipmentId, { headers: headers }).pipe(catchError(this.handleError));
  }

  mapDataTapped(datatapped: DataTapped[]) {
    let mapped: DataTapped[] = [];
    for (let tapped of datatapped) {
      let filtered = datatapped.filter((x) => x.borrowedItemId == tapped.borrowedItemId);
      let temp: DataTapped = {
        borrowedItemId: tapped.borrowedItemId,
        items: filtered.map((x) => x.items).flat(1),
        status: tapped.status,
      };
      mapped.push(temp);
    }

    return [...new Map(mapped.map((item) => [item['borrowedItemId'], item])).values()];
  }

  onChangeBorrowStatus() {
    return this.changeBorrowStatus.asObservable();
  }

  onReturnSelectedItem() {
    return this.returnSelectedItemSubject.asObservable();
  }

  onItemSelected() {
    return this.itemSelectedSubject.asObservable();
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
