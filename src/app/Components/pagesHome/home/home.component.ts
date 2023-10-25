import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isFollowingStories: boolean = false;
  isAllStories: boolean = true;
  constructor() {
  }

  ngOnInit(): void {
  }
  allStories() {
    this.isAllStories = true;
    this.isFollowingStories = false;
  }
  followingStories() {
    this.isFollowingStories = true;
    this.isAllStories = false;
  }

}
