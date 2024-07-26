import { ITopic } from 'src/app/Models/itopic';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { ApiResponse } from '../viewModels/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends BaseService<ITopic> {
  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {
    super(httpClient, authService, 'topics');
  }
  getAllPaginationTopics() {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 9);
    let headers = new HttpHeaders().set(
      'Authorization',
      this.authService.token!
    );

    return this.httpClient.get<ApiResponse<ITopic[]>>(
      `${environment.APISERVER}/api/Topics`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
  getAllTopics() {
    let headers = new HttpHeaders().set(
      'Authorization',
      this.authService.token!
    );
    return this.httpClient.get<ApiResponse<ITopic[]>>(
      `${environment.APISERVER}/api/Topics`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }

  // addNewTopic(topic: any) {
  //   const body = JSON.stringify(topic);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.authService.token}`,
  //   });
  //   return this.httpClient.post<ApiResponse<ITopic>>(
  //     `${environment.APISERVER}/api/Topics`,
  //     body,
  //     { headers }
  //   );
  // }
}
