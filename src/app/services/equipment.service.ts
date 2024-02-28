import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Item } from '../models/Items';
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getItems(pagination: Pagination, searchWord: string, filters: any): Observable<any> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString())
      .set('search', searchWord);

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}`, { params });
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