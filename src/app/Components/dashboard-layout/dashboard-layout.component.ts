import { ActivatedRoute } from '@angular/router';
import { SystemSettingsService } from 'src/app/Services/dashboardService/system-settings.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent implements OnInit {
  AcademicYears: any[] = [];
  isSystemInitialized = false;
  constructor(
    private destroyRef: DestroyRef,
    private systemSettingsService: SystemSettingsService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {
    const academicYears = <IAcademicYearResponse[]>(
      this.activatedRoute.snapshot.data['academicYears']
    );

    if (academicYears.length) {
      this.isSystemInitialized = academicYears.some((a) => a.isCurrent);
    }
  }

  ngOnInit(): void {}

  systemInitialize() {
    this.systemSettingsService
      .systemInitialize()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 400) {
            this.toast.error({
              detail: 'خطأ',
              summary: 'تم تهيئة النظام مسبقاً',
              duration: 3000,
            });
          } else {
            this.toast.success({
              detail: 'صحيح',
              duration: 3000,
              summary: 'تم تهيئة النظام بنجاح',
            });
          }
        },
      });
  }
}
