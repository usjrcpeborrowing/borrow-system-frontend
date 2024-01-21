import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  greetings: string = 'CPE';
  equipments: any = [];
  itemNo = '';

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    
  }

  checkValue() {
    this.equipmentService.getEquipmentById(this.itemNo).subscribe((resp: any) => {
      this.equipments = resp.data;
      console.log(resp);
    });
  }
}
