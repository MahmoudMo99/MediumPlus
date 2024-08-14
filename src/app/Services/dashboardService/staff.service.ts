import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';
import {
  IStaffEditRequest,
  IStaffGetAll,
  IStaffGetById,
  IStaffRequest,
} from 'src/app/Models/istaff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private httpClient: HttpClient) {}

  // add staff

  addStaff(staffData: IStaffRequest): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.post<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Employees.Create,
      staffData
    );
  }

  // get All Staff

  getAllStaff(
    PageNumber: number,
    PageSize: number,
    Search: string
  ): Observable<IApiPaginateResponse<IStaffGetAll[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Search', Search);

    return this.httpClient.get<IApiPaginateResponse<IStaffGetAll[]>>(
      ApiLinks.Admin.Employees.GetAll,
      { params }
    );
  }

  // get All Staff for Buildings Staff

  getAllBuildingsStaff(): Observable<IApiPaginateResponse<IStaffGetAll[]>> {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 500);

    return this.httpClient.get<IApiPaginateResponse<IStaffGetAll[]>>(
      ApiLinks.Admin.Employees.GetAll,
      { params }
    );
  }

  // delete staff

  deleteStaff(Id: number): Observable<IApiResponse<IIdResponse>> {
    let params = new HttpParams().set('Id', Id);

    return this.httpClient.delete<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Employees.Delete,
      { params }
    );
  }

  // get staff by id

  getStaffById(Id: number): Observable<IApiResponse<IStaffGetById>> {
    let params = new HttpParams().set('Id', Id);

    return this.httpClient.get<IApiResponse<IStaffGetById>>(
      ApiLinks.Admin.Employees.GetById,
      { params }
    );
  }
  // edit staff
  editStaff(Data: IStaffEditRequest): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.put<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Employees.Update,
      Data
    );
  }
}
