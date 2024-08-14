import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ISystemSettingsRequest,
  ISystemSettingsResponse,
} from 'src/app/Models/i-system-settings';
@Injectable({
  providedIn: 'root',
})
export class SystemSettingsService {
  _isInitialized = new BehaviorSubject<boolean>(false);
  get isInitialized() {
    return this._isInitialized.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  postSystemSettingsForm(
    settingsData: Partial<ISystemSettingsRequest>
  ): Observable<IApiResponse<ISystemSettingsRequest>> {
    return this.httpClient.put<IApiResponse<ISystemSettingsRequest>>(
      `${environment.apiUrl}admin/system-settings`,
      settingsData
    );
  }

  getSystemSettingsById(
    academicYear: number
  ): Observable<IApiResponse<ISystemSettingsResponse>> {
    return this.httpClient.get<IApiResponse<ISystemSettingsResponse>>(
      `${environment.apiUrl}admin/system-settings/${academicYear}`
    );
  }
  systemInitialize() {
    return this.httpClient
      .get<IApiResponse<ISystemSettingsResponse>>(
        `${environment.apiUrl}admin/system-settings/system-initialization`
      )
      .pipe(
        tap((res) => {
          this._isInitialized.next(res.succeeded);
        })
      );
  }
  validatePeriods() {
    return this.getSystemSettingsById(0).pipe(
      take(1),
      map((res) => {
        let systemSetting = res.data;
        if (systemSetting) {
          const currentDate = Date.now();
          const housingPeriodStarted =
            currentDate >= Date.parse(systemSetting.startApplyHousingApp);
          const housingPeriodEnded =
            currentDate > Date.parse(systemSetting.endApplyHousingApp);
          const roomSelectionPeriodStarted =
            currentDate >= Date.parse(systemSetting.startRoomSelection);
          const roomSelectionPeriodEnded =
            currentDate > Date.parse(systemSetting.endRoomSelection);
          return {
            housingPeriod: {
              started: housingPeriodStarted,
              ended: housingPeriodEnded,
              valid: housingPeriodStarted && !housingPeriodEnded,
              message:
                housingPeriodStarted && !housingPeriodEnded
                  ? ''
                  : housingPeriodEnded
                  ? 'لقد انتهت فترة تقديم طلبات التسكين'
                  : 'لم تبدأ فترة تقديم طلبات التسكين',
            },
            roomSelectionPeriod: {
              started: roomSelectionPeriodStarted,
              ended: roomSelectionPeriodEnded,
              valid: roomSelectionPeriodStarted && !roomSelectionPeriodEnded,
              message:
                roomSelectionPeriodStarted && !roomSelectionPeriodEnded
                  ? ''
                  : roomSelectionPeriodEnded
                  ? 'لقد انتهت فترة اختيار الغرف'
                  : 'لم تبدأ فترة اختيار الغرف',
            },
          };
        }
        return {
          housingPeriod: {
            valid: false,
            message: 'لم يتم تهيئة اعدادات النظام بعد',
          },
          roomSelectionPeriod: {
            valid: false,
            message: 'لم يتم تهيئة اعدادات النظام بعد',
          },
        };
      })
    );
  }
}
