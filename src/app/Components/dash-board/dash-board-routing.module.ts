import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { TableStoriesComponent } from './table-stories/table-stories.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FormTopicComponent } from './form-topic/form-topic.component';
import { StartPageComponent } from './start-page/start-page.component';
import { FormRolesComponent } from './form-roles/form-roles.component';

const routes: Routes = [
  {
    path: '',
    component: DashBoardComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', component: StartPageComponent },
      { path: 'articles', component: TableStoriesComponent },
      { path: 'users', component: TableUsersComponent },
      { path: 'createTopic', component: FormTopicComponent },
      { path: 'createRole', component: FormRolesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardRoutingModule {}
