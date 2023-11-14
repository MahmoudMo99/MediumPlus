import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isDropdownOpen: boolean = false;
  isUserLogged: boolean;
  userId?: string = this.authService.user.sub;

  constructor(
    private authService: UserAuthService,
    private activatedRoute: ActivatedRoute
  ) {
    window.addEventListener('click', this.closeDropdown.bind(this));
    this.isUserLogged = this.authService.isLogged;
  }

  ngOnInit(): void {
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
