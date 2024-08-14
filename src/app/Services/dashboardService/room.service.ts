import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { IApiPaginateResponse } from 'src/app/Models/Base/IApiPaginateResponse';
import { IApiResponse } from 'src/app/Models/Base/IApiResponse';
import {
  IEditRoomRequest,
  IRoomRequest,
} from 'src/app/Models/Requests/i-building-data-request';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';
import {
  IGetAvailableRoomsAdmin,
  IGetRoomByIdAdmin,
} from 'src/app/Models/Responses/iget-available-rooms';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}
  // post Room Data
  createRoom(RoomData: IRoomRequest): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.post<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Rooms.Create,
      RoomData
    );
  }

  // updata Room Data
  updateRoomData(
    FloorData: IEditRoomRequest
  ): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.put<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Rooms.Update,
      FloorData
    );
  }

  // get  All Rooms
  getAllRooms(
    PageNumber: number,
    PageSize: number,
    FloorOrder: number,
    BuildingId: number,
    Search: string,
    AvailableOnly: boolean
  ): Observable<IApiPaginateResponse<IGetAvailableRoomsAdmin[]>> {
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('FloorOrder', FloorOrder)
      .set('BuildingId', BuildingId)
      .set('Search', Search)
      .set('AvailableOnly', AvailableOnly);
    return this.httpClient.get<IApiPaginateResponse<IGetAvailableRoomsAdmin[]>>(
      ApiLinks.Admin.Rooms.GetAll,
      { params }
    );
  }

  // get Room
  getRoom(id: number): Observable<IApiResponse<IGetRoomByIdAdmin>> {
    const params = { Id: id };
    return this.httpClient.get<IApiResponse<IGetRoomByIdAdmin>>(
      ApiLinks.Admin.Rooms.GetById,
      { params }
    );
  }

  // delete Room
  deleteRoom(id: number): Observable<IApiResponse<IIdResponse>> {
    const params = new HttpParams().set('Id', id);
    return this.httpClient.delete<IApiResponse<IIdResponse>>(
      ApiLinks.Admin.Rooms.Delete,
      { params }
    );
  }
}
