import { Component, OnInit } from '@angular/core';
import { IPublisher } from 'src/app/Models/ipublisher';
import { PublisherService } from 'src/app/Services/publisher.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-suggestions',
  templateUrl: './user-suggestions.component.html',
  styleUrls: ['./user-suggestions.component.css'],
})
export class UserSuggestionsComponent implements OnInit {
  isUserLogged: boolean = false;
  followersNotfollowings: IPublisher[] = [];
  apiServer: string = environment.APISERVER;
  constructor(
    private authService: UserAuthService,
    private publisherService: PublisherService
  ) {}

  follow(id: number) {
    console.log(id);

    this.publisherService.follow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);
          let followersNowFollowingsIndex = this.followersNotfollowings.indexOf(
            res.data
          );
          this.followersNotfollowings.splice(followersNowFollowingsIndex, 1);
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

    this.publisherService.getFollwersNotFollowings().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.followersNotfollowings = res.data;
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
