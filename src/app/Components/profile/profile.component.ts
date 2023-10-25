import { Component, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
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
