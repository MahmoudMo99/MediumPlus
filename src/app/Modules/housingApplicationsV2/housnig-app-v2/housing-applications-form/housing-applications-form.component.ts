import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { IFacultyResponse } from 'src/app/Models/Responses/ifaculty-response';
import {
  IEducationStatus,
  IHighSchoolDepartment,
  IHousingAppRequest,
  IHousingAppForm,
  IMaritalStatus,
  IMealOption,
  IParentalStatus,
  IRatingFaculty,
  ISpecialNeedsType,
  ICity,
  ICountry,
  IDepartment,
  IGovernorate,
  ILevel,
  IUniversity,
  IVillage,
} from 'src/app/Models/i-housing-app';
import { CollegesService } from 'src/app/Services/colleges.service';
import { CountriesService } from 'src/app/Services/countries.service';
import { TermAndConditionService } from 'src/app/Services/dashboardService/term-and-condition.service';
import { HousingService } from 'src/app/Services/housing.service';
import { Router, UrlTree } from '@angular/router';
import { IGetHousingAppByIdInStudent } from 'src/app/Models/Responses/iget-housing-app-by-id-in-student-V2';
import {
  CodesAndIdsPatterns,
  NamesPatterns,
} from 'src/app/validation/validation-patterns';
import { IDeactivateComponent } from 'src/app/Guards/can-deactivate.guard';
import { Observable } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-housing-applications-form',
  templateUrl: './housing-applications-form.component.html',
  styleUrls: ['./housing-applications-form.component.css'],
})
export class HousingApplicationsFormComponent
  implements OnInit, IDeactivateComponent
{
  //#region Properties
  get lastYearEstimationControls() {
    return this.housingForm.controls.lastYearEstimation.controls;
  }
  get highSchoolControls() {
    return this.housingForm.controls.highSchoolQualification.controls;
  }
  get studentInfoControls() {
    return this.housingForm.controls.studentInfo.controls;
  }
  get guardianControls() {
    return this.housingForm.controls.guardian.controls;
  }
  get formControls() {
    return this.housingForm.controls;
  }
  TermsAndConditions: any[] = [];
  housingForm: FormGroup<IHousingAppForm>;
  currentHousingApp: IGetHousingAppByIdInStudent;
  // countries
  Countries: ICountry[] = [];
  Governorates: IGovernorate[] = [];
  cities: ICity[] = [];
  villages: IVillage[] = [];
  // for Data Universities
  Universities: IUniversity[] = [];
  Faculties: IFacultyResponse[] = [];
  Levels: ILevel[] = [];
  Departments: IDepartment[] = [];
  //
  showLevelOneData: boolean = true;
  IsFatherGuardian: boolean;

  selectedGovernorateId: number = 0;

  //#region Fixed Data
  EducationStatus: IEducationStatus[] = [
    { id: 1, name: 'راسب' },
    { id: 2, name: 'ناجح' },
    { id: 3, name: 'منقول بمواد' },
  ];
  MaritalStatus: IMaritalStatus[] = [
    { id: 1, name: 'اعزب' },
    { id: 2, name: 'متزوج' },
    { id: 3, name: 'مطلق' },
  ];
  MealOptions: IMealOption[] = [
    { id: 1, name: 'بدون' },
    { id: 2, name: 'وجبة واحده' },
    { id: 3, name: 'وجبتان' },
    { id: 4, name: 'ثلاث وجبات' },
  ];
  ParentalStatus: IParentalStatus[] = [
    { id: 1, name: 'الوالدين علي قيد الحياة' },
    { id: 2, name: 'الوالدين متوفيين' },
    { id: 3, name: 'الوالدين منفصلين' },
    { id: 4, name: 'الوالد متوفي' },
    { id: 5, name: 'الام متوفيه' },
  ];
  RatingFaculty: IRatingFaculty[] = [
    { id: 1, name: 'مقبول' },
    { id: 2, name: 'جيد' },
    { id: 3, name: 'جيد جدا' },
    { id: 4, name: 'امتياز' },
  ];
  HighSchoolDepartments: IHighSchoolDepartment[] = [
    { id: 1, name: 'علمي علوم' },
    { id: 2, name: 'علمي رياضة' },
    { id: 3, name: 'ادبي' },
  ];
  SpecialNeedsTypes: ISpecialNeedsType[] = [
    { id: 1, name: 'لا يوجد' },
    { id: 2, name: 'حالة ذهنية' },
    { id: 3, name: 'حالة بصرية' },
    { id: 4, name: 'حالة حركية' },
  ];
  //#endregion

  //#endregion

  //#region Constructor
  constructor(
    private destroyRef: DestroyRef,
    private termAndCondition: TermAndConditionService,
    public countriesService: CountriesService,
    public housingService: HousingService,
    public collegesService: CollegesService,
    private toast: NgToastService,
    private router: Router
  ) {
    this.initializeForm();
  }
  //#endregion

  ngOnInit(): void {
    this.initializeRequiredData();
    this.formValueChangeSubscriptions();
    this.patchOldHousingAppValue();
  }

  initializeForm() {
    this.housingForm = new FormGroup<IHousingAppForm>({
      termsAndPoliciesIsAccepted: new FormControl(null, [Validators.required]),
      mealOption: new FormControl(null, [Validators.required]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern(NamesPatterns.addressPattern),
      ]),
      villageId: new FormControl(null, [Validators.required]),
      countryId: new FormControl(null, [Validators.required]),
      cityId: new FormControl(null, [Validators.required]),
      governorateId: new FormControl(null, [Validators.required]),
      levelId: new FormControl(null, [Validators.required]),
      departmentId: new FormControl(null, [Validators.required]),
      facultyId: new FormControl(null, [Validators.required]),
      isFamilyOut: new FormControl(null, [Validators.required]),
      specialNeedsType: new FormControl(null, [Validators.required]),
      parentalStatus: new FormControl(null, [Validators.required]),
      maritalStatus: new FormControl(null, [Validators.required]),
      isFatherGuardian: new FormControl(null, [Validators.required]),
      guardian: new FormGroup({
        firstName: new FormControl(''),
        middleName: new FormControl(''),
        lastName: new FormControl(''),
        nationalId: new FormControl(''),
        phoneNumber: new FormControl(''),
        job: new FormControl(''),
      }),
      lastYearEstimation: new FormGroup({
        grade: new FormControl(null),
        percentage: new FormControl(null),
        ratingId: new FormControl(null),
      }),
      highSchoolQualification: new FormGroup({
        year: new FormControl(null),
        grade: new FormControl(null),
        percentage: new FormControl(null),
        highSchoolDepartment: new FormControl(null),
      }),
      studentInfo: new FormGroup({
        hasPreviousPenalties: new FormControl(false),
        hasPreviousFinancialDues: new FormControl(false),
        registrationCanceled: new FormControl(false),
        livedInCampusLastYear: new FormControl(false),
        educationStatus: new FormControl(null),
      }),
    });
  }

  initializeRequiredData() {
    this.getAllCountries();
    this.getAllTermsAndConditions();
    this.getAllUniversities();
    this.getAllFacultiesByUniversityId(1);
  }

  formValueChangeSubscriptions() {
    this.isFatherGuardianValueChangeSubscription();
    this.levelValueChangeSubscription();
    this.cityValueChangeSubscription();
    this.governorateValueChangeSubscription();
    this.countryValueChangeSubscription();
    this.facultyValueChangeSubscription();
  }

  levelValueChangeSubscription() {
    this.housingForm.controls.levelId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((levelId) => {
        if (levelId) {
          let level = this.Levels.find((level) => level.id === levelId);
          this.showLevelOneData = level?.order == 1;
          this.updateValidatorsGradesAndStudentInfo();
        }
      });
  }

  // update Validators
  updateValidatorsGradesAndStudentInfo() {
    const highSchoolDepartmentId = this.highSchoolControls.highSchoolDepartment;
    const year = this.highSchoolControls.year;
    const secondaryGrade = this.highSchoolControls.grade;
    const percentageSchool = this.highSchoolControls.percentage;
    const facultyGrade = this.lastYearEstimationControls.grade;
    const percentageFaculty = this.lastYearEstimationControls.percentage;
    const RatingFaculty = this.lastYearEstimationControls.ratingId;
    const educationStatus = this.studentInfoControls.educationStatus;

    if (this.showLevelOneData === true) {
      highSchoolDepartmentId?.setValidators(Validators.required);
      year?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.YearPattern),
      ]);
      secondaryGrade?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.GradeNumbersPattern),
      ]);
      percentageSchool?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.PercentagePattern),
      ]);
      // faculty data
      facultyGrade?.clearValidators();
      percentageFaculty?.clearValidators();
      RatingFaculty?.clearValidators();
      // studentPrevInfo
      educationStatus?.clearValidators();
    } else {
      highSchoolDepartmentId?.clearValidators();
      year?.clearValidators();
      secondaryGrade?.clearValidators();
      percentageSchool?.clearValidators();
      // faculty data
      facultyGrade?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.GradeNumbersPattern),
      ]);
      percentageFaculty?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.PercentagePattern),
      ]);
      RatingFaculty?.setValidators([Validators.required]);
      // studentPrevInfo
      educationStatus?.setValidators([Validators.required]);
    }
    highSchoolDepartmentId?.updateValueAndValidity();
    year?.updateValueAndValidity();
    secondaryGrade?.updateValueAndValidity();
    percentageSchool?.updateValueAndValidity();
    facultyGrade?.updateValueAndValidity();
    percentageFaculty?.updateValueAndValidity();
    RatingFaculty?.updateValueAndValidity();
    educationStatus?.updateValueAndValidity();
  }

  isFatherGuardianValueChangeSubscription() {
    this.housingForm.controls.isFatherGuardian.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.IsFatherGuardian = value;
        this.updateValidatorsOfGuardianData();
      });
  }
  // update Validators
  updateValidatorsOfGuardianData() {
    const firstName = this.guardianControls.firstName;
    const middleName = this.guardianControls.middleName;
    const lastName = this.guardianControls.lastName;
    const nationalId = this.guardianControls.nationalId;
    const phoneNumber = this.guardianControls.phoneNumber;
    const job = this.guardianControls.job;

    if (this.IsFatherGuardian === false) {
      firstName?.setValidators([
        Validators.required,
        Validators.pattern(NamesPatterns.InDividualNamePattern),
      ]);
      middleName?.setValidators([
        Validators.required,
        Validators.pattern(NamesPatterns.InDividualNamePattern),
      ]);
      lastName?.setValidators([
        Validators.required,
        Validators.pattern(NamesPatterns.InDividualNamePattern),
      ]);
      nationalId?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.GeneralNationalIdPattern),
      ]);
      phoneNumber?.setValidators([
        Validators.required,
        Validators.pattern(CodesAndIdsPatterns.PhoneNumberPattern),
      ]);
      job?.setValidators([
        Validators.required,
        Validators.pattern(NamesPatterns.NameWithSpacePattern),
      ]);
    } else {
      firstName?.clearValidators();
      middleName?.clearValidators();
      lastName?.clearValidators();
      nationalId?.clearValidators();
      phoneNumber?.clearValidators();
      job?.clearValidators();
    }
    firstName?.updateValueAndValidity();
    middleName?.updateValueAndValidity();
    lastName?.updateValueAndValidity();
    nationalId?.updateValueAndValidity();
    phoneNumber?.updateValueAndValidity();
    job?.updateValueAndValidity();
  }

  countryValueChangeSubscription() {
    this.housingForm.controls.countryId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.getAllGovernorateForCountry(value);
        }
      });
  }
  governorateValueChangeSubscription() {
    this.housingForm.controls.governorateId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.getAllCitiesForGovernorate(value);
        }
      });
  }

  cityValueChangeSubscription() {
    this.housingForm.controls.cityId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.getAllVillagesForCity(value);
        }
      });
  }
  onSelectCountry() {
    this.Governorates = [];
    this.cities = [];
    this.villages = [];
    this.housingForm.controls.governorateId.setValue(null);
    this.housingForm.controls.cityId.setValue(null);
    this.housingForm.controls.villageId.setValue(null);
  }
  onSelectGovernorate() {
    this.cities = [];
    this.villages = [];
    this.housingForm.controls.cityId.setValue(null);
    this.housingForm.controls.villageId.setValue(null);
  }
  onSelectCity() {
    this.villages = [];
    this.housingForm.controls.villageId.setValue(null);
  }

  getAllTermsAndConditions() {
    this.termAndCondition
      .getAllTermsAndConditions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        res.data.map((e) => {
          this.TermsAndConditions = e.termsandConditions.split('.');

        });
        console.log(this.TermsAndConditions)
      });
  }

  getAllCountries() {
    this.countriesService
      .getAllCountries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.Countries = res.data;
        },
      });
  }
  getAllGovernorateForCountry(countryId: number) {
    this.countriesService
      .getAllGovernoratesForCountry(countryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.Governorates = res.data;
      });
  }
  getAllCitiesForGovernorate(governorateId: number) {
    this.countriesService
      .getAllCitiesForGovernorate(governorateId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.cities = res.data;
      });
  }
  getAllVillagesForCity(cityId: number) {
    this.countriesService
      .getAllVillagesforCity(cityId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.villages = res.data;
        },
      });
  }

  getNumberSelectedValue(e: Event) {
    return +(e.target as HTMLSelectElement).value;
  }
  getAllUniversities() {
    this.collegesService
      .getAllUniversities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.Universities = res.data;
        },
      });
  }

  getAllFacultiesByUniversityId(universityId: number) {
    this.collegesService
      .getAllFacultyForUniversity(universityId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.Faculties = res.data;
      });
  }

  getAllLevelsByFacultyId(facultyId: number) {
    this.collegesService
      .getAllLevelsForFaculty(facultyId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.Levels = res.data;
      });
  }

  getAllDepartmentsByFacultyId(facultyId: number) {
    this.collegesService
      .getAllDepartmentsforFaculty(facultyId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.Departments = res.data;
        },
      });
  }
  onUniversityChanged(e: Event) {
    const universityId = this.getNumberSelectedValue(e);
    this.getAllFacultiesByUniversityId(universityId);
  }

  facultyValueChangeSubscription() {
    this.housingForm.controls.facultyId.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.getAllLevelsByFacultyId(value);
          this.getAllDepartmentsByFacultyId(value);
        }
      });
  }
  onSelectFaculty() {
    this.Levels = [];
    this.Departments = [];
    this.housingForm.controls.levelId.setValue(null);
    this.housingForm.controls.departmentId.setValue(null);
  }

  patchOldHousingAppValue() {
    this.housingService
      .getHousingById(0)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value.data) {
          this.currentHousingApp = value.data;
          this.collegesService
            .getAllLevelsForFaculty(this.currentHousingApp.facultyId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res) => {
              this.Levels = res.data;
              this.housingForm.patchValue(value.data);
            });
        }
      });
  }

  onSubmit() {
    if (this.housingForm.valid) {
      let formData = this.housingForm.value as IHousingAppRequest;

      if (this.IsFatherGuardian) {
        formData.guardian = null;
      }
      if (this.showLevelOneData) {
        formData.lastYearEstimation = null;
        formData.studentInfo = null;
      } else {
        formData.highSchoolQualification = null;
      }

      this.housingService
        .PostHousingData(formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: this.currentHousingApp
              ? 'تم تعديل الطالب بنجاج'
              : 'تم تقديم الطالب بنجاج',
            duration: 3000,
          });
          this.housingForm.reset();
          this.housingForm.patchValue(this.currentHousingApp);
          this.router.navigate(['housing-applications/current']);
        });
    } else {
      // تحديد كل حقل في النموذج وتحديده كـ "ملامس"
      Object.keys(this.housingForm.controls).forEach((field) => {
        const control = this.housingForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      // تحديد كل حقل في نموذج الطالب وتحديده كـ "ملامس"
      Object.keys(this.housingForm.get('guardian')['controls'] || {}).forEach(
        (field) => {
          const control = this.housingForm.get('guardian')?.get(field);
          control?.markAsTouched({ onlySelf: true });
        }
      );

      Object.keys(
        this.housingForm.get('lastYearEstimation')['controls'] || {}
      ).forEach((field) => {
        const control = this.housingForm.get('lastYearEstimation')?.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      Object.keys(
        this.housingForm.get('highSchoolQualification')['controls'] || {}
      ).forEach((field) => {
        const control = this.housingForm
          .get('highSchoolQualification')
          ?.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      Object.keys(
        this.housingForm.get('studentInfo')['controls'] || {}
      ).forEach((field) => {
        const control = this.housingForm.get('studentInfo')?.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.housingForm.dirty) {
      return confirm('هل تريد المغادرة بدون حفظ التغييرات ؟');
    }
    return true;
  }
}
