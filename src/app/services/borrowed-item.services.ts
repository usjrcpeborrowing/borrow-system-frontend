import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BorrowedItemsService {
    private borrowedItems = new BehaviorSubject<any[]>([]);
    currentBorrowedItems = this.borrowedItems.asObservable();

    constructor() { }

    addBorrowedItem(item: any) {
        const currentItems = this.borrowedItems.getValue();
        this.borrowedItems.next([...currentItems, item]);
    }
}