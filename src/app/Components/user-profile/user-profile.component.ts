import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from 'src/app/Models/user';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PublisherService } from 'src/app/Services/publisher.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  home: boolean = true;
  list: boolean = false;
  userId?: number;
  myId?: string = this.userAuthService.user.sub;
  profile: UserProfile = {} as UserProfile;
  token?: string;
  name: string;
  bio: string;
  photo: string;

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private publisherService: PublisherService

  ) {
    this.name = '';
    this.bio = '';
    this.photo = '';
  }
  follow(id: number) {
    console.log(id);
    this.profile.isFollowing=true;


    this.publisherService.follow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);
        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        this.profile.isFollowing=false;

      },
    });
  }

  unFollow(id:number){
    this.profile.isFollowing=false;
    this.publisherService.UnFollow(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res.data);

        } else {
          console.log(res.errors);
        }
      },
      error: (err) => {
        this.profile.isFollowing=true;

      },
    });

  }



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.userId = Number(paramMap.get('userId'));

      this.userService.getUserProfile(this.userId).subscribe((res) => {
        if (res.succeeded) {
          this.profile = res.data;
        } else console.log(res);

        console.log(this.profile);
      });
    });

  }

  isMyProfile(){
    // if(this.userId==this.myId){
    //   return true;
    // }
    return (this.userId==this.myId) ? true : false;
  }

  handlePhoto(event: any) {
    const photoFile = event.target.files[0];
    this.photo = photoFile;
  }
  onSubmit() {
    let updatedProfile: UserProfile = {
      id: this.profile.id,
      name: this.name,
      bio: this.bio,
      photoUrl: this.photo,
    } as UserProfile;
    this.userService.UpdateProfile(updatedProfile).subscribe(
      (res) => {
        if (res.succeeded) {
          this.profile=res.data;
          console.log(res);
        } else {
          console.log(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showHome() {
    this.home = true;
    this.list = false;
  }

  showList() {
    this.list = true;
    this.home = false;
  }
}
