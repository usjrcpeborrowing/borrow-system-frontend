import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface SelectedUpdate {
  equipmentId: string;
  selected: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryUpdateService {
  selectedInventoryUpdateSubject: Subject<SelectedUpdate> = new Subject<SelectedUpdate>();
  constructor() {}

  onSelectedInventoryUpdateSubject() {
    return this.selectedInventoryUpdateSubject.asObservable();
  }
}
