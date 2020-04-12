import { Address, addressFromApi, addressToApi } from './Address';


export interface Provider {
  institution: string;
  name: string;
  mail: string;
  phone?: string;
  address: Address;
  isPublic?: boolean;
}


export function providerFromApi(obj: any): Provider {
  return {
    institution: obj.organisation,
    name: obj.name,
    mail: obj.mail,
    phone: obj.phone,
    address: addressFromApi(obj.address),
    isPublic: obj.ispublic,
  };
}


export function providerToApi(provider: Provider): any {
  return {
    address: addressToApi(provider.address),
    name: provider.name,
    organisation: provider.institution,
    mail: provider.mail,
    phone: provider.phone,
    ispublic: provider.isPublic,
  };
}
