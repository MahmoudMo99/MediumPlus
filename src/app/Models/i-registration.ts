import { FormControl, FormGroup } from '@angular/forms';

export interface IRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegistrationRequest {
  email: string;
  password: string;
  confirmPassword: string;
  student: IStudent;
}

export interface IStudent {
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  phoneNumber: string;
  birthdate: string;
  nationalId: string;
  religionId: number;
  genderId: number;
  nationalityId: number;
  passport: IStudentPassport;
  universityemail: string;
  profilePhoto: File;
  iDCardPhoto: File;
  father: IStudentFather;
}

export interface IStudentFather {
  nationalId: string;
  phoneNumber: string;
  job: string;
}

export interface IStudentPassport {
  number: string;
  countryId: number;
}

export interface IReligion {
  id: number;
  name: string;
}
export interface IStudentType {
  id: number;
  name: string;
}

export interface IRegistrationRequestForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  student: FormGroup<{
    FirstName: FormControl<string>;
    secondName: FormControl<string>;
    thirdName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    birthdate: FormControl<string>;
    nationalId: FormControl<string>;
    religionId: FormControl<number>;
    genderId: FormControl<number>;
    nationalityId: FormControl<number>;
    father: FormGroup<{
      nationalId: FormControl<string>;
      phoneNumber: FormControl<string>;
      job: FormControl<string>;
    }>;
    passport: FormGroup<{
      number: FormControl<string>;
      countryId: FormControl<number>;
    }>;
    universityemail: FormControl<string>;
    profilePhoto: FormControl<File>;
    iDCardPhoto: FormControl<File>;
  }>;
}
