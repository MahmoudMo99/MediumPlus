import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../Models/Base/IApiResponse';
import { environment } from '../../../environments/environment';
import { IGetHousingApps } from '../../Models/iget-housing-apps';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IGetHousingAppByIdInAdmin } from 'src/app/Models/Responses/iget-housing-app-by-id-in-admin-V2';
import { ApiLinks } from 'src/app/Constant/ApiLinks';

@Injectable({
  providedIn: 'root',
})
export class StudentsAppsService {
  constructor(private httpClient: HttpClient) {}

  // get all students housing applications
  getStudentsHousingApplications(
    PageNumber: number,
    PageSize: number,
    Status: number,
    AcademicYearId: number,
    LevelOrder: number,
    FacultyId: number,
    IsEgyptian: boolean,
    IsNotEgyptian: boolean,
    IsOld: boolean,
    IsNew: boolean,
    IsRegular: boolean,
    IsPremium: boolean,
    Search: string
  ): Observable<IApiPaginateResponse<IGetHousingApps[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Status', Status)
      .set('AcademicYearId', AcademicYearId)
      .set('LevelOrder', LevelOrder)
      .set('FacultyId', FacultyId)
      .set('IsEgyptian', IsEgyptian)
      .set('IsNotEgyptian', IsNotEgyptian)
      .set('IsOld', IsOld)
      .set('IsNew', IsNew)
      .set('IsRegular', IsRegular)
      .set('IsPremium', IsPremium)
      .set('Search', Search);

    return this.httpClient.get<IApiPaginateResponse<[]>>(
      ApiLinks.Admin.HousingApplications.GetAll,
      { params }
    );
  }

  // change housing status by application id
  changeHousingStatus(
    housingApplicationId: number,
    statusId: number
  ): Observable<IApiResponse<IGetHousingApps>> {
    var data = {
      housingApplicationId: housingApplicationId,
      status: statusId,
    };

    return this.httpClient.patch<IApiResponse<IGetHousingApps>>(
      ApiLinks.Admin.HousingApplications.UpdateStatus,
      data
    );
  }

  getStudentHousingAppDetailsById(
    id: number
  ): Observable<IApiResponse<IGetHousingAppByIdInAdmin>> {
    return this.httpClient.get<IApiResponse<IGetHousingAppByIdInAdmin>>(
      `${environment.apiUrl}Admin/HousingApps/${id}`
    );
  }
}
