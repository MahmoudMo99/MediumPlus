import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../viewModels/api-response';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  protected readonly url: string;
  private _httpClient: HttpClient;
  private _authService: UserAuthService;
  constructor(
    httpClient: HttpClient,
    authService: UserAuthService,
    domain: string
  ) {
    this._httpClient = httpClient;
    this._authService = authService;
    this.url = `${environment.APISERVER}/api/${domain}`;
  }
  getAll(): Observable<ApiResponse<T[]>> {
    return this._httpClient.get<ApiResponse<T[]>>(`${this.url}`);
  }
  getById(id: number): Observable<ApiResponse<T>> {
    return this._httpClient.get<ApiResponse<T>>(`${this.url}/${id}`);
  }
  create(item: T): Observable<ApiResponse<T>> {
    return this._httpClient.post<ApiResponse<T>>(
      `${this.url}`,
      JSON.stringify(item),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._authService.token}`,
        },
      }
    );
  }
  delete(id: number) {
    return this._httpClient.delete<ApiResponse<T>>(`${this.url}/${id}`);
  }
  update(item: T): Observable<ApiResponse<T>> {
    return this._httpClient.put<ApiResponse<T>>(
      `${this.url}`,
      JSON.stringify(item)
    );
  }
}
