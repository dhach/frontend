import { AddressFormatField, addressFormatFieldFromApi } from './AddressFormatField';
import { Address } from './Address';


export interface AddressFormat {
  fields: Array<AddressFormatField>;
}


export function addressFormatFromApi(obj: any, language: string): AddressFormat {
  return {
    fields: obj.fields.map((f) => addressFormatFieldFromApi(f, language)),
  };
}


export function createEmptyAddress(addressFormat: AddressFormat): Address {
  const address: Address = {};
  for (const field of addressFormat.fields) {
    address[field.id] = '';
  }
  return address;
}
