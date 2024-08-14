import { HousingService } from '../Services/housing.service';
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { lastValueFrom, take, tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

export const isHousingAppApprovedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  if (!authService.IsStudent) {
    return false;
  }
  const housingService = inject(HousingService);
  return lastValueFrom(
    housingService.isHousingAppApproved().pipe(
      take(1),
      tap((isApproved) => {
        if (!isApproved) {
          toast.error({
            detail: 'خطأ',
            summary: 'لا يمكنك الدخول لصفحة الغرف حتي يتم قبول طلب التسكين',
            duration: 3000,
          });
          router.navigate(['housing-applications/current']);
        }
      })
    )
  );
};
