import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRole } from 'src/app/Models/irole';
import { RolesService } from 'src/app/Services/roles.service';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.css'],
})
export class FormRolesComponent {
  roleName: string;
  constructor(private rolesService: RolesService, private router: Router) {
    this.roleName = '';
  }

  onSubmit() {
    let role = {
      roleName: this.roleName,
    } as IRole;
    this.rolesService.postRole(role).subscribe({
      next: (res) => {
        if (res.succeeded) {
          console.log(res);
        } else {
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
