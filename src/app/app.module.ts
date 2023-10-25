import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { WriteStoryComponent } from './Components/write-story/WriteStoryComponent';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArticlesComponent } from './Components/articles/articles.component';
import { FormsModule } from '@angular/forms';

import { ProfileHomeComponent } from './Components/profile-home/profile-home.component';
import { ProfileListComponent } from './Components/profile-list/profile-list.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { UserFollowersComponent } from './Components/user-followers/user-followers.component';
import { UserFollowingComponent } from './Components/user-following/user-following.component';
import { UserSuggestionsComponent } from './Components/user-suggestions/user-suggestions.component';

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
    AllUsersComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserSuggestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
