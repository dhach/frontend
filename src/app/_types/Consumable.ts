export interface Consumable {
  id?: number;
  category: string;
  name?: string;
  manufacturer?: string;
  orderNumber?: string;
  amount: number;
  unit: string;
  notes?: string;
}


export function consumableFromApi(obj: any): Consumable {
  return {
    id: obj.id,
    category: obj.category,
    name: obj.name,
    manufacturer: obj.manufacturer,
    orderNumber: obj.ordernumber,
    amount: obj.amount,
    unit: obj.unit,
    notes: obj.annotation,
  };
}


export function consumableToApi(consumable: Consumable): any {
  return {
    id: consumable.id,
    category: consumable.category,
    name: consumable.name,
    manufacturer: consumable.manufacturer,
    ordernumber: consumable.orderNumber,
    amount: consumable.amount,
    unit: consumable.unit,
    annotation: consumable.notes,
  };
}
