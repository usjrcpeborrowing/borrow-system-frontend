import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { environment } from 'src/environments/environment';
import { InventoryFilter } from '../models/InventoryFilter';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private http: HttpClient) {}

  getItems(pagination: Pagination, filters: InventoryFilter): Observable<any> {

    let params = new HttpParams();

    params = params.append('page', pagination.page);
    params = params.append('limit', pagination.limit);
    params = params.append('equipmenttype', filters.equipmenttype);
    params = params.append('brand', filters.brand);
    params = params.append('matter', filters.mattertype);
    params = params.append('inventorytype', filters.inventorytype);
    params = params.append('remarks', filters.remarks);
    params = params.append('deparment', filters.deparment);

    console.log(params);

    return this.http.get(environment.API_URL + '/api/equipment', { params }).pipe(catchError(this.handleError));
  }

  getEquipmentTypes(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getequipmenttype').pipe(catchError(this.handleError));
  }
  getBrandList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbrandlist').pipe(catchError(this.handleError));
  }

  getMatterList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getmatterlist').pipe(catchError(this.handleError));
  }

  getInventoryTypeList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getinventorytypelist').pipe(catchError(this.handleError));
  }

  getItemStatusList(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getremarks').pipe(catchError(this.handleError));
  }

  addEquipment(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment').pipe(catchError(this.handleError));
  }

  addEquipmentType(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipmenttype').pipe(catchError(this.handleError));
  }

  searchEquipmentbyName(searchWord: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', searchWord)
    return this.http.get<any>(environment.API_URL + '/api/equipment/searchbyname').pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
