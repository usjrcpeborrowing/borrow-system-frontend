import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  greetings: string = 'CPE';
  equipmentlist: any = [1,1,2,3,4,5,6,7,8,9,1];
  searchedWord = '';
  opened: boolean = true;
  constructor(private equipmentService: EquipmentService) { }

  ngOnInit(): void {

  }

  searchProduct(event: any) {
    console.log(event)
  }

  cartClicked() {
    this.opened = !this.opened;
  }

}
