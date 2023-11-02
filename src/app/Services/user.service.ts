import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Components/modules/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = 'https://reqres.in/api/users';
    constructor(private httpClient: HttpClient) {}
    getUsers(page: number):Observable<User> {
      return this.httpClient.get<User>(this.url + '?page=' + page);
    }
}
