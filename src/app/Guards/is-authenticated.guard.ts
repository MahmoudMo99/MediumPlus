import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toast = inject(NgToastService);
  const router = inject(Router);

  let errorMessage: string = 'يجب عليك تسجيل الدخول اولاً';

  if (authService.isAuthenticated()) {
    return true;
  } else if (authService.isSessionExpired()) {
    errorMessage = 'انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى.';
  }

  toast.error({
    detail: 'خطأ',
    summary: errorMessage,
    duration: 3000,
  });

  authService.logout();

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

  return false;
};
