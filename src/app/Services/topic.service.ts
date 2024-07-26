import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';
import { IStory } from '../Models/istory';
import { ApiResponse } from '../viewModels/api-response';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private apiUrl = `${environment.APISERVER}/api/Stories/GetTopicWithStories`;

  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {}

  getAllPaginationStories() {
    let params = new HttpParams().set('PageNumber', 1).set('PageSize', 8);
    let headers = new HttpHeaders().set(
      'Authorization',
      this.authService.token!
    );
    return this.httpClient.get<ApiResponse<IStory[]>>(
      `${environment.APISERVER}/api/Stories/GetTopicWithStories`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params,
      }
    );
  }
  getAlltopicStories() {
    let headers = new HttpHeaders().set(
      'Authorization',
      this.authService.token!
    );
    return this.httpClient.get<ApiResponse<IStory[]>>(
      `${environment.APISERVER}/api/Stories/GetTopicWithStories`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }
}
