import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { IEvacuatetion } from 'src/app/Models/Requests/ievacuatetion';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';
import {
  IGetAllHousedStudents,
  IGethousedStudentInAdmin,
} from 'src/app/Models/iget-all-housed-students';

@Injectable({
  providedIn: 'root',
})
export class HousedStudentsService {
  constructor(private httpClient: HttpClient) {}
  getAllHousedStudents(
    PageNumber: number,
    PageSize: number,
    Search: string,
    Floor: number,
    Building: number,
    Level: number,
    Faculty: number,
    Nationality: number,
    AcademicYearId:number,
    IsEvacuated: string
  ): Observable<IApiPaginateResponse<IGetAllHousedStudents[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Floor', Floor)
      .set('Faculty', Faculty)
      .set('Building', Building)
      .set('Nationality', Nationality)
      .set('Level', Level)
      .set('AcademicYearId', AcademicYearId)
      .set('IsEvacuated', IsEvacuated)
      .set('Search', Search);

    return this.httpClient.get<IApiPaginateResponse<IGetAllHousedStudents[]>>(
      ApiLinks.Admin.HousedStudents.GetAll,
      { params }
    );
  }

  getHousedStudentById(
    housingAppId: number
  ): Observable<IApiResponse<IGethousedStudentInAdmin>> {
    const params = { housingAppId };
    return this.httpClient.get<IApiResponse<IGethousedStudentInAdmin>>(
      ApiLinks.Admin.HousedStudents.GetById,
      { params }
    );
  }

  evacuateStudent(
    evacuateRequest: IEvacuatetion
  ): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.patch<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Evacuation.Patch,
      evacuateRequest
    );
  }
}
