
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-detail-dialog',
  templateUrl: './item-detail-dialog.component.html',
  styleUrls: ['./item-detail-dialog.component.css']
})
export class ItemDetailDialogComponent implements OnInit {
  itemDetails: any;
  
  isloading: boolean = false;
  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  constructor(
    public dialogRef: MatDialogRef<ItemDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.itemDetails = data;
  }
  ngOnInit(): void {
    
    const thumbnailUrl = this.itemDetails?.images?.midSizeUrl?.length ? this.itemDetails?.images?.midSizeUrl : '';
    const id: string = thumbnailUrl.substring(thumbnailUrl.lastIndexOf('/d/') + 3, thumbnailUrl.lastIndexOf('/view'));
    console.log(id);
    this.displayImage = `https://drive.google.com/thumbnail?id=${id}&&sz=w1000`;
    console.log("Image: ", this.itemDetails.images.thumbnailUrl)
  }
}
