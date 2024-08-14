export interface IProfile {
  personalInformation: IPersonalInformation;
  passport: IProfilePassport;
  housingData: IProfileHousingData;
  educationData: IProfileEducationData;
  contactInformation: IProfileContactInformation;
  residence: IProfileResidence;
  hasRoom: boolean;
}
export interface IPersonalInformation {
  name: string;
  photo: string;
  birthdate: string;
  nationalNumber: string;
  nationalityId: number;
  nationality: string;
  religion: string;
  gender: string;
}
export interface IProfilePassport {
  passportNumber: string;
  country: string;
}
export interface IProfileHousingData {
  buildingName: string;
  floorNumber: string;
  roomNumber: number;
  housingStatus: string;
  hasHousing: boolean;
}
export interface IProfileEducationData {
  universityName: string;
  facultyName: string;
  departmentName: string;
  levelName: string;
}
export interface IProfileContactInformation {
  phoneNumber: string;
  email: string;
  universityEmail: string;
}
export interface IProfileResidence {
  residenceAddress: string;
  address: string;
}
