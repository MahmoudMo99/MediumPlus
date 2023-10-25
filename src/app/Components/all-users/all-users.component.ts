import { Component } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  followers:boolean=true;
  following:boolean=false;
  suggestions:boolean=false;


  showFollowers(){
    this.followers = true
    this.following=false;
    this.suggestions=false;
  };

  showFollowing(){
    this.followers = false
    this.following=true;
    this.suggestions=false;
  };

  showSuggestions(){
    this.followers = false
    this.following=false;
    this.suggestions=true;
  };


}
