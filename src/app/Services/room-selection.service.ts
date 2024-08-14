import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../Models/Base/IApiResponse';
import { environment } from '../../environments/environment';
import {
  IGetAvailableRooms,
  IGetAvailableRoomsRequest,
  IGetRoomById,
} from '../Models/Responses/iget-available-rooms';
import { IIdResponse } from '../Models/Responses/i-id-response';
import { ApiLinks } from '../Constant/ApiLinks';

@Injectable({
  providedIn: 'root',
})
export class RoomSelectionService {
  constructor(private httpClient: HttpClient) {}
  // get all Buildings
  getAllBuildings(): Observable<IApiResponse<[]>> {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 100);
    return this.httpClient.get<IApiResponse<[]>>(
      ApiLinks.Shared.Buildings.GetAll,
      {
        params,
      }
    );
  }

  // get all cities ( المراكز )
  getAllCitites(): Observable<IApiResponse<[]>> {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 200);
    return this.httpClient.get<IApiResponse<[]>>(environment.apiUrl + 'City', {
      params,
    });
  }
  // get all Available Rooms

  getAllAvailableRooms(
    request: IGetAvailableRoomsRequest
  ): Observable<IApiResponse<IGetAvailableRooms[]>> {
    let params = new HttpParams({ fromObject: request as any });
    return this.httpClient.get<IApiResponse<IGetAvailableRooms[]>>(
      environment.apiUrl + 'rooms/GetAll',
      {
        params: params,
      }
    );
  }

  // get Room by Id
  getRoomById(roomId: number): Observable<IApiResponse<IGetRoomById>> {
    let params = new HttpParams().set('id', roomId);
    return this.httpClient.get<IApiResponse<IGetRoomById>>(
      environment.apiUrl + 'rooms/GetById',
      {
        params: params,
      }
    );
  }

  // Select room
  selectRoom(roomId: number): Observable<IApiResponse<any>> {
    const params = new HttpParams().set('RoomId', roomId);

    return this.httpClient.post<IApiResponse<any>>(
      environment.apiUrl + 'rooms/select-room',
      null,
      {
        params: params,
      }
    );
  }

  // edit room selecction
  editRoomSelection(roomId: number): Observable<IApiResponse<any>> {
    const params = new HttpParams().set('NewRoomId', roomId);

    return this.httpClient.put<IApiResponse<any>>(
      environment.apiUrl + 'rooms/edit-room-selection',
      null,
      {
        params: params,
      }
    );
  }

  // select bed
  selectBed(BedId: number): Observable<IApiResponse<IIdResponse>> {
    return this.httpClient.patch<IApiResponse<IIdResponse>>(
      ApiLinks.Student.HousingApplications.SelectBed,
      { BedId }
    );
  }
}
