import { Component, OnInit } from '@angular/core';
import { IPublisher } from 'src/app/Models/ipublisher';
import { PublisherService } from 'src/app/Services/publisher.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css'],
})
export class UserFollowersComponent implements OnInit {
  isUserLogged: boolean;
  followers: IPublisher[] = [];
  apiServer: string = environment.APISERVER;

  constructor(
    private authService: UserAuthService,
    private publisherService: PublisherService
  ) {
    this.isUserLogged = false;
  }

  follow(id: number) {
    console.log(id);

    this.publisherService.follow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);
          let followerIndex = this.followers.indexOf(res.data);
          this.followers.splice(followerIndex, 1);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateLoggedStatus() {
    this.authService
      .loggedStatus()
      .subscribe((status) => (this.isUserLogged = status));
  }
  ngOnInit(): void {
    this.updateLoggedStatus();
    this.publisherService.getFollowers().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.followers = res.data;
          console.log(res.data);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
