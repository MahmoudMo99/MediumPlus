import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-left-side-profile',
  templateUrl: './left-side-profile.component.html',
  styleUrls: ['./left-side-profile.component.css'],
})
export class LeftSideProfileComponent implements OnInit {
  home: boolean = true;
  list: boolean = false;
  profileId?: number;
  profile: UserProfile = {} as UserProfile;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.profileId = Number(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUserProfile(Number(this.profileId)).subscribe((res) => {
      if (res.succeeded) {
        this.profile = res.data;
      } else console.log(res);

      console.log(this.profile);
    });
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
