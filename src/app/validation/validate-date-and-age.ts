import { AbstractControl } from '@angular/forms';

export class ValidateDateAndAge {
  static validateDate(control: AbstractControl): { [key: string]: any } | null {
    const inputDate = new Date(control.value);

    if (isNaN(inputDate.getTime())) {
      return { invalidDate: true };
    }

    return null;
  }

  static validateAgeRange(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    const age = currentDate.getFullYear() - inputDate.getFullYear();
    // if (age < 18 || age > 22) {

    //   return { invalidAgeRange: true };
    // }
    if (age < 18) {
      return { invalidAgeRange: true };
    }

    return null;
  }
  static validateBirthYear(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const birthYear = inputDate.getFullYear();

    // if (birthYear < 2000) {
    //   return { invalidBirthYear: true };
    // }

    return null;
  }
}
