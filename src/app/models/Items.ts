export interface Item {
  [key: string]: any;
  _id: string;
  serialNo: string;
  equipmentType: object;
  name: string;
  brand: object;
  color: string;
  modelNo: string;
  categories: string[];
  quantity: number;
  unit: string;
  matter: string;
  inventorytype: string;
  description: string;
  dateAcquired: Date;
  images: {
    thumbnailUrl: string;
    midSizeUrl: string;
    url: string;
  };
  remarks: string;
  condition: string;
  tags: boolean;
  checkedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  department: string;
  location: string;
  isborrow: boolean,
  disp: boolean;

}
