import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './Components/intro-page/intro-page.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { WriteStoryComponent } from './Components/write-story/write-story.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArticlesComponent } from './Components/articles/articles.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
