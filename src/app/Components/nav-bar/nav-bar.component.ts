import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/Models/user';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isDropdownOpen: boolean = false;
  isUserLogged: boolean;
  userId?: string = this.authService.user.sub;
  profile: UserProfile = {} as UserProfile;


  constructor(
    private authService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,

  ) {
    window.addEventListener('click', this.closeDropdown.bind(this));
    this.isUserLogged = this.authService.isLogged;
  }

  ngOnInit(): void {


      this.userService.getUserProfile(Number(this.userId)).subscribe((res) => {
        if (res.succeeded) {
          this.profile = res.data;
        } else console.log(res);

        console.log(this.profile);
      });



    // this.isUserLogged = this.authService.isLogged;
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
  }
  logout() {
    this.authService.logout();
    // this.isUserLogged = this.authService.isLogged;
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
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
