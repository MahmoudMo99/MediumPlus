import { IPublisher } from './../Models/ipublisher';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { ApiResponse } from '../viewModels/api-response';
import { UserAuthService } from './user-auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://reqres.in/api/users';
  constructor(private httpClient: HttpClient,private authService: UserAuthService)
   {}
  getUsers(page: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '?page=' + page);
  }

}
