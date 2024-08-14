import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { IBuildingRequest } from 'src/app/Models/Requests/i-building-data-request';
import { IBuildingResponse } from 'src/app/Models/Responses/i-building-data-response';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';
import { IBuildingWithFaculties } from 'src/app/Models/i-building-with-faculties';
import { IBuildingsStaff } from 'src/app/Models/istaff';
@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private httpClient: HttpClient) {}
  // post Building Data
  creatBuilding(Data: IBuildingRequest): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.post<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Buildings.Create,
      Data
    );
  }

  //  update Building Data
  updateBuildingData(
    Data: IBuildingRequest
  ): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.put<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Buildings.Update,
      Data
    );
  }

  getAllBuildings(
    PageNumber: number,
    PageSize: number,
    Search: string,
    IsActive: string,
    Type: string
  ): Observable<IApiPaginateResponse<IBuildingResponse[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Search', Search)
      .set('IsActive', IsActive)
      .set('Type', Type);
    return this.httpClient.get<IApiPaginateResponse<IBuildingResponse[]>>(
      ApiLinks.Shared.Buildings.GetAll,
      { params }
    );
  }

  // get  All of Buildings With Param
  getAllBuildingsWithParam(): Observable<
    IApiPaginateResponse<IBuildingResponse[]>
  > {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 100);

    return this.httpClient.get<IApiPaginateResponse<IBuildingResponse[]>>(
      ApiLinks.Shared.Buildings.GetAll,
      { params }
    );
  }

  // get Building
  getBuilding(id: number): Observable<IApiPaginateResponse<IBuildingResponse>> {
    return this.httpClient.get<IApiPaginateResponse<IBuildingResponse>>(
      ApiLinks.Admin.Buildings.GetById(id)
    );
  }

  // delete Building
  deleteBuilding(id: number): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.delete<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Buildings.Delete(id)
    );
  }

  getBuildingsWithFaculties(
    PageNumber: number,
    PageSize: number,
    Search: string,
    Type: string
  ): Observable<IApiPaginateResponse<IBuildingWithFaculties[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Search', Search)
      .set('Type', Type);

    return this.httpClient.get<IApiPaginateResponse<IBuildingWithFaculties[]>>(
      ApiLinks.Admin.Buildings.GetWithFaculties,
      { params }
    );
  }

  changeOrAddFaculties(
    buildingId: number,
    faculties: number[]
  ): Observable<IApiResponse<IBuildingWithFaculties>> {
    const data = {
      buildingId: buildingId,
      faculties: faculties,
    };
    return this.httpClient.patch<IApiResponse<IBuildingWithFaculties>>(
      ApiLinks.Admin.Buildings.UpdateAssignedFaculties(buildingId),
      data
    );
  }

  changeActivate(data: any): Observable<IApiResponse<any>> {
    return this.httpClient.patch<IApiResponse<any>>(
      ApiLinks.Admin.Buildings.ActivationState,
      data
    );
  }

  // get building Staffs

  getBuildingStaff(
    PageNumber: number,
    PageSize: number,
    Search: string,
    Type: string
  ): Observable<IApiPaginateResponse<IBuildingsStaff[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Search', Search)
      .set('Type', Type);
    return this.httpClient.get<IApiPaginateResponse<IBuildingsStaff[]>>(
      ApiLinks.Admin.Buildings.GetWithEmployees,
      { params }
    );
  }

  // assign and unassign staff to a building

  assignAndUnassignStaff(
    buildingId: number,
    employees: number[]
  ): Observable<IApiResponse<IBuildingsStaff>> {
    const data = {
      buildingId: buildingId,
      employees: employees,
    };
    return this.httpClient.patch<IApiResponse<IBuildingsStaff>>(
      ApiLinks.Admin.Buildings.UpdateOrAddEmployees(buildingId),
      data
    );
  }
}
