export interface Personnel {
  id?: number;
  institution: string;
  qualification: string;
  area: string;
  researchGroup?: string;
  experienceWithPCR?: boolean;
  notes?: string;
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
  };
}
