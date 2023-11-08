import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isFollowingStories: boolean = false;
  isAllStories: boolean = true;
  isUserLogged: boolean;
  constructor(private authService: UserAuthService) {
    this.isUserLogged = this.authService.isLogged;
    console.log(this.isUserLogged);
  }

  ngOnInit(): void {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
    console.log(this.isUserLogged);
  }

  allStories() {
    this.isAllStories = true;
    this.isFollowingStories = false;
  }
  followingStories() {
    this.isFollowingStories = true;
    this.isAllStories = false;
  }
}
