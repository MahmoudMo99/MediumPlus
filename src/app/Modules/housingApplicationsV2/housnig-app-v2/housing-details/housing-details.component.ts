import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IGetHousingAppByIdInStudent } from 'src/app/Models/Responses/iget-housing-app-by-id-in-student-V2';
import { SystemSettingsService } from 'src/app/Services/dashboardService/system-settings.service';
import { HousingService } from 'src/app/Services/housing.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { ConfigurationService } from 'src/app/Services/dashboardService/configuration.service';
@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.css'],
})
export class HousingDetailsComponent implements OnInit {
  housingData: IGetHousingAppByIdInStudent;
  ishousingPeriodValid = true;
  selectedAcademicYear: IAcademicYearResponse;
  AcademicYears: IAcademicYearResponse[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private router: Router,
    private housingService: HousingService,
    private toast: NgToastService,
    private systemSettingsService: SystemSettingsService,
    private configurationService: ConfigurationService,
    private activatedRoute: ActivatedRoute
  ) {}
  validatePeriods() {
    this.systemSettingsService
      .validatePeriods()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.ishousingPeriodValid = res.housingPeriod.valid;
      });
  }
  ngOnInit() {
    const currentHousingApp =
      this.activatedRoute.snapshot.data['currentHousingApp'];

    this.housingData = currentHousingApp;

    this.getAcademicYears();
    this.validatePeriods();
  }
  async getHousingAppByAcademicYearId() {
    this.housingService
      .getHousingById(this.selectedAcademicYear.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.housingData = res.data;
      });
  }
  async getAcademicYears() {
    this.configurationService
      .getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AcademicYears = res.data;
        this.selectedAcademicYear =
          this.AcademicYears.find((a) => a.isCurrent) ||
          this.AcademicYears[this.AcademicYears.length - 1];
        if (!this.housingData) {
          this.getHousingAppByAcademicYearId();
        }
      });
  }
  onAcademicYearChange() {
    this.getHousingAppByAcademicYearId();
  }
  navigate() {
    this.router.navigate(['housing-applications/apply']);
  }
  deleteHousingApplication() {
    this.housingService
      .deleteHousing()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.housingData = res.data;
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم حذف الطلب بنجاح',
            duration: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          this.router.navigate(['housing-applications']);
        },
      });
  }
}
