import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomSelectionComponent } from './room-selection/room-selection.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailsUserComponent } from './room-details-user/room-details-user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoomSelectionComponent, RoomsComponent, RoomDetailsUserComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [RoomSelectionComponent, RoomsComponent, RoomDetailsUserComponent],
})
export class RoomSelectionModule {}
