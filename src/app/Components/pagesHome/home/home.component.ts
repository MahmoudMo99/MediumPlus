import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isFollowingStories: boolean = false;
  isAllStories: boolean = true;
  isUserLogged: boolean = false;
  constructor(
    private authService: UserAuthService,
    private userService: UserService
  ) {}
  updateLoggedStatus() {
    this.authService.loggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
  ngOnInit(): void {
    this.updateLoggedStatus();
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
