import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ITopic } from '../Models/itopic';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends BaseService<ITopic> {
  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService
  ) {
    super(httpClient, authService, 'topics');
  }
}
