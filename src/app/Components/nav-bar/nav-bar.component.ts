import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('img-profile') && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  constructor() {
    window.addEventListener('click', this.closeDropdown.bind(this));
  }
}



