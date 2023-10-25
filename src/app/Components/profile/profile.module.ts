import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileListComponent } from '../profile-list/profile-list.component';
import { ProfileHomeComponent } from '../profile-home/profile-home.component';

@NgModule({
  declarations: [ProfileComponent, ProfileListComponent,ProfileHomeComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
