import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../Models/user';
import { ApiResponse } from '../viewModels/api-response';
import { UserAuthService } from './user-auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.APISERVER + '/api/publishers';
  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {}
  getUsers(page: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '?page=' + page);
  }
  getUserProfile(userId: number) {
    return this.httpClient.get<ApiResponse<UserProfile>>(
      this.url + '/' + userId,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }
  UpdateProfile(userProfile: UserProfile) {
    let formData: FormData = new FormData();
    formData.append('name', userProfile.name);
    formData.append('id', userProfile.id.toString());
    formData.append('bio', userProfile.bio);
    const photoFile = userProfile.photoUrl;
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    return this.httpClient.put<ApiResponse<UserProfile>>(
      `${environment.APISERVER}/api/Publishers`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }
  // updateUserProfile(userProfile: UserProfile) {
  //   const body = JSON.stringify(userProfile);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.authService.token}`,
  //   });
  //   return this.httpClient.put<ApiResponse<UserProfile>>(
  //     this.url + '/' + this.authService.user.sub,
  //     body,
  //     { headers }
  //   );
  // }
  // follow(id: number) {
  //   let headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.authService.token}`
  //   );
  //   return this.httpClient.post<ApiResponse<IPublisher>>(
  //     this.url + '/' + id + '/follow',
  //     {},
  //     { headers }
  //   );
  // }
  // getSomeUsers() {
  //   let headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.authService.token}`
  //   );
  //   return this.httpClient.get<ApiResponse<IPublisher[]>>(
  //     this.url + '/someUsers',
  //     { headers }
  //   );
  // }
  // getFollowersOfPublisher(publisherId: number){
  //   let headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.authService.token}`
  //   );
}
