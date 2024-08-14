import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApiResponse } from '../Models/Base/IApiResponse';
import { IFacultyResponse } from '../Models/Responses/ifaculty-response';

@Injectable({
  providedIn: 'root',
})
export class CollegesService {
  constructor(private httpClient: HttpClient) {}

  // get all Universities
  getAllUniversities(): Observable<IApiResponse<[]>> {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 100);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'University',
      {
        params,
      }
    );
  }

  // get All Faculty For University
  getAllFacultyForUniversity(
    UniversityId: number
  ): Observable<IApiResponse<IFacultyResponse[]>> {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('UniversityId', UniversityId);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'Faculty/GetAllInUniversity',
      {
        params,
      }
    );
  }

  // get all departments for faculty
  getAllDepartmentsforFaculty(FacultyId: number): Observable<IApiResponse<[]>> {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('FacultyId', FacultyId);
    return this.httpClient.get<IApiResponse<[]>>(
      environment.apiUrl + 'Department',
      { params }
    );
  }

  // get All Levels for Faculty
  getAllLevelsForFaculty(FacultyId: number): Observable<IApiResponse<[]>> {
    let params = new HttpParams()
      .set('PageNumber', 1)
      .set('PageSize', 100)
      .set('FacultyId', FacultyId);
    return this.httpClient.get<IApiResponse<[]>>(environment.apiUrl + 'Level', {
      params,
    });
  }
}
