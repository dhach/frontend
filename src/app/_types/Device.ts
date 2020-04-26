export interface Device {
  id?: number;
  category: string;
  name?: string;
  manufacturer?: string;
  orderNumber?: string;
  amount: number;
  notes?: string;
}


export function deviceFromApi(obj: any): Device {
  return {
    id: obj.id,
    category: obj.category,
    name: obj.name,
    manufacturer: obj.manufacturer,
    orderNumber: obj.ordernumber,
    amount: obj.amount,
    notes: obj.annotation,
  };
}


export function deviceToApi(personnel: Device): any {
  return {
    id: personnel.id,
    category: personnel.category,
    name: personnel.name,
    manufacturer: personnel.manufacturer,
    ordernumber: personnel.orderNumber,
    amount: personnel.amount,
    annotation: personnel.notes,
  };
}
