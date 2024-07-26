import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UserProfile } from 'src/app/Models/user';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isDropdownOpen: boolean = false;
  isUserLogged: boolean = false;
  profile: UserProfile = {} as UserProfile;

  constructor(
    private authService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    window.addEventListener('click', this.closeDropdown.bind(this));
  }
  ngOnInit(): void {
    this.updateLoggedStatus();
    this.updateUserProfile();
  }
  updateUserProfile() {
    this.authService
      .getUserUpdates()
      .pipe(
        map((user) => {
          user.photoUrl = environment.APISERVER + user.photoUrl;
          return user;
        })
      )
      .subscribe((user) => {
        if (user) {
          this.profile = user;
        }
      });
  }
  updateLoggedStatus() {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
  }

  logout() {
    this.authService.logout();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('img-profile') && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}
