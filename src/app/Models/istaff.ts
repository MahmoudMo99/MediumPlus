export interface IStaffRequest {
  name: string;
  nationalId: string;
  phoneNumber: string;
  address: string;
  jobTitle: number;
}

export interface IStaffEditRequest extends IStaffRequest {
  id: number;
}

export interface IStaffGetAll {
  id: number;
  name: string;
  nationalId: string;
  address: string;
  phoneNumber: string;
  jobTitle: string;
  buildingDetails: IGetBuildingForStaff[];
}

export interface IStaffGetById {
  id: number;
  name: string;
  nationalId: string;
  address: string;
  jobTitle: number;
  jobTitleName: string;
  phoneNumber: string;
  buildingDetails: IGetBuildingForStaff[];
}

export interface IGetBuildingForStaff {
  id: number;
  name: string;
}

export interface IStaffType {
  id: number;
  staffName: string;
}

export interface IBuildingsStaff {
  id: number;
  name: string;
  type: string;
  employeeDetails: IStaffSelect[];
}
export interface IStaffSelect {
  id: number;
  name: string;
}
