import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDFInvoiceTemplate from 'jspdf-invoice-template';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ReportDownloadService } from 'src/app/services/report-download-service';
import { AddComponent } from '../add/add.component';
import { ReportsComponent } from '../reports/reports.component';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  @Input() pagination: Pagination;
  @Input() filter: any;
  @Input() equipmentlist: any;

  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  @Output() paginationChange: EventEmitter<Pagination> = new EventEmitter<Pagination>();

  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  isFetching: boolean = false;
  selectedCategories: any = {};
  usertype: any = '';
  fullName: any = '';
  userDepartment: any = '';
  constructor(private reportDownloadService: ReportDownloadService, private authService: AuthService, private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    this.pagination = {
      length: 0,
      page: 1,
      limit: 25,
      pageSizeOption: [5, 10, 25, 50],
    };
  }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe((params) =>
    //   this.queryParamsHandler(params)
    // );
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !this.isAllowedRole(currentUser.role)) {
      this.router.navigate(['/']);
    }
    this.fullName = `${currentUser?.name.firstName} ${currentUser?.name.lastName}`;
    localStorage.setItem('currentUser.role', JSON.stringify(currentUser?.role));
    // this.usertype = localStorage.getItem('currentUser.role');
    this.usertype = currentUser?.role;
    localStorage.setItem('currentUser.department', JSON.stringify(currentUser?.department));

    this.userDepartment = currentUser?.department;
    // this.userDepartment = localStorage.getItem('currentUser.department');
  }

  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return !currentUser || !this.cantEditRole(currentUser.role);
  }
  private cantEditRole(role: string): boolean {
    const allowedRoles = ['faculty', 'Instructor'];
    return allowedRoles.includes(role);
  }
  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'Instructor', 'reads', 'oic', 'faculty'];
    return allowedRoles.includes(role);
  }

  onPageChange(event: PageEvent): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    this.pageChange.emit(this.pagination);
  }
  handleSelectedCategories(categories: any): void {
    this.selectedCategories = categories;
    this.filterItems();
  }

  searchItem(event: Event): void {
    const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
    console.log(searchWord);
    const currentQueryParams = this.activatedRoute.snapshot.queryParams;
    const newQueryParams = {
      ...currentQueryParams,
      page: 1,
      search: searchWord,
    };
    this.router.navigate(['/inventory'], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  // queryParamsHandler(params: Params): void {
  //   this.opened = params['opened'] == 'true' ? params['opened'] : false;
  //   this.pagination.limit = params['limit'] ? +params['limit'] : 10;
  //   this.pagination.page = params['page'] ? params['page'] : 1;
  //   const searchword = params['search'] ? params['search'] : '';
  //   this.searchedWord.patchValue(searchword);
  //   // this.getItems();

  //   const selectedCategories = {
  //     equipmentType: params['equipmentType'] ? params['equipmentType'] : '',
  //     brand: params['brand'] ? params['brand'] : '',
  //     matter: params['matter'] ? params['matter'] : '',
  //     description: params['description'] ? params['description'] : '',
  //   };

  //   this.handleSelectedCategories(selectedCategories);
  // }

  addItem(): void {
    this.dialog.open(AddComponent, {
      height: '73vh',
      width: '55vw',
    });
  }
  reportItems() {
    this.dialog.open(ReportsComponent, {
      height: '70vh',
      width: '60vw',
    });
  }
  filterItems(): void {
    if (this.selectedCategories) {
      this.itemlist = this.itemlist.filter((item: any) => {
        this.isFetching = true;
        let pass = true;
        if (this.searchedWord.value) {
          pass = pass && item.name.toLowerCase().includes(this.searchedWord.value.toLowerCase());
        }
        Object.keys(this.selectedCategories).forEach((category) => {
          if (this.selectedCategories[category].length > 0) {
            if (!this.selectedCategories[category].includes(item[category])) {
              pass = false;
            }
          }
        });

        this.isFetching = false;
        return pass;
      });
    }
  }

  download() {
    var currentDate = new Date();
    // var departmentReportType = localStorage.getItem('department'); // replace with the actual department report type
    var user = localStorage.getItem('currentuser');
    var departmentReportType = this.userDepartment;
    var usertype = this.usertype;
    var userName = this.fullName;
    var location = 'SN-01'; // replace with actual department location
    // console.log("TEST ", this.filter.equipmenttype);

    var category: { [key: string]: any } = Object.keys(this.filter)
      .filter((key) => this.filter[key] && this.filter[key].length > 0)
      .reduce((obj, key) => {
        obj[key] = this.filter[key];
        return obj;
      }, {} as { [key: string]: any });
    var filteredItem = Object.keys(category)
      .map((key) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${category[key]}`)
      .join(', ');
    // var filteredItem = JSON.stringify(category);

    // console.log("Categories : ", category);

    // this.filter.inventorytype = params['inventorytype'] ? params['inventorytype'] : '';
    // this.filter.remarks = params['remarks'] ? params['remarks'] : '';
    // this.filter.department = params['department'] ? params['department'] : '';
    // this.filter.name = params['search'] ? params['search'] : '';

    // if(this.filter.equipmenttype !== "" ||
    //   this.filter.brand !== "") {
    //   console.log("TEST ", this.filter.equipmenttype);
    // }

    var fileName = '' + `USJR_${departmentReportType}_${location}_${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
    let props = {
      outputType: jsPDFInvoiceTemplate.OutputType.Save,
      returnJsPDFDocObject: true,
      fileName,
      orientationLandscape: true,
      compress: true,
      logo: {
        src: 'https://raw.githubusercontent.com/usjrcpeborrowing/borrow-system-frontend/main/src/assets/USJR1.png',
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 48.33, //aspect ratio = width/height
        height: 31.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
      // stamp: {
      //   inAllPages: true, //by default = false, just in the last page
      //   src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
      //   type: 'JPG', //optional, when src= data:uri (nodejs case)
      //   width: 20, //aspect ratio = width/height
      //   height: 20,
      //   margin: {
      //     top: 0, //negative or positive num, from the current position
      //     left: 0, //negative or positive num, from the current position
      //   },
      // },
      business: {
        name: 'University of San Jose- Recoletos',
        address: 'Magallanes Street, 6000 Cebu City, Philippines',
        phone: departmentReportType + ' Department',
        email: location,
      },
      contact: {
        label: 'Report issued for:',
        name: '' + userName,
        address: '' + usertype,
      },
      invoice: {
        label: 'Report #: ',
        num: 19,
        invGenDate: 'Generated Date: ' + `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: 'Serial #',
          },
          {
            title: 'Name',
            style: {
              width: 100,
            },
          },
          {
            title: 'Equipment Type',
            style: {
              width: 50,
            },
          },
          { title: 'Brand' },
          { title: 'Description' },
          { title: 'Remarks' },
          { title: 'Quantity' },
        ],
        table: Array.from(this.equipmentlist, (item: any, index) => [
          item.serialNo ? item.serialNo : '',
          item.name ? item.name.toString().replace('�', '') : '',
          item.equipmentType ? item.equipmentType : '',
          item.brand ? item.brand : '',
          item.description ? item.description : '',
          item.remarks ? item.remarks : '',
          item.quantity ? item.quantity : '',
        ]),
        invDescLabel: 'Filter/s used:',
        invDesc: '',
      },
      footer: {
        text: '' + `USJR_${departmentReportType}_${location}_${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`,
      },
      pageEnable: true,
      pageLabel: 'Page ',
    };

    var pdfObject = jsPDFInvoiceTemplate.default(props);
    // const reports: Report = {
    //   downloadedBy: userName,
    //   role:  usertype,
    //   department: departmentReportType,
    //   location: 'SN-01',
    //   selectedFilter: filteredItem,
    //   fileName: fileName,
    //   timeStamp: new Date(),
    // };
    // this.submitReport(reports);
  }

  submitReport(reports: any): void {
    this.equipmentService.addReports(reports).subscribe(
      (data) => {
        console.log('Report submitted successfully:', data);
      },
      (error) => {
        console.error('Error submitting report:', error);
      }
    );
  }
}
