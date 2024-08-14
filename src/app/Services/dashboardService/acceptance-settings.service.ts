import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import {
  IAcceptanceSettingsRequest,
  IAcceptanceSettingsResponse,
} from 'src/app/Models/i-acceptance-settings';
import { Observable } from 'rxjs';
import { IStatisticsResponse } from 'src/app/Models/i-statistics';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { AdminApiUrls } from 'src/app/Constant/ApiUrls';

@Injectable({
  providedIn: 'root',
})
export class AcceptanceSettingsService {
  constructor(private httpClient: HttpClient) {}

  postAcceptanceSettingsForm(
    settingsData: Partial<IAcceptanceSettingsRequest>
  ): Observable<IApiResponse<IAcceptanceSettingsRequest>> {
    return this.httpClient.put<IApiResponse<IAcceptanceSettingsRequest>>(
      ApiLinks.Admin.AcceptanceSettings.Update,
      settingsData
    );
  }

  getAcceptanceSettingsById(
    academicYearId: number
  ): Observable<IApiResponse<IAcceptanceSettingsResponse>> {
    return this.httpClient.get<IApiResponse<IAcceptanceSettingsResponse>>(
      ApiLinks.Admin.AcceptanceSettings.GetByAcademicYearId(academicYearId)
    );
  }
  getStatisticsByAcademicYearId(
    academicYearId: number
  ): Observable<IApiResponse<IStatisticsResponse>> {
    return this.httpClient.get<IApiResponse<IStatisticsResponse>>(
      ApiLinks.Admin.AcceptanceSettings.Statistics(academicYearId)
    );
  }

  applyAutomaticFilter(undoFilter: boolean) {
    let params = new HttpParams().set('UndoFilter', undoFilter);
    return this.httpClient.get<IApiResponse<IApplyAutomaticFilterResponse>>(
      `${AdminApiUrls.ApplyAutomaticFilter}`,
      {
        params
      }
    );
  }
}
interface IApplyAutomaticFilterRequest {
  undoFilter: boolean;
}
interface IApplyAutomaticFilterResponse {
  undoFilter: boolean;
}
