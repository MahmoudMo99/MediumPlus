import { FormControl, FormGroup } from "@angular/forms";

export type ISystemSettingsRequest = ReturnType<FormGroup<ISystemSettingsRequestForm>['getRawValue']>
// {
//   id: number;
//   minimumAcceptedDistance: number;
//   pfStartBirthdate: string;
//   pfEndBirthdate: string;
//   tfStartBirthdate: string;
//   tfEndBirthdate: string;
//   practicalFacultyRatingId: number;
//   theoreticalFacultyRatingId: number;
// }
export interface ISystemSettingsRequestForm {
  id: FormControl<number>;
  startApplyHousingApp: FormControl<string>;
  endApplyHousingApp: FormControl<string>;
  startRoomSelection: FormControl<string>;
  endRoomSelection: FormControl<string>;
  startPayment: FormControl<string>;
  endPayment: FormControl<string>;
}
export interface ISystemSettingsResponse {
  id: number;
  startApplyHousingApp: string;
  endApplyHousingApp: string;
  startRoomSelection: string;
  endRoomSelection: string;
  startPayment: string;
  endPayment: string;
}
