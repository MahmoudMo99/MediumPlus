import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css'],
})
export class IntroPageComponent implements OnInit {
  isUserLogged: boolean;

  constructor(private authService: UserAuthService, private router: Router) {
    this.isUserLogged = this.authService.isLogged;
  }

  ngOnInit(): void {
    this.updateLoggedStatus();
    if (this.authService.isAuthenticated()) this.router.navigate(['/Home']);
  }
  updateLoggedStatus() {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
  }
}
