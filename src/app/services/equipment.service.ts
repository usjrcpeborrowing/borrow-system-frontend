import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'http://localhost:3000/api/equipment/';

  constructor(private http: HttpClient) {}

  getItems(pagination: Pagination, filters: any): Observable<any> {
    console.log('Fetching items with params:', pagination, filters);
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());
  
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
  
    console.log('Request URL:', `${this.apiUrl}`, 'Params:', params.toString());
  
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }
  
  getEquipmentTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/equipmenttype');
  }
  getBrandList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/equipment/getbrandlist');
  }
  addEquipment(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/equipment');
  }
  addEquipmentType(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/equipmenttype');
  }
}
