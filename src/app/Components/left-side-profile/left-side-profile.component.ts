import { Component } from '@angular/core';

@Component({
  selector: 'app-left-side-profile',
  templateUrl: './left-side-profile.component.html',
  styleUrls: ['./left-side-profile.component.css']
})
export class LeftSideProfileComponent {
  home: boolean = true;
  list: boolean = false;
  showHome() {
    this.home = true;
    this.list = false;
  }

  showList() {
    this.list = true;
    this.home = false;
  }

}
