import { inject } from '@angular/core';
import { SystemSettingsService } from './../Services/dashboardService/system-settings.service';
import { Router, type CanActivateFn } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

export const isHousingPeriodValidGuard: CanActivateFn = async (
  route,
  state
) => {
  const systemSettingsService = inject(SystemSettingsService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  const res = await lastValueFrom(systemSettingsService.validatePeriods());
  if (!res.housingPeriod.valid) {
    toast.error({
      detail: 'خطأ',
      summary: res.housingPeriod.message,
      duration: 3000,
    });
    router.navigate(['/profile']);
  }
  return res.housingPeriod.valid;
};
