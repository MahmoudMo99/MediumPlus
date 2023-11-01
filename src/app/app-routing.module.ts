import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { HomeComponent } from './Components/pagesHome/home/home.component';
import { WriteStoryComponent } from './Components/write-story/WriteStoryComponent';
import { ArticlesComponent } from './Components/articles/articles.component';
import { authGuard } from './Gaurds/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { ComponentsGroupComponent } from './Components/components-group/components-group.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsGroupComponent,
    children: [
      { path: '', redirectTo: '/Intro', pathMatch: 'full' },
      { path: 'Intro', component: ArticlesComponent },
      { path: 'Home', component: HomeComponent,canActivate:[authGuard], },
    ],
  },
  { path: 'Login', component: LoginComponent },
  { path: 'Signup', component: SignUpComponent },
  { path: 'Write', component: WriteStoryComponent,canActivate:[authGuard], },
  {
    path: 'Profile',
    canActivate:[authGuard],
    loadChildren: () =>
      import('./Components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  //   {
  //     path: 'dashBoard',
  //     loadChildren: () =>
  //       import('./dash-board/dash-board.module').then(
  //         m => m.DashBoardModule)
  //   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
