import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { AuthModule } from './Modules/authentication/auth/auth.module';
import { RoomSelectionModule } from './Modules/roomSelection/room-selection/room-selection.module';
import { UserModule } from './Modules/user/user/user.module';
import { FooterComponent } from './Components/footer/footer.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NgToastModule } from 'ng-angular-popup';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HousingLayoutComponent } from './Components/housing-layout/housing-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardLayoutComponent } from './Components/dashboard-layout/dashboard-layout.component';
import { AdminSidebarComponent } from './Components/admin-sidebar/admin-sidebar.component';
import { HousnigAppModule } from './Modules/housingApplicationsV2/housnig-app-v2/housnig-app.module';
import { ForbiddenPageComponent } from './Components/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { LayoutWithNavComponent } from './Components/layout-with-nav/layout-with-nav.component';
import { TeamWorkPageComponent } from './Components/team-work-page/team-work-page.component';
import { HasRolesDirective } from './Directives/has-roles.directive';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from './Components/loader/loader.component';
import { loaderInterceptor } from './Interceptors/loader.interceptor';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { httpErrorHandlingInterceptor } from './Interceptors/http-error-handling.interceptor';
import { AdminDashboardModule } from './Modules/adminDashboard/admin-dashboard/admin-dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomePageComponent,
    HousingLayoutComponent,
    DashboardLayoutComponent,
    AdminSidebarComponent,
    HousingLayoutComponent,
    ForbiddenPageComponent,
    NotFoundPageComponent,
    LayoutWithNavComponent,
    TeamWorkPageComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AdminDashboardModule,
    RoomSelectionModule,
    UserModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HousnigAppModule,
    HasRolesDirective,
    MatMenuModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loaderInterceptor,
        httpErrorHandlingInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
