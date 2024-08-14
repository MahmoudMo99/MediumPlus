import { ConfigurationService } from 'src/app/Services/dashboardService/configuration.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import {
  IAcademicYearRequestForm,
  IAcademicYearResponse,
} from 'src/app/Models/iacademic-year';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css'],
})
export class AcademicYearComponent implements OnInit {
  academicYear: FormGroup<IAcademicYearRequestForm>;
  initializedYear: IAcademicYearResponse;
  selectedAcademicYear: IAcademicYearResponse;
  AcademicYears: IAcademicYearResponse[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private configurationService: ConfigurationService,
    private toast: NgToastService
  ) {
    this.academicYear = new FormGroup({
      id: new FormControl(0),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
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

        this.getInitializedYearAndPutAcademicYear(this.selectedAcademicYear.id);
      });
  }

  onAcademicYearChange(academicYearId: number) {
    this.getInitializedYearAndPutAcademicYear(academicYearId);
  }

  getInitializedYearAndPutAcademicYear(id: number) {
    this.configurationService
      .getAcademicYearById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.initializedYear = res.data;

          this.initializedYear.startDate = this.initializedYear.startDate
            .toString()
            .split('T')[0];
          this.initializedYear.endDate = this.initializedYear.endDate
            .toString()
            .split('T')[0];

          this.academicYear.patchValue(this.initializedYear);
        },
      });
  }

  onSubmit() {
    const data = this.academicYear.value;

    this.configurationService
      .putAcademicYear(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم التعديل بنجاح',
          duration: 3000,
        });
      });
  }
}
