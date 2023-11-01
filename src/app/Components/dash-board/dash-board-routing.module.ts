import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { TableArticlesComponent } from './table-articles/table-articles.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FromTopicComponent } from './from-topic/from-topic.component';

const routes: Routes = [
  {
    path: '', component: DashBoardComponent, children: [
      { path: '' ,redirectTo: '/alticles', pathMatch: 'full' },
      {path:'alticles',component:TableArticlesComponent},
      { path: 'users', component:TableUsersComponent},
      { path: 'createTopic', component:FromTopicComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoradRoutingModule { 


}
