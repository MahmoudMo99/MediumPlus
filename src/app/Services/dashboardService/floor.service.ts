import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiUrls } from 'src/app/Constant/ApiUrls';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import { IFloorRequest } from 'src/app/Models/Requests/i-building-data-request';
import { IFloorResponse } from 'src/app/Models/Responses/i-building-data-response';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private httpClient: HttpClient) {}
  createFloor(
    FloorData: IFloorRequest
  ): Observable<IApiResponse<IFloorRequest>> {
    return this.httpClient.post<IApiResponse<IFloorRequest>>(
      AdminApiUrls.CreateFloor,
      FloorData
    );
  }

  // updata Floor Data
  updataFloorData(
    FloorData: IFloorRequest
  ): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.put<IApiResponse<IIdResponse>>(
      AdminApiUrls.UpdateFloor,
      FloorData
    );
  }

  // get All Floors For Building
  getAllFloorsForBuilding(
    BuildingId: number
  ): Observable<IApiPaginateResponse<IFloorResponse[]>> {
    let params = new HttpParams().set('BuildingId', +BuildingId);
    return this.httpClient.get<IApiPaginateResponse<IFloorResponse[]>>(
      AdminApiUrls.GetAllFloorsForBuilding,
      {
        params,
      }
    );
  }

  // get floor
  getFloor(id: number): Observable<IApiResponse<IFloorResponse>> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<IApiResponse<IFloorResponse>>(
      AdminApiUrls.GetFloorById,
      { params }
    );
  }

  // delete Floor
  deleteFloor(Id: number): Observable<IApiResponse<IIdResponse>> {
    const params = new HttpParams().set('Id', Id);
    return this.httpClient.delete<IApiResponse<IIdResponse>>(
      AdminApiUrls.DeleteFloor,
      {
        params,
      }
    );
  }
}
