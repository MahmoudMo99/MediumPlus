import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string;
  password:string;
  isUserLogged:boolean=false;

  constructor(private authService:UserAuthService){
    this.userName='';
    this.password='';
  }
  ngOnInit(): void {
    this.isUserLogged=this.authService.isLogged;
  }

  login(){
    this.authService.login(this.userName,this.password);
    this.isUserLogged=this.authService.isLogged;

  }
  logout(){
    this.authService.logout();
    this.isUserLogged=this.authService.isLogged;

  }

}
