import { ConfigurationService } from '../../../../Services/dashboardService/configuration.service';
import { Component, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import {
  ISystemSettingsRequestForm,
  ISystemSettingsResponse,
} from 'src/app/Models/i-system-settings';
import { SystemSettingsService } from 'src/app/Services/dashboardService/system-settings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.css'],
})
export class SystemSettingsComponent implements OnInit {
  systemSettingsForm: FormGroup<ISystemSettingsRequestForm>;
  buttonText: string = 'حفظ';
  selectedAcademicYear: IAcademicYearResponse;
  AcademicYears: IAcademicYearResponse[] = [];
  oldSettings: ISystemSettingsResponse;

  constructor(
    private destroyRef: DestroyRef,
    private systemSettingsService: SystemSettingsService,
    private toast: NgToastService,
    private configurationService: ConfigurationService
  ) {
    this.systemSettingsForm = new FormGroup({
      id: new FormControl(0),
      startApplyHousingApp: new FormControl(''),
      endApplyHousingApp: new FormControl(''),
      startRoomSelection: new FormControl(''),
      endRoomSelection: new FormControl(''),
      startPayment: new FormControl(''),
      endPayment: new FormControl(''),
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
      });
  }

  onAcademicYearChange(academicYearId: number) {
    this.getSettingsByAcademicYearId(academicYearId);
  }

  getSettingsByAcademicYearId(academicYearId: number) {
    this.systemSettingsService
      .getSystemSettingsById(academicYearId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.oldSettings = res.data;

          this.oldSettings.startApplyHousingApp =
            this.oldSettings.startApplyHousingApp.toString().split('T')[0];
          this.oldSettings.endApplyHousingApp =
            this.oldSettings.endApplyHousingApp.toString().split('T')[0];
          this.oldSettings.startRoomSelection =
            this.oldSettings.startRoomSelection.toString().split('T')[0];
          this.oldSettings.endRoomSelection = this.oldSettings.endRoomSelection
            .toString()
            .split('T')[0];
          this.oldSettings.startPayment = this.oldSettings.startPayment
            .toString()
            .split('T')[0];
          this.oldSettings.endPayment = this.oldSettings.endPayment
            .toString()
            .split('T')[0];

          this.systemSettingsForm.patchValue(this.oldSettings);
        },
        error: (err) => {
          this.systemSettingsForm.reset();
          this.toast.error({
            detail: 'خطأ',
            summary: 'لا يوجد اعدادات فى هذه السنة',
            duration: 3000,
          });
        },
      });
  }

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
            location.reload();
          }
        },
      });
  }

  onSubmit() {
    const data = this.systemSettingsForm.value;

    this.systemSettingsService
      .postSystemSettingsForm(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم الحفظ بنجاح',
          duration: 3000,
        });
      });
  }
}
