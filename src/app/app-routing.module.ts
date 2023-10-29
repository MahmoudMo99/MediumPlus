import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { HomeComponent } from './Components/pagesHome/home/home.component';
import { WriteStoryComponent } from './Components/write-story/WriteStoryComponent';
import { ArticlesComponent } from './Components/articles/articles.component';
import { authGuard } from './Gaurds/auth.guard';

const routes: Routes = [

  { path: '', component: HomeComponent,canActivate:[authGuard] },
  // { path: '', component: ArticlesComponent },
  { path: 'home', component: HomeComponent,canActivate:[authGuard] },
  { path: 'write', component: WriteStoryComponent,canActivate:[authGuard] },
  { path: 'profile',canActivate:[authGuard], loadChildren: () => import('./Components/profile/profile.module').then(m => m.ProfileModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
