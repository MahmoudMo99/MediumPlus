import {
  IGuardian,
  IHighSchoolQualification,
  IStudentInfo,
} from '../i-housing-app';
export interface IGetHousingAppByIdInStudent {
  housingApplicationId: number;
  date: string;
  mealOption: number;
  mealOptionName: string;
  status: number;
  statusName: string;
  academicYearName: string;
  isFatherGuardian: boolean;
  isFamilyOut: boolean;
  guardian: IGuardian;
  // percantage  لغاية ما طه يعدل ال
  // lastYearEstimation: ILastYearEstimation;
  lastYearEstimation: {
    grade: number;
    percentage: number;
    ratingId: number;
    ratingName: string;
  };
  departmentId: number;
  departmentName: string;
  facultyId: number;
  facultyName: string;
  levelId: number;
  levelOrder: number;
  levelName: string;
  villageId: number;
  villageName: string;
  cityId: number;
  cityName: string;
  governorateId: number;
  governorateName: string;
  countryId: number;
  countryName: string;
  specialNeedsType: number;
  specialNeedsTypeName: string;
  parentalStatus: number;
  parentalStatusName: string;
  maritalStatus: number;
  maritalStatusName: string;
  address: string;
  studentInfo: IStudentInfoToGetById;
  highSchoolQualification: IHighSchoolQualificationToGetById;
}

export interface IHighSchoolQualificationToGetById
  extends IHighSchoolQualification {
  highSchoolDepartmentName: string;
}
export interface IStudentInfoToGetById extends IStudentInfo {
  educationStatusName: string;
}
