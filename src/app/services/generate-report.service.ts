import { Injectable } from '@angular/core';
import * as jsPDFInvoiceTemplate from 'jspdf-invoice-template';
import { Item } from '../models/Items';
import { InventoryFilter } from '../models/InventoryFilter';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { Filter } from '../models/Filter';

interface Response {
  data: Item[];
  message: string;
  success: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class GenerateReportService {
  constructor(private http: HttpClient) {}

  createProps(equipments: Item[], filters: InventoryFilter) {
    let date = new Date().toISOString().split('T')[0];
    let dept = filters.department;
    let filename = 'USJR_' + dept + '_' + date;
    let headers = ['serialNo', 'modelNo', 'name', 'equipmentType', 'brand', 'quantity', 'unit', 'condition'];
    return {
      outputType: jsPDFInvoiceTemplate.OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: filename,
      orientationLandscape: true,
      compress: true,
      // logo: {
      //   src: 'https://raw.githubusercontent.com/usjrcpeborrowing/borrow-system-frontend/main/src/assets/USJR1.png',
      //   type: 'PNG', //optional, when src= data:uri (nodejs case)
      //   width: 48.33, //aspect ratio = width/height
      //   height: 31.66,
      //   margin: {
      //     top: 0, //negative or positive num, from the current position
      //     left: 0, //negative or positive num, from the current position
      //   },
      // },
      business: {
        name: 'University of San Jose- Recoletos',
        address: 'Magallanes Street, 6000 Cebu City, Philippines',
        phone: filters.department,
        // email: filters.location,
      },
      // contact: {
      //   label: 'Report issued for:',
      //   name: 'contact name',
      //   address: 'contact address',
      // },
      invoice: {
        // label: 'Report #: ',
        // num: 19,
        invGenDate: 'Generated Date: ' + date,
        headerBorder: false,
        tableBodyBorder: false,
        header: headers.map((head) => {
          return { title: head };
        }),
        table: Array.from(equipments, (item) => headers.map((head) => item[head])),
        invDescLabel: 'Filtered By: ' + filters.toString(),
        invDesc: '',
      },
      footer: {
        text: filename
      },
      pageEnable: true,
      pageLabel: 'Page ',
    };
  }

  getEquipmentsForReport(filters: InventoryFilter) {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    let params = new HttpParams({
      fromObject: {
        equipmenttype: filters.equipmenttype,
        brand: filters.brand,
        matter: filters.mattertype,
        inventorytype: filters.inventorytype,
        remarks: filters.remarks,
        department: filters.department,
        location: filters.location,
        name: filters.name,
        dateAcquired: filters.dateAcquired,
      },
    });

    return this.http.get<Response>(environment.API_URL + '/api/equipment/getitemsforreport', { params, headers: headers }).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
