export interface AddressFormatField {
  id: string;
  label: string;
}


export function addressFormatFieldFromApi(obj: any, language: string): AddressFormatField {
  return {
    id: obj.id,
    label: obj.label[language] ?? obj.label.en,
  };
}
