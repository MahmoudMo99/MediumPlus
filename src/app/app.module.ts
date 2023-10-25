import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { HomeComponent } from './Components/pagesHome/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { WriteStoryComponent } from './Components/write-story/WriteStoryComponent';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArticlesComponent } from './Components/articles/articles.component';
import { FormsModule } from '@angular/forms';

import { ProfileHomeComponent } from './Components/profile-home/profile-home.component';
import { ProfileListComponent } from './Components/profile-list/profile-list.component';
import { AllOfStoriesComponent } from './Components/pagesHome/all-of-stories/all-of-stories.component';
import { FollowingOfStoriesComponent } from './Components/pagesHome/following-of-stories/following-of-stories.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    HomeComponent,
    LoginComponent,
    WriteStoryComponent,
    NavBarComponent,
    FooterComponent,
    ArticlesComponent,
    ProfileHomeComponent,
    ProfileListComponent,
    AllOfStoriesComponent,
    FollowingOfStoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
