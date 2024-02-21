import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.css']
})
export class ItemPanelComponent implements OnInit{
  @Input() item: Item = {} as Item | any;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    console.log(this.item);
  }

  viewItemDetails() {
    console.log('view');
    this.dialog.open(ItemDialogComponent, {
      data: this.item,
      height: '80vh',
      width: '40vw',
    });
  }
}
