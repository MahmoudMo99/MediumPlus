import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { reloadEntireApp } from 'src/app/helpers/reloadEntireApp';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent {
  showTable: boolean = true;
  showSettings: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  showaTables() {
    this.showTable = !this.showTable;
    this.showSettings = false;
  }
  showaSettings() {
    this.showSettings = !this.showSettings;
    this.showTable = false;
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(reloadEntireApp);
  }
}
