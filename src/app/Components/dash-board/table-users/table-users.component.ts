import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
})
export class TableUsersComponent implements OnInit {
  Users: User[] = [];
  allUsers: number = 0;
  pagination: number = 1;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.fetchUsers();
    console.log(this.fetchUsers());
  }
  fetchUsers() {
    this.userService.getUsers(this.pagination).subscribe((res: any) => {
      this.Users = res.data;
      this.allUsers = res.total;
      console.log(res.total);
    });
  }
  renderPage(event: number) {
    this.pagination = event;
    this.fetchUsers();
  }
}
