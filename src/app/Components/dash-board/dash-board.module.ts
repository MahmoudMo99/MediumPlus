import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { TableArticlesComponent } from './table-articles/table-articles.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FromTopicComponent } from './from-topic/from-topic.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StartPageComponent } from './start-page/start-page.component';

import { NgChartsModule } from 'ng2-charts';
import { FormRolesComponent } from './form-roles/form-roles.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    TableArticlesComponent,
    TableUsersComponent,
    FromTopicComponent,
    SideBarComponent,
    StartPageComponent,
    FormRolesComponent,


  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    NgxPaginationModule,
    NgChartsModule,
  ]
})
export class DashBoardModule { }
