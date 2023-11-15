import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { ApiResponse } from '../viewModels/api-response';
import { IPublisher } from '../Models/ipublisher';
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
      'https://localhost:44303/api/publishers/GetFollowerNotFollowing',
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
    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      'https://localhost:44303/api/publishers/GetFollowerNotFollowing',
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }

  // Get followers
  getFollwers() {
    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      'https://localhost:44303/api/publishers/Followers',
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }
  // Get Followings
  getFollowings() {
    return this.httpClient.get<ApiResponse<IPublisher[]>>(
      'https://localhost:44303/api/publishers/Followings',
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }
  // follow method
  follow(id: number) {
    let params = new HttpParams().set('followingId', id);
    console.log(this.authService.token);

    return this.httpClient.post<ApiResponse<any>>(
      'https://localhost:44303/api/publishers/follow',
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
      'https://localhost:44303/api/publishers/UnFollow',
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
}
