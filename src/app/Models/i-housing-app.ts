import { FormControl, FormGroup } from '@angular/forms';

export interface IHousingAppRequest {
  termsAndPoliciesIsAccepted: boolean;
  mealOption: number;
  address: string;
  villageId: number;
  levelId: number;
  departmentId: number;
  isFamilyOut: boolean;
  specialNeedsType: number;
  parentalStatus: number;
  maritalStatus: number;
  isFatherGuardian: boolean;
  guardian: IGuardian;
  lastYearEstimation: ILastYearEstimation;
  highSchoolQualification: IHighSchoolQualification;
  studentInfo: IStudentInfo;
}

export interface IHousingAppForm {
  termsAndPoliciesIsAccepted: FormControl<boolean>;
  mealOption: FormControl<number>;
  address: FormControl<string>;
  villageId: FormControl<number>;
  governorateId: FormControl<number>;
  cityId: FormControl<number>;
  countryId: FormControl<number>;
  levelId: FormControl<number>;
  departmentId: FormControl<number>;
  facultyId: FormControl<number>;
  isFamilyOut: FormControl<boolean>;
  specialNeedsType: FormControl<number>;
  parentalStatus: FormControl<number>;
  maritalStatus: FormControl<number>;
  isFatherGuardian: FormControl<boolean>;
  guardian: FormGroup<{
    firstName: FormControl<string>;
    middleName: FormControl<string>;
    lastName: FormControl<string>;
    nationalId: FormControl<string>;
    phoneNumber: FormControl<string>;
    job: FormControl<string>;
  }>;
  lastYearEstimation: FormGroup<{
    grade: FormControl<number>;
    percentage: FormControl<number>;
    ratingId: FormControl<number>;
  }>;
  highSchoolQualification: FormGroup<{
    year: FormControl<number>;
    grade: FormControl<number>;
    percentage: FormControl<number>;
    highSchoolDepartment: FormControl<number>;
  }>;
  studentInfo: FormGroup<{
    hasPreviousPenalties: FormControl<boolean>;
    hasPreviousFinancialDues: FormControl<boolean>;
    registrationCanceled: FormControl<boolean>;
    livedInCampusLastYear: FormControl<boolean>;
    educationStatus: FormControl<number>;
  }>;
}

export interface IGuardian {
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  job: string;
}
export interface ILastYearEstimation {
  grade: number;
  percantage: number;
  ratingId: number;
}
export interface IStudentInfo {
  hasPreviousPenalties: boolean;
  hasPreviousFinancialDues: boolean;
  registrationCanceled: boolean;
  livedInCampusLastYear: boolean;
  educationStatus: number;
}
export interface IHighSchoolQualification {
  year: number;
  grade: number;
  percentage: number;
  highSchoolDepartment: number;
}

export interface IMealOption {
  id: number;
  name: string;
}
export interface IParentalStatus {
  id: number;
  name: string;
}
export interface IRatingFaculty {
  id: number;
  name: string;
}
export interface IHighSchoolDepartment {
  id: number;
  name: string;
}

export interface ISpecialNeedsType {
  id: number;
  name: string;
}

export interface IEducationStatus {
  id: number;
  name: string;
}

export interface IMaritalStatus {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface IGovernorate {
  id: number;
  name: string;
}
export interface IVillage {
  id: number;
  name: string;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface ILevel {
  id: number;
  name: string;
  order: number;
}
export interface IUniversity {
  id: number;
  name: string;
}
