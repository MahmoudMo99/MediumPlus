import { Component, OnInit } from '@angular/core';
import { IStory } from 'src/app/Models/istory';
import { StoriesService } from 'src/app/Services/stories.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-of-stories',
  templateUrl: './all-of-stories.component.html',
  styleUrls: ['./all-of-stories.component.css'],
})
export class AllOfStoriesComponent implements OnInit {
  isUserLogged: boolean;
  stories: IStory[] = [];
  apiServer: string = environment.APISERVER;
  constructor(
    private authService: UserAuthService,
    private storiesService: StoriesService
  ) {
    this.isUserLogged = false;
  }
  updateLoggedStatus() {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
  }
  ngOnInit(): void {
    this.updateLoggedStatus();
    this.storiesService.getAll().subscribe((res) => {
      this.stories = res.data;
    });
  }
}
