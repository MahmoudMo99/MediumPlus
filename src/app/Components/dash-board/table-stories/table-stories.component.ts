import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-table-stories',
  templateUrl: './table-stories.component.html',
  styleUrls: ['./table-stories.component.css'],
})
export class TableStoriesComponent implements OnInit {
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
