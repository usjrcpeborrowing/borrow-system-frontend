import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { AuthService } from 'src/app/services/auth.service';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.css']
})
export class ItemPanelComponent implements OnInit{
  @Input() item: Item = {} as Item | any;
  panelOpenState = false;
  defaultImage = './../../../../assets//equipment_default_image.png';

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.viewImage();
  }
  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'Instructor' : false;
  }
  viewImage() {
    if (this.item.images && this.item.images.thumbnailUrl) {
      const match = this.item.images.thumbnailUrl.match(/\/(?:file\/d\/|thumbnail\?id=)([\w-]+)(?:\/|$)/);
      
      if (match) {
        const imageId = match[1];
        this.item.images.thumbnailUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
        // console.log('Image URL:', this.item);
      } else {
        this.item.images.thumbnailUrl = "";
      }
    } else {
      this.item.images = this.item.images || {};
      this.item.images.thumbnailUrl = "";
    }
  }
  viewItemDetails() {
    console.log('view');
    this.dialog.open(ItemDialogComponent, {
      data: this.item,
      height: '73vh',
      width: '55vw',
    });
  }
}
