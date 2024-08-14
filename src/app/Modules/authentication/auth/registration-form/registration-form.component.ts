import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ICountry } from 'src/app/Models/i-housing-app';
import {
  IRegistrationRequest,
  IRegistrationRequestForm,
  IReligion,
  IStudentType,
} from 'src/app/Models/i-registration';
import { AuthService } from 'src/app/Services/auth.service';
import { CountriesService } from 'src/app/Services/countries.service';
import { ConfirmPasswordValidator } from 'src/app/validation/confirm-password.validation';
import {
  CodesAndIdsPatterns,
  NamesPatterns,
  ValidationPatterns,
} from 'src/app/validation/validation-patterns';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  form: FormGroup<IRegistrationRequestForm>;
  RegistrationDataObj: IRegistrationRequest;
  submitted = false;
  // countries
  Countries: ICountry[] = [];
  showNationalIdField: boolean = false;
  showPassportFields: boolean = false;
  // eyePass
  typePassword: string = 'password';
  isTextPassword: boolean = false;
  iconEyePassword: string = 'eye-slash';
  // eyeConfirme
  type: string = 'password';
  isText: boolean = false;
  iconEye: string = 'eye-slash';

  @ViewChild('myNationalitySelect') myNationalitySelect: ElementRef;

  StudentsReligion: IReligion[] = [
    { id: 1, name: 'مسلم' },
    { id: 2, name: 'مسيحي' },
  ];

  StudentsType: IStudentType[] = [
    { id: 1, name: 'ذكر' },
    { id: 2, name: 'انثى' },
  ];

  constructor(
    private destroyRef: DestroyRef,
    public CountriesService: CountriesService,
    private toast: NgToastService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.initializeForm();
    this.logicalForm();
  }

  getAllCountries() {
    this.CountriesService.getAllCountries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.Countries = res.data;
        },
      });
  }

  initializeForm() {
    this.form = new FormGroup<IRegistrationRequestForm>(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(ValidationPatterns.emailPattern),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(ValidationPatterns.passwordPattern),
        ]),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
        }),
        student: new FormGroup({
          FirstName: new FormControl('', [
            Validators.required,
            Validators.pattern(NamesPatterns.InDividualNamePattern),
          ]),
          secondName: new FormControl('', [
            Validators.required,
            Validators.pattern(NamesPatterns.InDividualNamePattern),
          ]),
          thirdName: new FormControl('', [
            Validators.required,
            Validators.pattern(NamesPatterns.InDividualNamePattern),
          ]),
          lastName: new FormControl('', [
            Validators.required,
            Validators.pattern(NamesPatterns.InDividualNamePattern),
          ]),
          phoneNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(CodesAndIdsPatterns.PhoneNumberPattern),
          ]),
          birthdate: new FormControl('', [Validators.required]),
          nationalId: new FormControl(''),
          religionId: new FormControl(null, [Validators.required]),
          genderId: new FormControl(null, [Validators.required]),
          nationalityId: new FormControl(null, [Validators.required]),
          father: new FormGroup({
            nationalId: new FormControl(''),
            phoneNumber: new FormControl(''),
            job: new FormControl(''),
          }),
          passport: new FormGroup({
            number: new FormControl(''),
            countryId: new FormControl(null),
          }),
          universityemail: new FormControl('', [
            Validators.pattern(ValidationPatterns.UniversityEmailPattern),
          ]),
          profilePhoto: new FormControl(null, [Validators.required]),
          iDCardPhoto: new FormControl(null, [Validators.required]),
        }),
      },
      {
        validators: ConfirmPasswordValidator.MatchPassword, // Add the validator here
      }
    );
  }

  get formControls() {
    return this.form.controls;
  }
  get studentControls() {
    return this.form.controls['student']['controls'];
  }
  get fatherControls() {
    return this.form.controls['student']['controls']['father']['controls'];
  }
  get passportControls() {
    return this.form.controls['student']['controls']['passport']['controls'];
  }

  logicalForm() {
    this.studentControls.nationalityId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (this.myNationalitySelect) {
          const selectedOption: HTMLOptionElement =
            this.myNationalitySelect.nativeElement.options[
              this.myNationalitySelect.nativeElement.selectedIndex
            ];
          const country: string = selectedOption?.innerHTML;
          console.log(country);

          this.showNationalIdField = country === 'مصر';
          this.showPassportFields = country !== 'مصر';
          console.log(this.showPassportFields);
          console.log(this.showNationalIdField);

          this.updateValidators();
        }
      });
  }

  updateValidators() {
    const passportIdControl = this.passportControls.number;
    const countryIdControl = this.passportControls.countryId;
    const nationalIdControl = this.studentControls.nationalId;
    const fatherNationalIdControl = this.fatherControls.nationalId;
    const fatherPhoneNumberControl = this.fatherControls.phoneNumber;
    const fatherJobControl = this.fatherControls.job;
    if (this.showNationalIdField) {
      passportIdControl?.clearAsyncValidators();
      countryIdControl?.clearAsyncValidators();
      nationalIdControl.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.StudentNationalIdPattern),
      ]);
      // father
      fatherNationalIdControl?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.GeneralNationalIdPattern),
      ]);
      fatherPhoneNumberControl?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.PhoneNumberPattern),
      ]);
      fatherJobControl?.setValidators([
        Validators.required,
        Validators.pattern(NamesPatterns.NameWithSpacePattern),
      ]);
    } else {
      passportIdControl?.setValidators([
        Validators.required,
        Validators.pattern(ValidationPatterns.PassportCodePattern),
      ]);
      countryIdControl?.setValidators(Validators.required);
      // clear Validators
      nationalIdControl?.clearAsyncValidators();
      fatherNationalIdControl?.clearAsyncValidators();
      fatherPhoneNumberControl?.clearAsyncValidators();
      fatherJobControl?.clearAsyncValidators();
    }
    fatherNationalIdControl?.updateValueAndValidity();
    fatherPhoneNumberControl?.updateValueAndValidity();
    fatherJobControl?.updateValueAndValidity();
    passportIdControl.updateValueAndValidity();
    countryIdControl.updateValueAndValidity();
    nationalIdControl?.updateValueAndValidity();
  }

  onProfilePhotoSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.patchValue({
      student: { profilePhoto: file },
    });
  }

  onIDCardPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.patchValue({
      student: { iDCardPhoto: file },
    });
  }

  showEyePassword() {
    this.isTextPassword = !this.isTextPassword;
    if (this.isTextPassword) {
      this.iconEyePassword = 'eye';
      this.typePassword = 'text';
    } else {
      this.iconEyePassword = 'eye-slash';
      this.typePassword = 'password';
    }
  }

  showEye() {
    this.isText = !this.isText;
    if (this.isText) {
      this.iconEye = 'eye';
      this.type = 'text';
    } else {
      this.iconEye = 'eye-slash';
      this.type = 'password';
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      // تحديد كل حقل في النموذج وتحديده كـ "ملامس"
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      // تحديد كل حقل في نموذج الطالب وتحديده كـ "ملامس"
      Object.keys(this.form.get('student')['controls'] || {}).forEach(
        (field) => {
          const control = this.form.get('student')?.get(field);
          control?.markAsTouched({ onlySelf: true });
        }
      );
    }
    if (this.form.valid) {
      const registrationData = this.form.value as IRegistrationRequest;
      if (this.showNationalIdField) {
        registrationData.student.passport = null;
      } else {
        registrationData.student.nationalId = null;

        registrationData.student.father = null;
      }

      this.authService
        .registration(registrationData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم تسجيل الحساب بنجاح',
            duration: 5000,
          });
          this.form.reset();
          this.router.navigate(['/login']);
        });
    }
  }
}
