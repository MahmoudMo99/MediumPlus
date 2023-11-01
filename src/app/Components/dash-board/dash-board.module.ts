import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoradRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { TableArticlesComponent } from './table-articles/table-articles.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FromTopicComponent } from './from-topic/from-topic.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    TableArticlesComponent,
    TableUsersComponent,
    FromTopicComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    DashBoradRoutingModule
  ]
})
export class DashBoradModule { }
