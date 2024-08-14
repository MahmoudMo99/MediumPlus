import { FormControl } from "@angular/forms";

export interface IAcademicYearResponse {
  id: number;
  name: string;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
  systemInfo: {
    isAcceptanceSettingConfigured: boolean;
    isSystemSettingConfigured: boolean;
    isFacultiesAcceptancePercentagesConfigured: boolean;
  };
}

export interface IAcademicYearRequestForm{
  id:FormControl<number>;
  startDate:FormControl<string>;
  endDate:FormControl<string>;
}

export interface IAcademicYearRequest {
  id: number;
  startDate: string;
  endDate: string;
}
