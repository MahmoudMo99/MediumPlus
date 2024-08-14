import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { lastValueFrom, map, take, tap } from 'rxjs';
import { SystemSettingsService } from '../Services/dashboardService/system-settings.service';
import { NgToastService } from 'ng-angular-popup';

export const isRoomSelectionPeriodValidGuard: CanActivateFn = (
  route,
  state
) => {
  const systemSettingsService = inject(SystemSettingsService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  return lastValueFrom(
    systemSettingsService.validatePeriods().pipe(
      take(1),
      tap((res) => {
        if (!res.roomSelectionPeriod.valid) {
          toast.error({
            detail: 'خطأ',
            summary: res.roomSelectionPeriod.message,
            duration: 3000,
          });
          router.navigate(['/housing-applications/current']);
        }
      }),
      map((res) => res.roomSelectionPeriod.valid)
    )
  );
};
