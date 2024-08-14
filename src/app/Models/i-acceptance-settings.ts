import { FormControl, FormGroup } from "@angular/forms";

export type IAcceptanceSettingsRequest =ReturnType<FormGroup<IAcceptanceSettingsRequestForm>['getRawValue']>
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
export interface IAcceptanceSettingsRequestForm {
  id: FormControl<number>;
  minimumAcceptedDistance: FormControl<number>;
  pfStartBirthdate: FormControl<string>;
  pfEndBirthdate: FormControl<string>;
  tfStartBirthdate: FormControl<string>;
  tfEndBirthdate: FormControl<string>;
  practicalFacultyRatingId: FormControl<number>;
  theoreticalFacultyRatingId: FormControl<number>;

}
export interface IAcceptanceSettingsResponse{
  id: number;
  minimumAcceptedDistance: number;
  pfStartBirthdate: string;
  pfEndBirthdate: string;
  tfStartBirthdate: string;
  tfEndBirthdate: string;
  practicalFacultyRatingId: number;
  theoreticalFacultyRatingId: number;
}
