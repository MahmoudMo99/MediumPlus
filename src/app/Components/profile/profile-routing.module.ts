import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileHomeComponent } from '../profile-home/profile-home.component';
import { ProfileListComponent } from '../profile-list/profile-list.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },

  {
    path: 'profile',component:ProfileHomeComponent
  },
  {
    path: 'list',component:ProfileListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
