import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { TableArticlesComponent } from './table-articles/table-articles.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FromTopicComponent } from './from-topic/from-topic.component';
import { StartPageComponent } from './start-page/start-page.component';
import { FormRolesComponent } from './form-roles/form-roles.component';

const routes: Routes = [
  {
      path: '', component: DashBoardComponent, children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      {path:'statistics',component:StartPageComponent},
      { path: 'articles', component: TableArticlesComponent },
      { path: 'users', component: TableUsersComponent },
      { path: 'createTopic', component: FromTopicComponent },
      { path: 'createRole', component:FormRolesComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule {


}
