import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-table-articles',
  templateUrl: './table-articles.component.html',
  styleUrls: ['./table-articles.component.css'],
})
export class TableArticlesComponent implements OnInit {
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
