export interface IGetHousingApps {
  id: number;
  studentName: string;
  status: string;
  nationalId: string;
  passportNumber: string;
  village: string;
  levelName: string;
  levelOrder: number;
  rateName: string;
  highSchoolQualificationPercentage: string;
}
export type IGetHousingAppsRequest = {
  PageNumber: number;
  PageSize: number;
  Status: number;
  Year: number;
  LevelOrder: number;
  FacultyId: number;
  IsEgyptian: boolean;
  IsNotEgyptian: boolean;
  IsOld: boolean;
  IsNew: boolean;
  IsRegular: boolean;
  IsPremium: boolean;
  Search: string;
};
