import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  isUserLogged: boolean = false;
  token?: string;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.userName = '';
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
  }
  onSubmit() {
    console.log('TAHA HUSSEIN');

    const signupData = {
      userName: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      email: this.email,
    };
    this.httpClient
      .post<any>(`${environment.APISERVER}/api/accounts/register`, signupData)
      .subscribe((res) => {
        this.token = res.data.token;
        if (res.succeeded) {
          this.router.navigate(['/Login']);
          console.log(res);
        } else {
          console.log(res);
        }
      });
  }
  updateLoggedStatus() {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
  }
  ngOnInit(): void {
    this.updateLoggedStatus();
  }
}
