import { ConfigurationService } from '../../../../Services/dashboardService/configuration.service';
import { AcceptanceSettingsService } from '../../../../Services/dashboardService/acceptance-settings.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import {
  IAcceptanceSettingsRequestForm,
  IAcceptanceSettingsResponse,
} from 'src/app/Models/i-acceptance-settings';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { IStatisticsResponse } from 'src/app/Models/i-statistics';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-acceptance-settings',
  templateUrl: './acceptance-settings.component.html',
  styleUrls: ['./acceptance-settings.component.css'],
})
export class AcceptanceSettingsComponent implements OnInit {
  acceptanceSettingsForm: FormGroup<IAcceptanceSettingsRequestForm>;
  buttonText: string = 'حفظ';
  selectedAcademicYear: IAcademicYearResponse;
  AcademicYears: IAcademicYearResponse[] = [];
  oldSettings: IAcceptanceSettingsResponse;
  statistics: IStatisticsResponse = {} as IStatisticsResponse;

  constructor(
    private destroyRef: DestroyRef,
    private acceptanceSettingsService: AcceptanceSettingsService,
    private toast: NgToastService,
    private configurationService: ConfigurationService
  ) {
    this.acceptanceSettingsForm = new FormGroup({
      id: new FormControl(0),
      minimumAcceptedDistance: new FormControl(0),
      pfStartBirthdate: new FormControl(''),
      pfEndBirthdate: new FormControl(''),
      tfStartBirthdate: new FormControl(''),
      tfEndBirthdate: new FormControl(''),
      practicalFacultyRatingId: new FormControl(0),
      theoreticalFacultyRatingId: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.getAcademicYear();
  }

  getAcademicYear() {
    this.configurationService
      .getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AcademicYears = res.data;
        this.selectedAcademicYear = this.AcademicYears.find((a) => a.isCurrent);

        this.getSettingsByAcademicYearId(this.selectedAcademicYear.id);
        this.getStatisticsByAcademicYearId(this.selectedAcademicYear.id);
      });
  }

  onAcademicYearChange(academicYearId: number) {
    this.getSettingsByAcademicYearId(academicYearId);
    this.getStatisticsByAcademicYearId(academicYearId);
  }
  undoFilter() {
    this.acceptanceSettingsService
      .applyAutomaticFilter(true)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'تم التراجع عن التصفية',
            summary: 'تم التراجع',
            duration: 3000,
          });
          this.getStatisticsByAcademicYearId(this.selectedAcademicYear.id);
        },
        error: (err) => {
          this.toast.error({
            detail: 'حدث خطأ اثناء التراجع عن التصفية',
            summary: 'خطأ',
            duration: 3000,
          });
        },
      });
  }
  applyAutomaticFilter() {
    this.acceptanceSettingsService
      .applyAutomaticFilter(false)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'تم تطبيق التصفية',
            summary: 'تم التصفية',
            duration: 3000,
          });
          this.getStatisticsByAcademicYearId(this.selectedAcademicYear.id);
        },
        error: (err) => {
          this.toast.error({
            detail: 'حدث خطأ اثناء تطبيق التصفية',
            summary: 'خطأ',
            duration: 3000,
          });
        },
      });
  }

  getSettingsByAcademicYearId(academicYearId: number) {
    this.acceptanceSettingsService
      .getAcceptanceSettingsById(academicYearId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.oldSettings = res.data;

          this.oldSettings.pfStartBirthdate = this.oldSettings.pfStartBirthdate
            .toString()
            .split('T')[0];
          this.oldSettings.pfEndBirthdate = this.oldSettings.pfEndBirthdate
            .toString()
            .split('T')[0];
          this.oldSettings.tfStartBirthdate = this.oldSettings.tfStartBirthdate
            .toString()
            .split('T')[0];
          this.oldSettings.tfEndBirthdate = this.oldSettings.tfEndBirthdate
            .toString()
            .split('T')[0];

          this.acceptanceSettingsForm.patchValue(this.oldSettings);
        },
        error: (err) => {
          this.acceptanceSettingsForm.reset();
          this.toast.error({
            detail: 'خطأ',
            summary: 'لا يوجد اعدادات فى هذه السنة',
            duration: 3000,
          });
        },
      });
  }

  getStatisticsByAcademicYearId(academicYearId: number) {
    this.acceptanceSettingsService
      .getStatisticsByAcademicYearId(academicYearId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.statistics = res.data;
          console.log(res.data)
        },
        error: (err) => {
          this.toast.error({
            detail: 'خطأ',
            summary: 'لا يوجد احصائيات فى هذه السنة',
            duration: 3000,
          });
        },
      });
  }

  onSubmit() {
    const data = this.acceptanceSettingsForm.value;

    this.acceptanceSettingsService
      .postAcceptanceSettingsForm(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم الحفظ بنجاح',
          duration: 3000,
        });
      });
    this.getStatisticsByAcademicYearId(this.selectedAcademicYear.id);
  }
}
