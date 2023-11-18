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
import { StoriesComponent } from './Components/stories/stories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { UserFollowersComponent } from './Components/user-followers/user-followers.component';
import { UserFollowingComponent } from './Components/user-following/user-following.component';
import { UserSuggestionsComponent } from './Components/user-suggestions/user-suggestions.component';
import { StoriesOfFollowingComponent } from './Components/pagesHome/stories-of-following/stories-of-following.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { TopicsComponent } from './Components/topics/topics.component';
import { ComponentsGroupComponent } from './Components/components-group/components-group.component';
import { AllStoriesOnTopicComponent } from './Components/all-stories-on-topic/all-stories-on-topic.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { SavedStoriesOnListComponent } from './Components/saved-stories-on-list/saved-stories-on-list.component';
import { LeftSideProfileComponent } from './Components/left-side-profile/left-side-profile.component';
import { TopicComponent } from './Components/topic/topic.component';
import { StoryComponent } from './Components/story/story.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileHomeComponent } from './Components/profile-home/profile-home.component';
import { ProfileListComponent } from './Components/profile-list/profile-list.component';
import { AllOfStoriesComponent } from './Components/pagesHome/all-of-stories/all-of-stories.component';
import { ImageEditoComponent } from './Components/image-edito/image-edito.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    HomeComponent,
    LoginComponent,
    WriteStoryComponent,
    NavBarComponent,
    FooterComponent,
    StoriesComponent,
    AllUsersComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserSuggestionsComponent,
    AllOfStoriesComponent,
    StoriesOfFollowingComponent,
    SignUpComponent,
    TopicsComponent,
    ComponentsGroupComponent,
    AllStoriesOnTopicComponent,
    UserProfileComponent,
    ProfileHomeComponent,
    ProfileListComponent,
    SavedStoriesOnListComponent,
    LeftSideProfileComponent,
    TopicComponent,
    StoryComponent,
    ImageEditoComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
