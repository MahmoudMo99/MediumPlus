import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

export const hasRolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  const roles: string[] = route.data['roles'];

  const isAuthorized = authService.hasRoles(roles);

  if (!isAuthorized) {
    router.navigate(['home']).then(() => {
      toast.warning({
        detail: 'تحذير',
        summary: 'انت غير مصرح لك بالدخول لهذة الصفحة',
        duration: 3000,
      });
    });
    return false;
  }
  return true;
};
