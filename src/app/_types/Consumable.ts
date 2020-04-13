import { Address, addressFromApi, addressToApi } from './Address';
import { ConsumableCategory } from './ConsumableCategory';


export interface Consumable {
  id?: number;
  category: ConsumableCategory;
  name?: string;
  manufacturer?: string;
  orderNumber?: string;
  amount: number;
  unit: string;
  notes?: string;
  address?: Address;
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
    address: addressFromApi(obj.address),
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
    address: consumable.address ? addressToApi(consumable.address) : null,
  };
}
