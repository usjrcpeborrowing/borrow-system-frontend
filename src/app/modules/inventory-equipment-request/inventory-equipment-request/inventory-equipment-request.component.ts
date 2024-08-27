import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { Item } from 'src/app/models/Items';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { EquipmentService } from 'src/app/services/equipment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-inventory-equipment-request',
  templateUrl: './inventory-equipment-request.component.html',
  styleUrls: ['./inventory-equipment-request.component.css'],
})
export class InventoryEquipmentRequestComponent implements OnInit {
  currentUser: any;
  equipments: Item[] = [];
  openedCategory: boolean = false;
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.equipmentService.onConfirmEquipment().subscribe((resp) => {
      console.log(resp);
      this.equipmentService.updateItem(resp._id, { ...resp, confirmed: true }).subscribe({
        next: (resp) => {
          this.snackbarService.openSnackBar(resp.message, 'OK');
        },
        error: (err) => {
          this.snackbarService.openSnackBar(err.message, 'OK', true);
        },
      });
    });

    this.equipmentService.onConfirmSelectedEquipments().subscribe({
      next: (resp) => {
        this.equipmentService.confirmEquipmentByIds(resp).subscribe({
          next: (resp) => {
            this.snackbarService.openSnackBar(resp.message, 'OK');
          },
          error: (err) => {
            this.snackbarService.openSnackBar(err.message, 'OK', true);
          },
        });
      },
    });
    // this.borrowListService.onChangeBorrowStatus().subscribe({
    //   next: (resp) => {
    //     console.log(resp);
    //     if (resp.status == 'released' || resp.status == 'returned') {
    //       this.updateBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
    //     }
    //   },
    // });
  }

  getUnconfirmedEquipments(): void {
    this.equipmentService.getUnconfirmedEquipments(1, 10, this.currentUser.department).subscribe({
      next: (resp) => {
        this.equipments = resp.data;
      },
      complete: () => {
        console.log('equi', this.equipments);
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.getUnconfirmedEquipments();
  }
}
