import { Injectable } from '@angular/core';
import * as jsPDFInvoiceTemplate from 'jspdf-invoice-template';
import { jsPDF } from 'jspdf-invoice-template';
import { Item } from '../models/Items';
import { InventoryFilter } from '../models/InventoryFilter';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, filter, map, throwError } from 'rxjs';
import { Filter } from '../models/Filter';
import { style } from '@angular/animations';

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
    let headers = [
      {
        columnName: 'Serial',
        key: 'serialNo',
        width: 20,
      },
      {
        columnName: 'Model',
        key: 'modelNo',
        width: 20,
      },
      {
        columnName: 'Name',
        key: 'name',
        width: 50,
      },
      {
        columnName: 'Equipment Type',
        key: 'equipmentType',
        width: 30,
      },
      {
        columnName: 'Inventory Type',
        key: 'inventorytype',
        width: 30,
      },
      {
        columnName: 'Category',
        key: 'categories',
        width: 35,
      },
      {
        columnName: 'Brand',
        key: 'brand',
        width: 15,
      },
      {
        columnName: 'Condition & Qty',
        key: 'conditionAndQuantityDisplay',
        width: 30,
      },
      {
        columnName: 'Availability',
        key: 'availability',
        width: 30,
      },
      {
        columnName: 'Location',
        key: 'location',
        width: 30,
      },
    ];
    // let headers = ['serialNo', 'modelNo', 'name', 'equipmentType', 'brand', 'quantity', 'unit', 'quantity', 'inventorytype', 'location', 'conditionAndQuantityDisplay'];
    return {
      outputType: jsPDFInvoiceTemplate.OutputType.Save,
      onJsPDFDocCreation: (doc: jsPDF) => {
        doc.addPage('a4', 'landscape');
        doc.deletePage(1);
      },
      returnJsPDFDocObject: true,
      fileName: filename,
      orientationLandscape: true,
      compress: true,
      logo: {
        src: './../assets/USJR1-min.png',
        // type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 30, //aspect ratio = width/height
        height: 30,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
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
          return { title: head.columnName, style: { width: head.width } };
        }),
        table: Array.from(equipments, (item) => headers.map((head) => item[head.key])),
        // invDescLabel: 'Filtered By: ' + filters.toString(),
        invDesc:
          'Filtered By: ' +
          Object.entries(filters)
            .filter(([key, val]) => val)
            .map(([key, val]) => key + ' as ' + val)
            .toLocaleString(),
      },
      footer: {
        text: filename,
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
        categories: filters.categories,
        recentlyBorrowed: filters.recentlyBorrowed
      },
    });

    return this.http.get<Response>(environment.API_URL + '/api/equipment/getitemsforreport', { params, headers: headers }).pipe(
      catchError(this.handleError),
      map((resp) => {
        console.log(resp.data[0]);
        return resp.data.map((item) => {
          let { conditionAndQuantity, available, borrowed } = item;
          let availability = `available (${available})\nborrowed (${borrowed})`;
          let conditionAndQuantityDisplay = conditionAndQuantity ? conditionAndQuantity.map((x) => `${x.condition} (${x.quantity})`).join('\n') : '';
          return {
            ...item,
            conditionAndQuantityDisplay,
            availability,
          };
        });
      })
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
