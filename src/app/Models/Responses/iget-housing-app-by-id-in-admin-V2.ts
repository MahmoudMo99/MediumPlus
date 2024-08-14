import { IGuardian } from '../i-housing-app';
import {
  IHighSchoolQualificationToGetById,
  IStudentInfoToGetById,
} from './iget-housing-app-by-id-in-student-V2';

export interface IGetHousingAppByIdInAdmin {
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
  studentDto: IStudentDto;
}

export interface IStudentDto {
  userId: number;
  studentId: number;
  name: string;
  birthdate: string;
  nationalNumber: string;
  photoUrl: string;
  nationalityId: number;
  nationality: string;
  passport: string;
  father: string;
  gender: string;
  religion: string;
}
