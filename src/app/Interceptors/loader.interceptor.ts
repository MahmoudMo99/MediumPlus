import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, delay, tap } from 'rxjs';
import { LoaderService } from '../Services/spinner/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.requestStarted();
  return next(req).pipe(
    delay(150),
    tap((event) => {
      if (event instanceof HttpResponse) {
        loaderService.requestEnded();
      }
    }),
    catchError((err) => {
      loaderService.resetLoader();
      throw err;
    })
  );
};
