import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApiResponse } from '../Models/Base/IApiResponse';
import { IApplyHousingResponse } from '../Models/Responses/iapply-housing-response';
import { IHousingAppRequest } from '../Models/i-housing-app';
import { IGetHousingAppByIdInStudent } from '../Models/Responses/iget-housing-app-by-id-in-student-V2';
import { housingApplicationStatus } from '../Enums/housingApplicationStatus';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  // new hosing
  public currentNewHousingData?: IGetHousingAppByIdInStudent;
  constructor(public httpClient: HttpClient) {}

  PostHousingData(
    housingApp: IHousingAppRequest
  ): Observable<IApiResponse<IApplyHousingResponse>> {
    return this.httpClient.post<IApiResponse<IApplyHousingResponse>>(
      `${environment.apiUrl}housing/v2/current`,
      housingApp
    );
  }

  getHousingById(
    academicYearId: number = 0
  ): Observable<IApiResponse<IGetHousingAppByIdInStudent>> {
    return this.httpClient.get<IApiResponse<IGetHousingAppByIdInStudent>>(
      `${environment.apiUrl}student/housing-applications/${academicYearId}`
    );
  }

  deleteHousing(): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}housing/v2/current`);
  }
  isHousingAppApproved() {
    return this.getHousingById(0).pipe(
      map((res) => {
        return res.data.status == housingApplicationStatus.Approved.id;
      })
    );
  }
}
