import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/pagesHome/home/home.component';
import { WriteStoryComponent } from './Components/write-story/WriteStoryComponent';
import { StoriesComponent } from './Components/stories/stories.component';
import { authGuard } from './Gaurds/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { ComponentsGroupComponent } from './Components/components-group/components-group.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { TopicsComponent } from './Components/topics/topics.component';
import { AllStoriesOnTopicComponent } from './Components/all-stories-on-topic/all-stories-on-topic.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { LeftSideProfileComponent } from './Components/left-side-profile/left-side-profile.component';
import { SavedStoriesOnListComponent } from './Components/saved-stories-on-list/saved-stories-on-list.component';
import { TopicComponent } from './Components/topic/topic.component';
import { StoryComponent } from './Components/story/story.component';
const routes: Routes = [
  {
    path: '',
    component: ComponentsGroupComponent,
    children: [
      { path: '', redirectTo: '/Intro', pathMatch: 'full' },
      { path: 'Intro', component: StoriesComponent },
      { path: 'Home', component: HomeComponent, canActivate: [authGuard] },
      {
        path: 'AllUsers',
        component: AllUsersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'Login', component: LoginComponent },
  { path: 'Signup', component: SignUpComponent },
  { path: 'Write', component: WriteStoryComponent, canActivate: [authGuard] },
  { path: 'AllTopics', component: TopicsComponent, canActivate: [authGuard] },
  {
    path: 'MoreArticles',
    component: AllStoriesOnTopicComponent,
    canActivate: [authGuard],
  },
  {
    path: 'TopicPage',
    component: TopicComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ArticlePage/:storyId',
    component: StoryComponent,
    canActivate: [authGuard],
  },

  {
    path: 'UserProfile/:userId',
    component: UserProfileComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: LeftSideProfileComponent },
      { path: 'SavedOnList', component: SavedStoriesOnListComponent },
    ],
  },

  {
    path: 'dashBoard',
    loadChildren: () =>
      import('./Components/dash-board/dash-board.module').then(
        (m) => m.DashBoardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
