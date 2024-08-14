export interface IFaculty {
  universityId: number;
  name: string;
  facultyType: number;
}

export interface IFacultyType {
  id: number;
  typeName: string;
}

export interface IFacultySelect {
  id: number;
  name: string;
}

export interface IFacultyAcceptancePercentages {
  academicYearId: number;
  faPercentages: IFacultyPercentages[];
}

export interface IFacultyPercentages {
  facultyId: number;
  facultyName: string;
  facultyTypeName: string;
  numOfHousingApps: number;
  numOfApplicableHousingApps: number;
  percentage: number;
}
