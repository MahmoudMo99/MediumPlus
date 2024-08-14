import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { IFacultyPercentages } from 'src/app/Models/ifaculty';
import { ConfigurationService } from 'src/app/Services/dashboardService/configuration.service';
import { FacultyService } from 'src/app/Services/dashboardService/faculty.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-faculty-configuration-accepted-table',
  templateUrl: './faculty-configuration-accepted-table.component.html',
  styleUrls: ['./faculty-configuration-accepted-table.component.css'],
})
export class FacultyConfigurationAcceptedTableComponent implements OnInit {
  form: FormGroup;
  faculty: IFacultyPercentages[] = [];
  selectedAcademicYear: number = 0;
  AcademicYears: IAcademicYearResponse[] = [];
  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toast: NgToastService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.getAcademicYear();

    this.initializeForm();
  }
  calcValue(percentage: number, totalnumber: number): number {
    return Math.floor((percentage * totalnumber) / 100);
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      academicYearId: this.selectedAcademicYear,
      facultyAcceptancePercentages: this.formBuilder.array([]),
    });
  }

  patchFormValue() {
    this.form.reset();
    this.initializeForm();
    const facultiesArray = this.form.get(
      'facultyAcceptancePercentages'
    ) as FormArray;
    this.faculty.forEach((faculty) => {
      const collegeGroup = this.formBuilder.group({
        facultyId: faculty.facultyId,
        percentage: faculty.percentage,
      });
      console.log('collegeGroup', collegeGroup.value);

      facultiesArray.push(collegeGroup);
    });
  }

  getAcademicYear() {
    this.configurationService
      .getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AcademicYears = res.data;

        if (res.data.length) {
          this.selectedAcademicYear = res.data.find((a) => a.isCurrent).id;
          this.getFacultyConfigurations();
        }
      });
  }

  getFacultyConfigurations() {
    this.facultyService
      .getFacultyAcceptancePercentages(
        this.selectedAcademicYear // تم إرسال العام الأكاديمي إلى الخدمة
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.faculty = res.data.faPercentages;
        this.patchFormValue();
      });
  }

  onAcademicYearChange() {
    this.getFacultyConfigurations();
  }

  onSaveRatingPercentage() {
    const formValue = this.form.value;
    this.facultyService
      .updatePercentageOfFaculty(formValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل نسبة القبول بنجاح',
          duration: 3000,
        });
      });
  }
}
