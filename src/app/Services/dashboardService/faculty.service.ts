import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiUrls } from 'src/app/Constant/ApiUrls';
import { environment } from 'src/environments/environment';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { IEditFacultyRequest } from 'src/app/Models/Requests/ifaculty-request';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';
import {
  IFacultyResponse,
  IPercentageOfFacultyResponse,
  IUpdatePercentageOfFaculty,
} from 'src/app/Models/Responses/ifaculty-response';
import {
  IFaculty,
  IFacultyAcceptancePercentages,
} from 'src/app/Models/ifaculty';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private httpClient: HttpClient) {}
  // post Faculty Data
  createFaculty(Data: IFaculty): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.post<IApiResponse<IIdResponse>>(
      AdminApiUrls.CreateFaculty,
      Data
    );
  }
  //  update Faculty Data
  updateFacultyData(
    Data: IEditFacultyRequest
  ): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.put<IApiResponse<IIdResponse>>(
      AdminApiUrls.UpdateFaculty,
      Data
    );
  }

  getAllFaculties(
    PageNumber: number,
    PageSize: number,
    Search: string
  ): Observable<IApiPaginateResponse<any[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Search', Search);
    return this.httpClient.get<IApiPaginateResponse<any[]>>(
      AdminApiUrls.GetAllFaculties,
      {
        params,
      }
    );
  }

  // get Faculty
  getFaculty(id: number): Observable<IApiPaginateResponse<IFacultyResponse>> {
    return this.httpClient.get<IApiPaginateResponse<IFacultyResponse>>(
      `${environment.apiUrl}Faculty/${id}`
    );
  }

  // delete Faculty
  deleteFaculty(id: number): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.delete<IApiResponse<IIdResponse>>(
      `${environment.apiUrl}Faculty/${id}`
    );
  }

  // get Faculty Acceptance Percentages
  getFacultyAcceptancePercentages(
    academicYearId: number
  ): Observable<IApiResponse<IFacultyAcceptancePercentages>> {
    return this.httpClient.get<IApiResponse<IFacultyAcceptancePercentages>>(
      `${AdminApiUrls.UpdatePercentageOfFaculty}/${academicYearId}`
    );
  }

  // update Percentage Of Faculty
  updatePercentageOfFaculty(
    data: IUpdatePercentageOfFaculty
  ): Observable<IApiResponse<IPercentageOfFacultyResponse>> {
    return this.httpClient.put<IApiResponse<IPercentageOfFacultyResponse>>(
      AdminApiUrls.UpdatePercentageOfFaculty,
      data
    );
  }
}
