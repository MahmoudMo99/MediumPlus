import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';


@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css']
})
export class IntroPageComponent implements OnInit {
  isUserLogged: boolean;

  constructor(private authService: UserAuthService) {
    this.isUserLogged=this.authService.isLogged;
    console.log(this.isUserLogged);


  }

  ngOnInit(): void {
    // this.isUserLogged = this.authService.isLogged;
    this.authService.loggedStatus().subscribe(status=>this.isUserLogged=status)
    console.log(this.isUserLogged);

  }

  logout(){
    this.authService.logout();
    // this.isUserLogged = this.authService.isLogged;
    this.authService.loggedStatus().subscribe(status=>this.isUserLogged=status)


  }
}
