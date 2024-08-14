import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinks } from 'src/app/Constant/ApiLinks';
import { IIdResponse } from 'src/app/Models/Responses/i-id-response';
import { IAddBedToRoom } from 'src/app/Models/ibeds';

@Injectable({
  providedIn: 'root',
})
export class BedsService {
  constructor(private httpClient: HttpClient) {}

  addBedToRoom(data: IAddBedToRoom): Observable<IIdResponse> {
    return this.httpClient.post<IIdResponse>(ApiLinks.Admin.Beds.Create, data);
  }

  deleteBedFromRoom(BedId: number): Observable<IIdResponse> {
    return this.httpClient.delete<IIdResponse>(
      ApiLinks.Admin.Beds.Delete(BedId)
    );
  }
}
