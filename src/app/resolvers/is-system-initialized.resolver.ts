import { DestroyRef, inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { ConfigurationService } from '../Services/dashboardService/configuration.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { lastValueFrom, map, take } from 'rxjs';
import { IAcademicYearResponse } from '../Models/iacademic-year';

export const isSystemInitializedResolver: ResolveFn<IAcademicYearResponse[]> = (
  route,
  state
) => {
  const destroyRef = inject(DestroyRef);
  const configurationService = inject(ConfigurationService);
  return lastValueFrom(
    configurationService.getAcademicYears().pipe(
      takeUntilDestroyed(destroyRef),
      take(1),
      map((res) => res.data)
    )
  );
};
