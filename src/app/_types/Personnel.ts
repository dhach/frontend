import { Address, addressFromApi, addressToApi } from './Address';
import { PersonnelQualification } from './PersonnelQualification';
import { PersonnelArea } from './PersonnelArea';


export interface Personnel {
  id?: number;
  institution: string;
  qualification: PersonnelQualification;
  area: PersonnelArea;
  researchGroup?: string;
  experienceWithPCR?: boolean;
  notes?: string;
  address: Address;
}


export function personnelFromApi(obj: any): Personnel {
  return {
    id: obj.id,
    institution: obj.institution,
    qualification: obj.qualification,
    area: obj.area,
    researchGroup: obj.researchgroup,
    experienceWithPCR: obj.experience_rt_pcr,
    notes: obj.annotation,
    address: addressFromApi(obj.address),
  };
}


export function personnelToApi(personnel: Personnel): any {
  return {
    id: personnel.id,
    institution: personnel.institution,
    qualification: personnel.qualification,
    area: personnel.area,
    researchgroup: personnel.researchGroup,
    // TODO Not sure why, but the field sometimes becomes a string...
    experience_rt_pcr: (personnel.experienceWithPCR as any) === 'true' ? true :
      (personnel.experienceWithPCR as any) === 'false' ? false : personnel.experienceWithPCR,
    annotation: personnel.notes,
    address: addressToApi(personnel.address),
  };
}
