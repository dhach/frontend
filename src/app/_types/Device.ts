import { Address, addressFromApi, addressToApi } from './Address';
import { DeviceCategory } from './DeviceCategory';


export interface Device {
  id?: number;
  category: DeviceCategory;
  name?: string;
  manufacturer?: string;
  orderNumber?: string;
  amount: number;
  notes?: string;
  address?: Address;
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
    address: addressFromApi(obj.address),
  };
}


export function  deviceToApi(personnel: Device): any {
  return {
    id: personnel.id,
    category: personnel.category,
    name: personnel.name,
    manufacturer: personnel.manufacturer,
    ordernumber: personnel.orderNumber,
    amount: personnel.amount,
    annotation: personnel.notes,
    address: addressToApi(personnel.address),
  };
}
