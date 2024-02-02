import {
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Pagination } from 'src/app/models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
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
          serialNo: '',
          equipmentType: '',
          itemName: '',
          brand: '',
          color: '',
          modelNo: '',
          quanitity: '',
          unit: '',
          matter: '',
          description: '',
          status: '',
          dateAcquired: '',
          image: [],
          remarks: '',
          tags: '',
          checkedBy: '',
          department: '',
          disp: '',
        
        }
      ]
    }
  }
  
  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
  
}
