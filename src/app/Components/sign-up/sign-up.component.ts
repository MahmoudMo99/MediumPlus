import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userName: string;
  password: string;
  email: string;
  isUserLogged: boolean = false;

  constructor(private authService: UserAuthService) {
    this.userName = '';
    this.password = '';
    this.email = '';
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isLogged;
  }

  signup() {
    this.authService.signup(this.email,this.userName, this.password);
    this.isUserLogged = this.authService.isLogged;
  }
}
