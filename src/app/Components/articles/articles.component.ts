import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
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


}

