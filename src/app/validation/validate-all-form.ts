import { FormControl, FormGroup } from '@angular/forms';
export class ValidateAllForm {
  static validateAllFormFiled(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFiled(control);
      }
    });
  }
}
