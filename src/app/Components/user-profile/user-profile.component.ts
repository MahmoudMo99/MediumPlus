import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from 'src/app/Models/user';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  home: boolean = true;
  list: boolean = false;
  userId?: number;
  profile: UserProfile = {} as UserProfile;
  token?: string;
  name: string;
  bio: string;
  photo: string;

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.name = '';
    this.bio = '';
    this.photo = '';
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
