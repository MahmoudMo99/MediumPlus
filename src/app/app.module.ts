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
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { UserFollowersComponent } from './Components/user-followers/user-followers.component';
import { UserFollowingComponent } from './Components/user-following/user-following.component';
import { UserSuggestionsComponent } from './Components/user-suggestions/user-suggestions.component';
import { AllOfStoriesComponent } from './Components/pagesHome/all-of-stories/all-of-stories.component';
import { FollowingOfStoriesComponent } from './Components/pagesHome/following-of-stories/following-of-stories.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { TopicsComponent } from './Components/topics/topics.component';
import { ComponentsGroupComponent } from './Components/components-group/components-group.component';
import { HttpClientModule } from '@angular/common/http';

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
    AllUsersComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserSuggestionsComponent,
    AllOfStoriesComponent,
    FollowingOfStoriesComponent,
    SignUpComponent,
    TopicsComponent,
    ComponentsGroupComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
