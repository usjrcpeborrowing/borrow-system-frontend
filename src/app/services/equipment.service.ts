import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Pagination } from 'src/app/models/Pagination';
import { Item } from '../models/Items';
import { Filter } from '../models/Filter';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = '';
  productSubject = new Subject<Item>();
  
  constructor(private http: HttpClient) {}

  getItems(pagination: Pagination, filters: Filter): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('limit', pagination.limit.toString());
    params = params.append('page', pagination.page.toString());
    params = params.append('search', filters.searchWord);

    return this.http.get<any[]>(environment.API_URL + '/equipment', { params }).pipe(catchError(this.handleError));
  }

  onAddedEquipment(): Observable<Item> {
    return this.productSubject.asObservable()
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }

  
}
export const staticItems: Item[] = [
  {
    serialNo: '001',
    equipmentType: 'board',
    itemName: 'Breadboard',
    brand: 'No Brand',
    color: 'White',
    modelNo: '404',
    quantity: 5,
    unit: 'None',
    matter: 'Solid',
    description: 'A breadboard',
    status: 'Working',
    dateAcquired: new Date('2022-12-16T17:47:37.144Z'),
    image: 'https://i.dummyjson.com/data/products/2/1.jpg',
    remarks: 'Working',
    tags: true,
    checkedBy: 'Keith Ranoa',
    department: 1,
    disp: true,
  },
  {
    serialNo: '002',
    equipmentType: 'tool',
    itemName: 'Phillips Screwdriver',
    brand: 'CAT',
    color: 'yellow',
    modelNo: '405',
    quantity: 2,
    unit: 'None',
    matter: 'Solid',
    description: 'hand tool',
    status: 'Working',
    dateAcquired: new Date('2022-12-16T17:47:37.144Z'),
    image: 'https://i.dummyjson.com/data/products/2/1.jpg',
    remarks: 'Working',
    tags: true,
    checkedBy: 'Keith Ranoa',
    department: 1,
    disp: true,
  },
  {
    serialNo: '003',
    equipmentType: 'phone',
    itemName: 'Iphone',
    brand: 'Apple',
    color: 'grey',
    modelNo: '700',
    quantity: 1,
    unit: 'None',
    matter: 'Solid',
    description: 'smartphone',
    status: 'Working',
    dateAcquired: new Date('2022-12-16T17:47:37.144Z'),
    image: 'https://i.dummyjson.com/data/products/2/1.jpg',
    remarks: 'Working',
    tags: true,
    checkedBy: 'Paul Aureo',
    department: 1,
    disp: true,
  },
];
