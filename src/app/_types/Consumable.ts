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


export function  consumableToApi(personnel: Consumable): any {
  return {
    id: personnel.id,
    category: personnel.category,
    name: personnel.name,
    manufacturer: personnel.manufacturer,
    ordernumber: personnel.orderNumber,
    amount: personnel.amount,
    unit: personnel.unit,
    annotation: personnel.notes,
    address: addressToApi(personnel.address),
  };
}
