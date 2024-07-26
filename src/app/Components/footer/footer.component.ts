import { Component, OnInit } from '@angular/core';
import { IPublisher } from 'src/app/Models/ipublisher';
import { ITopic } from 'src/app/Models/itopic';
import { PublisherService } from 'src/app/Services/publisher.service';
import { TopicsService } from 'src/app/Services/topics.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isUserLogged: boolean;
  topics: ITopic[] = [];
  publishers: IPublisher[] = [];
  apiServer: string = environment.APISERVER;

  constructor(
    private authService: UserAuthService,
    private topicsService: TopicsService,
    private publisherService: PublisherService
  ) {
    this.isUserLogged = this.authService.isLogged;
  }
  follow(id: number) {
    console.log(id);
    let publisher = this.publishers.find((p) => p.id == id)!;
    publisher.isFollowing = true;

    this.publisherService.follow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        publisher.isFollowing = false;
      },
    });
  }
  unFollow(id: number) {
    let publisher = this.publishers.find((p) => p.id == id)!;
    publisher.isFollowing = false;
    this.publisherService.UnFollow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        publisher.isFollowing = true;
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
    this.topicsService.getAllPaginationTopics().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.topics = res.data;
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {},
    });

    this.publisherService.getSomeUsers().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.publishers = res.data;
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
