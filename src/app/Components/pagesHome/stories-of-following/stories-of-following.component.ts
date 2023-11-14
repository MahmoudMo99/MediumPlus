import { Component, OnInit } from '@angular/core';
import { IStory } from 'src/app/Models/istory';
import { StoriesService } from 'src/app/Services/stories.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
@Component({
  selector: 'app-stories-of-following',
  templateUrl: './stories-of-following.component.html',
  styleUrls: ['./stories-of-following.component.css'],
})
export class StoriesOfFollowingComponent implements OnInit {
  isUserLogged: boolean;
  stories: IStory[] = [];

  constructor(
    private authService: UserAuthService,
    private storiesService: StoriesService
  ) {
    {
      this.isUserLogged = this.authService.isLogged;
      console.log(this.isUserLogged);
    }
  }

  ngOnInit(): void {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
    console.log(this.isUserLogged);
    this.storiesService.getAll().subscribe((res) => {
      this.stories = res.data;
      console.log(this.stories);
    });
  }
}
