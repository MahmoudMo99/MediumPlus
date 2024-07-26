import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { ApiResponse } from '../viewModels/api-response';
import { IPublisher } from '../Models/ipublisher';
import { environment } from 'src/environments/environment';
// import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {}

  // some users in footer
  getSomeUsers() {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 3);

    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      `${environment.APISERVER}/api/publishers/GetFollowerNotFollowing`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }

  // Get the followers but not the following
  getFollwersNotFollowings() {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 20);
    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      `${environment.APISERVER}/api/publishers/GetFollowerNotFollowing`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }

  // Get followers
  getFollowers() {
    let params = new HttpParams()
      .set('publisherId', this.authService.userId)
      .set('PageNumber', 1)
      .set('PageSize', 20);
    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      `${environment.APISERVER}/api/publishers/Followers`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
  // Get Followings
  getFollowings() {
    let params = new HttpParams()
      .set('publisherId', this.authService.userId)
      .set('PageNumber', 1)
      .set('PageSize', 20);
    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      `${environment.APISERVER}/api/publishers/Followings`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
  // follow method
  follow(id: number) {
    let params = new HttpParams().set('followingId', id);
    console.log(this.authService.token);

    return this.httpClient.post<ApiResponse<any>>(
      `${environment.APISERVER}/api/publishers/follow`,
      null,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }

  // UnFollow method
  UnFollow(id: number) {
    let params = new HttpParams().set('followingId', id);
    console.log(this.authService.token);

    return this.httpClient.delete<ApiResponse<any>>(
      `${environment.APISERVER}/api/publishers/UnFollow`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
}
