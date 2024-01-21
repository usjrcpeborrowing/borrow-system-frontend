import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private https: HttpClient) {}

  getEquipments() {
    return this.https
      .get('http://localhost:3000/equipment', {})
      .pipe(catchError(this.handleError));
  }

  getEquipmentById(itemNo: string) {
    let params = new HttpParams();
    params = params.append('itemNo', itemNo);
    return this.https
      .get('http://localhost:3000/api/equipment/findById', { params: params })
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
