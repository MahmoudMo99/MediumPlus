import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { TableStoriesComponent } from './table-stories/table-stories.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FormTopicComponent } from './form-topic/form-topic.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StartPageComponent } from './start-page/start-page.component';
import { FormRolesComponent } from './form-roles/form-roles.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashBoardComponent,
    TableStoriesComponent,
    TableUsersComponent,
    FormTopicComponent,
    SideBarComponent,
    StartPageComponent,
    FormRolesComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class DashBoardModule {}
