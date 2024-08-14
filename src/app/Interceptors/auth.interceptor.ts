import { type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const
  authInterceptor: HttpInterceptorFn = ( req, next ) => {
  const authService = inject(AuthService);
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authService.currentToken}` },
  });
  return next(authReq);
};
