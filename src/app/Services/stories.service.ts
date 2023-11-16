import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IStory } from '../Models/istory';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { ApiResponse } from '../viewModels/api-response';
import { Observable } from 'rxjs';
import { IStoryDetail } from '../Models/istory-detail';

@Injectable({
  providedIn: 'root',
})
export class StoriesService extends BaseService<IStory> {
  stories: IStory[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {
    super(httpClient, authService, 'stories');
  }

  getStoryById(id: number): Observable<ApiResponse<IStoryDetail>> {
    return this.httpClient.get<ApiResponse<IStoryDetail>>(`${this.url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.token}`,
      },
    });
  }

  createStory(item: any): Observable<ApiResponse<IStory>> {
    return this.httpClient.post<ApiResponse<IStory>>(
      `${this.url}`,
      item,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }
}
