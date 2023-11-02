import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { TableArticlesComponent } from './table-articles/table-articles.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FromTopicComponent } from './from-topic/from-topic.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ArticleFormComponent } from './article-form/article-form.component';
const routes: Routes = [
  {
      path: '', component: DashBoardComponent, children: [
      { path: '', redirectTo: '/alticles', pathMatch: 'full' },
      { path: 'alticles', component: TableArticlesComponent },
      { path: 'users', component: TableUsersComponent },
      { path: 'alticleForm', component: ArticleFormComponent },
      { path: 'userForm', component: UserFormComponent },
      { path: 'createTopic', component:FromTopicComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoradRoutingModule { 


}
