import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IApiResponse } from '../../Models/Base/IApiResponse';
import {
  IAcademicYearRequest,
  IAcademicYearResponse,
} from '../../Models/iacademic-year';
import { environment } from '../../../environments/environment';
import { AdminApiUrls } from 'src/app/Constant/ApiUrls';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _isSystemInitialized = new BehaviorSubject<boolean>(false);
  get isSystemInitialized() {
    return this._isSystemInitialized.asObservable();
  }
  constructor(private destroyRef: DestroyRef, private httpClient: HttpClient) {
    this.getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this._isSystemInitialized.next(res.data.some((a) => a.isCurrent));
      });
  }
  getAcademicYears(): Observable<IApiResponse<IAcademicYearResponse[]>> {
    return this.httpClient
      .get<IApiResponse<IAcademicYearResponse[]>>(AdminApiUrls.GetAcademicYears)
      .pipe(
        tap((res) =>
          this._isSystemInitialized.next(res.data.some((a) => a.isCurrent))
        )
      );
  }
  getAcademicYearById(
    id: number
  ): Observable<IApiResponse<IAcademicYearResponse>> {
    return this.httpClient.get<IApiResponse<IAcademicYearResponse>>(
      `${environment.apiUrl}admin/academic-years/${id}`
    );
  }
  putAcademicYear(
    academicYear: Partial<IAcademicYearRequest>
  ): Observable<IApiResponse<IAcademicYearRequest>> {
    return this.httpClient.put<IApiResponse<IAcademicYearRequest>>(
      `${environment.apiUrl}admin/academic-years`,
      academicYear
    );
  }
}
