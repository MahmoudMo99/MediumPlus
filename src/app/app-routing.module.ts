import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { HomeComponent } from './Components/pagesHome/home/home.component';
import { WriteStoryComponent } from './Components/write-story/WriteStoryComponent';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'write', component: WriteStoryComponent },
  { path: 'profile', loadChildren: () => import('./Components/profile/profile.module').then(m => m.ProfileModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
