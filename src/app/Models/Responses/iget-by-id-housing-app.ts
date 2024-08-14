export interface IGetByIdHousingApp {
  id: number;
  withMeal: boolean;
  numberMeals: number;
  housingTypeId: number;
  housingType: string;
  status: string;
  academicYear: string;
  student: IStudentResponse;
  admisssionRequirements: boolean;
}

export interface IStudentResponse {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  code: string;
  birthdate: string;
  placeOfBirthId: number;
  placeOfBirth: string;
  familyStatusId: number;
  familyStatus: string;
  withSpecialNeeds: boolean;
  statusType: number;
  statusProve: string;
  isFamilyOut: boolean;
  address: string;
  nationalId: string;
  religionId: number;
  religion: string;
  genderId: number;
  gender: string;
  villageId: number;
  village: string;

  cityId: number;
  city: string;

  governorateId: number;
  governorate: string;

  countryId: number;
  country: string;

  father: IFatherResponse;
  guardian: IGuardianResponse;
  highSchoolQualification: IHighSchoolQualificationResponse;
  nationalityId: number;
  nationality: string;
  passport: IPassportResponse;
  faculty: IFacultyOfStudentResponse;
}

export interface IFatherResponse {
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  job: string;
  isGuardian: boolean;
}

export interface IGuardianResponse {
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  job: string;
}

export interface IHighSchoolQualificationResponse {
  year: number;
  grade: number;
  percentage: number;
  highSchoolDepartmentId: number;
  highSchoolDepartment: string;
}

export interface IPassportResponse {
  number: string;
  countryId: number;
  country: string;
}

export interface IFacultyOfStudentResponse {
  previousGrade: number;
  percentage: number;
  departmentId: number;
  department: string;
  levelId: number;
  level: string;
  facultyId: number;
  faculty: string;
  universityId: number;
  university: string;
}
