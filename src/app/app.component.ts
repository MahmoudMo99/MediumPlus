import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './Services/user-auth.service';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mediumPlus';
  constructor(
    private authService: UserAuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.userService
        .getUserProfile(Number(this.authService.decodedToken!.sub))
        .subscribe((res) => {
          let profile = res.data;
          this.authService.updateCurrentUser(profile);
        });
    }
  }
}
