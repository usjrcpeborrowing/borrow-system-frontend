import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private http: HttpClient) {}

  getItems(pagination: Pagination, searchWord: string) {
    let params = new HttpParams();
    let skip = pagination.page * pagination.limit;
    params = params.append('limit', pagination.limit.toString());
    params = params.append('page', pagination.page.toString());
    params = params.append('search', searchWord);

    console.log(params);

    return [
      {
        serialNo: '001',
        equipmentType: 'board',
        itemName: 'Breadboard',
        brand: 'No Brand',
        color: 'White',
        modelNo: 404,
        quantity: 5,
        unit: 'None',
        matter: 'Solid',
        description: 'A breadboard',
        status: 'Working',
        dateAcquired: new Date('2022-12-16T17:47:37.144Z'),
        image: 'https://i.dummyjson.com/data/products/2/1.jpg',
        remarks: 'Working',
        tags: 'board',
        checkedBy: 'Keith Ranoa',
        department: 1,
        disp: 'true',
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
        tags: 'tool',
        checkedBy: 'Keith Ranoa',
        department: 1,
        disp: 'true',
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
        tags: 'tool',
        checkedBy: 'Paul Aureo',
        department: 1,
        disp: 'true',
      },
    ];
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
