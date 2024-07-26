import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { IRole } from '../Models/irole';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../viewModels/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.APISERVER}/api/Role`;

  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {}

  postRole(role: IRole): Observable<ApiResponse<IRole>> {
    const token = this.authService.token;
    const userRole = this.authService.getUserRole();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<ApiResponse<IRole>>(this.apiUrl, role, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
