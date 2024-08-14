export interface IGetAllHousedStudentsRequest {
  PageNumber: number;
  PageSize: number;
  Search: string;
  Nationality: number;
  Floor: number;
  Faculty: number;
  Building: number;
  Level: number;
}

export interface IGetAllHousedStudents {
  id: number;
  name: string;
  nationalNumber: string;
  faculty: string;
  housingId: number;
  building: string;
  roomNumber: number;
  floor: string;
  bedNumber: number;
  isEvacuated: boolean;
}

export interface IGethousedStudentInAdmin {
  personalInformationDetails: {
    id: number;
    name: string;
    photo: string;
    birthdate: string;
    nationalNumber: string;
    nationalityId: number;
    nationality: string;
    religion: string;
    gender: string;
    universityemail: string;
  };
  housingApplicationId: number;
  date: string;
  mealOption: number;
  mealOptionName: string;
  status: number;
  statusName: string;
  academicYearName: string;
  isFatherGuardian: boolean;
  isFamilyOut: boolean;

  guardian: {
    firstName: string;
    middleName: string;
    lastName: string;
    nationalId: string;
    phoneNumber: string;
    job: string;
  };

  lastYearEstimation: {
    grade: number;
    percentage: number;
    ratingId: number;
    ratingName: string;
  };

  passport: {
    passportNumber: string;
    country: string;
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

  studentInfo: {
    hasPreviousPenalties: boolean;
    hasPreviousFinancialDues: boolean;
    registrationCanceled: boolean;
    livedInCampusLastYear: boolean;
    educationStatus: number;
    educationStatusName: string;
  };

  highSchoolQualification: {
    year: number;
    grade: number;
    percentage: number;
    highSchoolDepartment: number;
    highSchoolDepartmentName: string;
  };

  housingDataDetails: {
    buildingName: string;
    floorNumber: string;
    roomNumber: number;
    bedNumber: number;
    housingStatus: string;
  };

  contactInformationDetails: {
    phoneNumber: string;
    email: string;
    universityEmail: string;
  };

  getStudenDetailPassport: {
    number: string;
    countryId: number;
  };
  isEvacuated: true;
}
