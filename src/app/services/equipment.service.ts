import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';
import { environment } from 'src/environments/environment.development';
import { InventoryFilter } from '../models/InventoryFilter';
import { Item } from '../models/Items';
import { Transaction } from '../models/Transaction';

interface Response {
  data: Item[];
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  token = localStorage.getItem('token');
  addEquipmentSubject: Subject<string> = new Subject<string>();
  addEquipmentImageSubject: Subject<string> = new Subject<string>();
  confirmEquipmentSubject: Subject<Item> = new Subject<Item>();
  constructor(private http: HttpClient) {}

  searchOrGetItems(searchWord: string, filters: any, pagination: Pagination): Observable<any> {
    if (searchWord) {
      return this.searchEquipment(searchWord, filters);
    } else {
      return this.getItems(pagination, filters);
    }
  }
  getItemsShop(pagination: Pagination, filters: any): Observable<any> {
    console.log('Fetching items with params:', pagination, filters);
    let params = new HttpParams().set('page', pagination.page.toString()).set('limit', pagination.limit.toString());

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get(environment.API_URL + '/api/equipment', { params, headers: { Authorization: this.token as string } }).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getItems(pagination: Pagination, filters: InventoryFilter): Observable<any> {
    // let params = new HttpParams()
    //   .set('page', pagination.page.toString())
    //   .set('limit', pagination.limit.toString());

    // if (filters) {
    //   Object.keys(filters).forEach(key => {
    //     if (filters[key]) {
    //       params = params.set(key, filters[key]);
    //     }
    //   });
    // }
    let params = new HttpParams();

    params = params.append('page', pagination.page);
    params = params.append('limit', pagination.limit);
    params = params.append('equipmenttype', filters.equipmenttype);
    params = params.append('brand', filters.brand);
    params = params.append('matter', filters.mattertype);
    params = params.append('inventorytype', filters.inventorytype);
    params = params.append('remarks', filters.remarks);
    params = params.append('department', filters.department);
    params = params.append('location', filters.location);
    params = params.append('name', filters.name);

    params = params.append('dateAcquired', filters.dateAcquired);
    console.log('The ordeal', params);

    return this.http.get(environment.API_URL + '/api/equipment', { params, headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }

  getAvailableEquipment(pagination: Pagination, filters: InventoryFilter): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        page: pagination.page,
        limit: pagination.limit,
        department: filters.department,
        brand: filters.brand,
        matter: filters.mattertype,
        inventory: filters.inventorytype,
        equipmenttype: filters.equipmenttype,
        location: filters.location,
        search: filters.name,
      },
    });
    return this.http.get(environment.API_URL + '/api/equipment/getavailableequipment', { params, headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }

  searchEquipment(searchTerm: string, filters: any): Observable<any> {
    let params = new HttpParams().set('search', searchTerm);

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<any>(environment.API_URL + '/api/equipment/search', { params }).pipe(catchError(this.handleError));
  }

  getEquipmentTypesWithPagination(page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    return this.http.get<any>(environment.API_URL + '/api/equipmenttype', { params }).pipe(
      tap((data) => console.log('Equipment Types:', data)), // Debugging line
      catchError(this.handleError)
    );
  }

  getUnconfirmedEquipments(page: number, limit: number, department: string[]) {
    const params = new HttpParams({
      fromObject: {
        department: department,
      },
    });

    return this.http.get<Response>(environment.API_URL + '/api/equipment/getunconfirmedequipments', { params, headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }

  addEquipment(item: Item): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };

    return this.http.post<any>(environment.API_URL + '/api/equipment', item, { headers }).pipe(
      // tap((data) => console.log('Equipment added:', data, { headers })),
      catchError(this.handleError)
    );
  }
  addReports(report: Report): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };

    return this.http.post<any>(environment.API_URL + '/api/report', report).pipe(
      tap((data) => console.log('Report added:', data, { headers })),
      catchError(this.handleError)
    );
  }
  // getReports(): Observable<any> {
  //   return this.http.get<any>(environment.API_URL + "/api/report").pipe(
  //     map(response => response.data),
  //     catchError(this.handleError)
  //   );
  // }
  // getTransactions(): Observable<any> {
  //   return this.http.get<any>(environment.API_URL + "/api/transaction").pipe(
  //     map(response => response.data),
  //     catchError(this.handleError)
  //   );
  // }
  getReports(pagination: Pagination): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', pagination.page);
    params = params.append('limit', pagination.limit);

    const headers = {
      Authorization: this.token as string,
    };

    return this.http.get<any>(environment.API_URL + '/api/report', { params, headers: { Authorization: this.token as string } }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }
  getTransactions(pagination: Pagination): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', pagination.page);
    params = params.append('limit', pagination.limit);
    return this.http.get<any>(environment.API_URL + '/api/transaction', { params, headers: { Authorization: this.token as string } }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }
  addTransaction(transaction: Transaction): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };

    return this.http.post<any>(environment.API_URL + '/api/transaction', transaction, { headers }).pipe(catchError(this.handleError));
  }
  getBrandListWithPagination(page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    return this.http.get<any>(environment.API_URL + '/api/equipment/getbrandlist', { params, headers: { Authorization: this.token as string } }).pipe(catchError(this.handleError));
  }
  getEquipmentTypes(departments: string[]): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        departments,
      },
    });
    return this.http
      .get<any>(environment.API_URL + '/api/equipment/getequipmenttype', {
        headers: { Authorization: this.token as string },
        params,
      })
      .pipe(catchError(this.handleError));
  }
  getBrandList(departments: string[]): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        departments,
      },
    });
    return this.http
      .get<any>(environment.API_URL + '/api/equipment/getbrandlist', {
        headers: { Authorization: this.token as string },
        params,
      })
      .pipe(catchError(this.handleError));
  }
  getMatterList(): Observable<any> {
    return this.http
      .get<any>(environment.API_URL + '/api/equipment/getmatterlist', {
        headers: { Authorization: this.token as string },
      })
      .pipe(catchError(this.handleError));
  }

  getDepartmentList(): Observable<any> {
    return this.http
      .get<any>(environment.API_URL + '/api/equipment/getdepartmentlist', {
        headers: { Authorization: this.token as string },
      })
      .pipe(catchError(this.handleError));
  }

  getInventoryTypeList(): Observable<any> {
    return this.http
      .get<any>(environment.API_URL + '/api/equipment/getinventorytypelist', {
        headers: { Authorization: this.token as string },
      })
      .pipe(catchError(this.handleError));
  }

  searchEquipmentbyName(search: string) {
    return this.http.get<any>(environment.API_URL + '/api/equipment/searchbyname').pipe(catchError(this.handleError));
  }

  getItemStatusList(): Observable<any> {
    return this.http
      .get<any>(environment.API_URL + '/api/equipment/getremarks', {
        headers: { Authorization: this.token as string },
      })
      .pipe(catchError(this.handleError));
  }
  addEquipmentType(equipmentType: any): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };
    return this.http.post<any>(environment.API_URL + '/api/equipmenttype', equipmentType, { headers }).pipe(
      tap((data) => console.log('Equipment added:', data)),
      catchError(this.handleError)
    );
  }

  updateItem(_id: string, item: Item): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };
    return this.http.patch<any>(environment.API_URL + '/api/equipment/' + `${item._id}`, item, { headers });
  }
  equipmentNameAscending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbynameasc').pipe(catchError(this.handleError));
  }
  equipmentNameDescending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbynamedesc').pipe(catchError(this.handleError));
  }
  equipmentColorAscending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbycolorasc').pipe(catchError(this.handleError));
  }
  equipmentColorDescending(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/equipment/getbycolordesc').pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    return this.http
      .get<any>(environment.API_URL + '/api/users', {
        headers: { Authorization: this.token as string },
      })
      .pipe(catchError(this.handleError));
  }
  getUserTypes(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/usertypes').pipe(catchError(this.handleError));
  }
  getDepartment(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/api/department').pipe(catchError(this.handleError));
  }
  getLocationList(departments: string[]): Observable<any> {
    const headers = {
      Authorization: this.token as string,
    };
    let params = new HttpParams({
      fromObject: {
        departments,
      },
    });
    return this.http.get<any>(environment.API_URL + '/api/equipment/getlocationlist', { headers, params }).pipe(catchError(this.handleError));
  }

  onAddEquipment(): Observable<string> {
    return this.addEquipmentSubject.asObservable();
  }

  onAddEquipmentImage(): Observable<string> {
    return this.addEquipmentImageSubject.asObservable();
  }

  onConfirmEquipment(): Observable<Item> {
    return this.confirmEquipmentSubject.asObservable()
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
