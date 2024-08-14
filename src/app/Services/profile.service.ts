import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { IApiResponse } from '../Models/Base/IApiResponse';
import { IProfile } from '../Models/iprofile';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile$: Observable<IProfile>;

  constructor(private httpClient: HttpClient) {
    this.profile$ = this.getProfileData().pipe(
      map((res) => res.data),
      tap((profile) => {
        localStorage.setItem('hasRoom', profile.hasRoom.toString());
      })
    );
  }

  getProfileData(): Observable<IApiResponse<IProfile>> {
    return this.httpClient.get<IApiResponse<IProfile>>(
      environment.apiUrl + 'students/studentprofile'
    );
  }

  uploadProfilePhoto(photoFile: File): Observable<IApiResponse<IProfile>> {
    const formData = new FormData();
    formData.append('FormFile', photoFile);

    return this.httpClient.post<IApiResponse<IProfile>>(
      environment.apiUrl + 'students/uploadprofilephoto',
      formData
    );
  }
}
