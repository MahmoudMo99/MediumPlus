import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IStory } from '../Models/istory';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

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
}
