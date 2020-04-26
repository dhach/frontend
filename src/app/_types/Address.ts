export interface Address {
  streetLine1?: string;
  streetLine2?: string;
  streetLine3?: string;
  streetLine4?: string;
  county?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}


export function addressFromApi(obj: any): Address {
  // This is needed, if the address is not set
  if (!obj) {
    return {
      streetLine1: null,
      streetLine2: null,
      streetLine3: null,
      streetLine4: null,
      county: null,
      city: null,
      state: null,
      postalCode: null,
      country: null,
      latitude: null,
      longitude: null,
    };
  }
  return {
    streetLine1: obj.streetLine1,
    streetLine2: obj.streetLine2,
    streetLine3: obj.streetLine3,
    streetLine4: obj.streetLine4,
    county: obj.county,
    city: obj.city,
    state: obj.state,
    postalCode: obj.postalCode,
    country: obj.country,
    latitude: obj.latitude,
    longitude: obj.longitude,
  };
}


export function addressToApi(address: Address): any {
  return {
    streetLine1: address.streetLine1,
    streetLine2: address.streetLine2,
    streetLine3: address.streetLine3,
    streetLine4: address.streetLine4,
    county: address.county,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
    latitude: address.latitude,
    longitude: address.longitude,
  };
}
