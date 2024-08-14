import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { HousingService } from '../Services/housing.service';
import { lastValueFrom, map } from 'rxjs';
import { IGetHousingAppByIdInStudent } from '../Models/Responses/iget-housing-app-by-id-in-student-V2';

export const currentHousingAppResolver: ResolveFn<
  IGetHousingAppByIdInStudent
> = async (route, state) => {
  const housingService = inject(HousingService);

  return lastValueFrom(
    housingService.getHousingById(0).pipe(map((res) => res.data))
  );
};
