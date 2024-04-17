import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';
import { AddComponent } from '../add/add.component';
import * as jsPDFInvoiceTemplate from 'jspdf-invoice-template';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 10,
    pageSizeOption: [5, 10, 25, 50],
  };
  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  selectedCategories: any = {};
  usertype: string | null = '';
  isOIC_Reads: boolean = false;
  @Input() equipmentlist: any;

  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.usertype = localStorage.getItem('usertype');
    this.isOIC_Reads = ['oic', 'reads'].includes(this.usertype as string) ? true : false;
  }
  onPageChange(event: any): void {
    console.log('Page index:', event.pageIndex);
    console.log('Page size:', event.pageSize);
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    console.log('Pagination:', this.pagination);
    // this.getItems();
  }
  handleSelectedCategories(categories: any): void {
    this.selectedCategories = categories;
    this.filterItems();
  }

  // getItems(): void {
  //   const filters = {
  //     equipmenttype: this.selectedCategories.equipmentType,
  //     brand: this.selectedCategories.brand,
  //     matter: this.selectedCategories.matter,
  //     description: this.selectedCategories.description,
  //     dateAcquired: this.selectedCategories.dateAcquired,
  //     remarks: this.selectedCategories.remarks,
  //     department: this.selectedCategories.department,
  //   };

  //   this.equipmentService.getItems(this.pagination, filters).subscribe(
  //     (response) => {
  //       this.itemlist = response.data;
  //       this.pagination.length = response.total;
  //     },
  //     (error) => {
  //       console.error('Error fetching items:', error);
  //     }
  //   );
  // }

  searchItem(event: Event): void {
    const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
    this.router.navigate(['/inventory/faculty'], {
      queryParams: {
        page: 1,
        limit: this.pagination.limit,
        opened: this.opened,
        search: searchWord,
        equipmentType: this.selectedCategories.equipmentType,
        brand: this.selectedCategories.brand,
        matter: this.selectedCategories.matter,
        description: this.selectedCategories.description,
      },
    });
  }

  queryParamsHandler(params: Params): void {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
    this.pagination.limit = params['limit'] ? +params['limit'] : 10;
    this.pagination.page = params['page'] ? params['page'] : 1;
    const searchword = params['search'] ? params['search'] : '';
    this.searchedWord.patchValue(searchword);
    // this.getItems();

    const selectedCategories = {
      equipmentType: params['equipmentType'] ? params['equipmentType'] : '',
      brand: params['brand'] ? params['brand'] : '',
      matter: params['matter'] ? params['matter'] : '',
      description: params['description'] ? params['description'] : '',
    };

    this.handleSelectedCategories(selectedCategories);
  }

  addItem(): void {
    this.dialog.open(AddComponent, {
      height: '85vh',
      width: '40vw',
    });
  }

  download() {
    var currentDate = new Date();
    var departmentReportType = 'ECL'; // replace with the actual department report type

    var fileName = `USJR_${departmentReportType}_${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
    let props = {
      outputType: jsPDFInvoiceTemplate.OutputType.Save,
      returnJsPDFDocObject: true,
      fileName,
      orientationLandscape: true,
      compress: true,
      logo: {
        src: 'https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-1/347586256_1399184523956665_6414462579657343146_n.jpg?stp=dst-jpg_p480x480&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFOntxpK6LOAU2gOaG7OLAQq6RTAhRJ3OirpFMCFEnc6G0byer3W2ZlC8_R5Xlxaez3tdw2T68flddBlYLhM1_6&_nc_ohc=Xmb2eDait8cAb57W9A8&_nc_ht=scontent-mnl1-1.xx&oh=00_AfCXL-S8n3gYxtazy0P2fl06aaNKQA7s90I9c7tkwgDWrA&oe=66258429',
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
      stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
        type: 'JPG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
      business: {
        name: 'University of San Jose- Recoletos',
        address: 'Magallanes Street, 6000 Cebu City, Philippines',
        phone: '(+355) 069 11 11 111',
        email: 'email@example.com',
        email_1: 'info@example.al',
        website: 'www.example.al',
      },
      contact: {
        label: 'Report issued for:',
        name: 'Reads Name',
        address: 'Department',
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
          },
          {
            title: 'Equipment Type',
            // style: {
            //   width: 30,
            // },
          },
          { title: 'Brand' },
          { title: 'Description' },
          { title: 'Remarks' },
          { title: 'Quantity' },
        ],
        table: Array.from(this.equipmentlist, (item: any, index) => [item.serialNo, item.name, item.equipmentType, item.brand, item.description, item.remarks, item.quantity]),
        invDescLabel: 'Report Note',
        invDesc:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
        text: 'The report is created on a computer and is valid without the signature and stamp.',
      },
      pageEnable: true,
      pageLabel: 'Page ',
    };
    var pdfObject = jsPDFInvoiceTemplate.default(props);
  }

  filterItems(): void {
    if (this.selectedCategories) {
      this.itemlist = this.itemlist.filter((item: any) => {
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
        return pass;
      });
    }
  }
}
