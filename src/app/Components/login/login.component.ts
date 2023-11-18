import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(private authService: UserAuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.userName, this.password).subscribe();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigate(['/Home']);
  }
}
