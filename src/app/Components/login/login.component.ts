import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  isUserLogged: boolean = false;

  constructor(private authService: UserAuthService, private router: Router) {
    this.userName = '';
    this.password = '';
  }
  ngOnInit(): void {
    this.isUserLogged = this.authService.isLogged;
  }

  login() {
    this.authService.login(this.userName, this.password);
    this.isUserLogged = this.authService.isLogged;
    const redirectUrl = this.authService.redirectUrl || '/Home';
    this.router.navigate([redirectUrl]);
    this.authService.redirectUrl = '';
  }
}
