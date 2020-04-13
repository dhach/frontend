export interface Address {
  street?: string;
  streetNumber?: string;
  postalCode: string;
  city?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}


export function addressFromApi(obj: any): Address {
  // This is needed, if the address is not set
  if (!obj) {
    return {
      street: null,
      streetNumber: null,
      postalCode: null,
      city: null,
      country: null,
      latitude: null,
      longitude: null,
    };
  }
  return {
    street: obj.street,
    streetNumber: obj.streetnumber,
    postalCode: obj.postalcode,
    city: obj.city,
    country: obj.country,
    latitude: obj.latitude,
    longitude: obj.longitude,
  };
}


export function addressToApi(address: Address): any {
  return {
    street: address.street,
    streetnumber: address.streetNumber,
    postalcode: address.postalCode,
    city: address.city,
    country: address.country,
    latitude: address.latitude,
    longitude: address.longitude,
  };
}
