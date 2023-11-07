import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isUserLogged: boolean;

  constructor(private authService: UserAuthService) {
    this.isUserLogged=this.authService.isLogged;
  }
  ngOnInit(): void {
    this.authService.loggedStatus().subscribe(status=>this.isUserLogged=status)
  }

}
