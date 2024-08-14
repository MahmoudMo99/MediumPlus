import { AuthService } from 'src/app/Services/auth.service';
import {
  HttpErrorResponse,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

export const httpErrorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(NgToastService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        handleHttpError(toast, router, error, authService);
      } else {
        handleOtherError(toast);
      }
      return throwError(() => new Error('حدث خطأ آخر'));
    })
  );
};

function handleHttpError(
  toast: NgToastService,
  router: Router,
  error: HttpErrorResponse,
  authService: AuthService
): void {
  const errorMessages: Record<number, string> = {
    0: `حدث خطأ: ${error.error?.message}`,
    400: error.error?.message || 'طلب غير صالح',
    401: error.error?.message || 'عليك تسجيل الدخول اولاً',
    403: error.error?.message || 'ليس لديك الصلاحيات للوصول الي هذه الصفحة',
    422: error.error?.message || 'تأكد من صحة البيانات المدخلة',
    404: error.error?.message || 'غير موجود',
    500: 'خطأ في السيرفر',
  };

  const status = error.status;
  const errorMessage = errorMessages[status] || 'خطأ غير معروف';
  const summary = 'خطأ';

  toastError(toast, summary, errorMessage);

  if (status === 401) {
    authService.logout();
    router.navigate(['/login']);
  }
}

function handleOtherError(toast: NgToastService): void {
  toastError(toast, 'خطأ', 'حدث خطأ آخر');
}

function toastError(
  toast: NgToastService,
  detail: string,
  summary: string,
  duration: number = 3000
): void {
  toast.error({ detail, summary, duration });
}
