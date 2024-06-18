export interface Item {
    
    [key: string]: any;
    _id: string;
    serialNo: string;
    equipmentType: object;
    name: string;
    brand: object;
    color: string;
    modelNo: string;
    quantity: number;
    unit: string;
    matter: string;
    inventorytype: string;
    description: string;
    dateAcquired: Date;
    images: {
        thumbnailUrl: string,
        midSizeUrl: string,
        Url: string,
    };
    remarks: string;
    tags: boolean;
    checkedBy: string;
    department: string;
    location: string;
    disp: boolean;
}
