import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { TableArticlesComponent } from './table-articles/table-articles.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FromTopicComponent } from './from-topic/from-topic.component';
import { SideBarComponent } from './side-bar/side-bar.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleFormComponent } from './article-form/article-form.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    TableArticlesComponent,
    TableUsersComponent,
    FromTopicComponent,
    SideBarComponent,
    ArticleFormComponent,
    UserFormComponent,

  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    NgxPaginationModule,
  ]
})
export class DashBoardModule { }
