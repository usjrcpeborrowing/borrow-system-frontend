import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { Item } from '../models/Items';
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  itemSubject = new Subject<Item>();

  constructor(private https: HttpClient) {}
  getItems(pagination: Pagination, searchWord: string){
    let params = new HttpParams();
    let skip = pagination.page * pagination.limit;
    params = params.append('limit', pagination.limit);
    params = params.append('page', pagination.page);
    params = params.append('search', searchWord);

    console.log(params);
    return{
      success: true,
      message: 'Products get successfully',
      data: [
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
          dateAcquired: {
            $date: '2022-12-16T17:47:37.144Z',
          },
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
          dateAcquired: {
            $date: '2022-12-16T17:47:37.144Z',
          },
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
          dateAcquired: {
            $date: '2022-12-16T17:47:37.144Z',
          },
          image: 'https://i.dummyjson.com/data/products/2/1.jpg',
          remarks: 'Working',
          tags: 'tool',
          checkedBy: 'Paul Aureo',
          department: 1,
          disp: 'true',
        
        },
        
      ],
    };
  }
  
  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
  
}
