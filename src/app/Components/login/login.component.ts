import { HttpClient } from '@angular/common/http';
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
  token?: string;
  isUserLogged: boolean = false;

  constructor(private authService: UserAuthService, private router: Router, private httpClient: HttpClient) {
    this.userName = '';
    this.password = '';
  }

  onSubmit() {
    const loginData = {
      userName: this.userName,
      password: this.password,
    };

    // Make an HTTP POST request to your login API
    this.httpClient.post<any>('https:/localhost:44303/api/accounts/login', loginData)
    .subscribe(res  => {
      this.token = res.data.token;
      if(res.succeeded)
      {
        this.login(this.token!);
        console.log(res);
      }
      else
      {
        console.log(res);

      }
    });
}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isLogged;
  }

  login(token: string): void {
    this.authService.login(token);
    this.isUserLogged = this.authService.isLogged;
    const redirectUrl = this.authService.redirectUrl || '/Home';
    this.router.navigate([redirectUrl]);
    this.authService.redirectUrl = '';
  }



}
