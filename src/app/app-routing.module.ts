import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Modules/authentication/auth/login/login.component';
import { HousingLayoutComponent } from './Components/housing-layout/housing-layout.component';
import { RoomSelectionComponent } from './Modules/roomSelection/room-selection/room-selection/room-selection.component';
import { RoomDetailsUserComponent } from './Modules/roomSelection/room-selection/room-details-user/room-details-user.component';
import { StudentHousingApplicationsComponent } from './Modules/adminDashboard/admin-dashboard/student-housing-applications/student-housing-applications.component';
import { DashboardLayoutComponent } from './Components/dashboard-layout/dashboard-layout.component';
import { BuildingDetailsComponent } from './Modules/adminDashboard/admin-dashboard/building/building-details/building-details.component';
import { BuildingFormComponent } from './Modules/adminDashboard/admin-dashboard/building/building-form/building-form.component';
import { FloorFormComponent } from './Modules/adminDashboard/admin-dashboard/floor-form/floor-form.component';
import { RoomFormComponent } from './Modules/adminDashboard/admin-dashboard/room/room-form/room-form.component';
import { StudentHousingApplicationDetailsComponent } from './Modules/adminDashboard/admin-dashboard/student-housing-application-details/student-housing-application-details.component';
import { BuildingTableComponent } from './Modules/adminDashboard/admin-dashboard/building/building-table/building-table.component';
import { RoomTableComponent } from './Modules/adminDashboard/admin-dashboard/room/room-table/room-table.component';
import { FacultyFormComponent } from './Modules/adminDashboard/admin-dashboard/faculty/faculty-form/faculty-form.component';
import { FacultyTableComponent } from './Modules/adminDashboard/admin-dashboard/faculty/faculty-table/faculty-table.component';
import { FacultyConfigurationAcceptedTableComponent } from './Modules/adminDashboard/admin-dashboard/faculty-configuration-accepted-table/faculty-configuration-accepted-table.component';
import { SelectFacultiesInsideBuildingComponent } from './Modules/adminDashboard/admin-dashboard/select-faculties-inside-building/select-faculties-inside-building.component';
import { TermsAndConditionsComponent } from './Modules/adminDashboard/admin-dashboard/terms-and-conditions/terms-and-conditions.component';
import { AddStaffFormComponent } from './Modules/adminDashboard/admin-dashboard/staff/add-staff-form/add-staff-form.component';
import { StaffTableComponent } from './Modules/adminDashboard/admin-dashboard/staff/staff-table/staff-table.component';
import { StaffDetailsComponent } from './Modules/adminDashboard/admin-dashboard/staff/staff-details/staff-details.component';
import { FacultyDetailsComponent } from './Modules/adminDashboard/admin-dashboard/faculty/faculty-details/faculty-details.component';
import { RoomDetailsAdminComponent } from './Modules/adminDashboard/admin-dashboard/room/room-details-admin/room-details-admin.component';
import { RegistrationFormComponent } from './Modules/authentication/auth/registration-form/registration-form.component';
import { AcceptanceSettingsComponent } from './Modules/adminDashboard/admin-dashboard/acceptance-settings/acceptance-settings.component';
import { HousingApplicationsFormComponent } from './Modules/housingApplicationsV2/housnig-app-v2/housing-applications-form/housing-applications-form.component';
import { HousingDetailsComponent } from './Modules/housingApplicationsV2/housnig-app-v2/housing-details/housing-details.component';
import { ProfileComponent } from './Modules/user/user/profile/profile.component';
import { ViolationFormAndDetailsComponent } from './Modules/adminDashboard/admin-dashboard/violation-and-reconciliation/violation-form-and-details/violation-form-and-details.component';
import { ViolationTableComponent } from './Modules/adminDashboard/admin-dashboard/violation-and-reconciliation/violation-table/violation-table.component';
import { ResetPasswordFormComponent } from './Modules/authentication/auth/reset-password-form/reset-password-form.component';
import { ForbiddenPageComponent } from './Components/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { LayoutWithNavComponent } from './Components/layout-with-nav/layout-with-nav.component';
import { TeamWorkPageComponent } from './Components/team-work-page/team-work-page.component';
import { SystemSettingsComponent } from './Modules/adminDashboard/admin-dashboard/system-settings/system-settings.component';
import { AcademicYearComponent } from './Modules/adminDashboard/admin-dashboard/academic-year/academic-year.component';
import { HousedStudentsTableComponent } from './Modules/adminDashboard/admin-dashboard/housed-students/housed-students-table/housed-students-table.component';

import { isAuthenticatedGuard } from './Guards/is-authenticated.guard';
import { hasRolesGuard } from './Guards/has-role.guard';
import { canDeactivateGuard } from './Guards/can-deactivate.guard';
import { studentProfileResolver } from './resolvers/student-profile.resolver';
import { isHousingAppApprovedGuard } from './Guards/is-housing-app-approved.guard';
import { isHousingPeriodValidGuard } from './Guards/is-housing-period-valid.guard';
import { isRoomSelectionPeriodValidGuard } from './Guards/is-room-selection-period-valid.guard';
import { isSystemInitializedResolver } from './resolvers/is-system-initialized.resolver';
import { BuildingsStaffComponent } from './Modules/adminDashboard/admin-dashboard/staff/buildings-staff/buildings-staff.component';
import { HousedStudentDetailsComponent } from './Modules/adminDashboard/admin-dashboard/housed-students/housed-student-details/housed-student-details.component';
import { currentHousingAppResolver } from './resolvers/current-housing-app.resolver';

const routes: Routes = [
  { path: 'Forbidden', component: ForbiddenPageComponent },

  {
    path: '',
    component: LayoutWithNavComponent,
    resolve: { studentProfile: studentProfileResolver },
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      // { path: 'Home', component: HomePageComponent },
      { path: 'home', component: TeamWorkPageComponent },
      { path: 'reset-password', component: ResetPasswordFormComponent },
      { path: 'registration', component: RegistrationFormComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [isAuthenticatedGuard],
      },
      {
        path: 'rooms',
        component: RoomSelectionComponent,
        canActivate: [
          isAuthenticatedGuard,
          hasRolesGuard,
          isHousingAppApprovedGuard,
          isRoomSelectionPeriodValidGuard,
        ],
        data: { roles: ['Student'] },
      },
      {
        path: 'rooms/:rid',
        component: RoomDetailsUserComponent,
        canActivate: [
          isAuthenticatedGuard,
          hasRolesGuard,
          isHousingAppApprovedGuard,
          isRoomSelectionPeriodValidGuard,
        ],
        data: { roles: ['Student'] },
      },

      // Housing
      {
        path: 'housing-applications',
        component: HousingLayoutComponent,
        children: [
          { path: '', redirectTo: 'apply', pathMatch: 'full' },
          {
            path: 'apply',
            component: HousingApplicationsFormComponent,
            canDeactivate: [canDeactivateGuard],
            canActivate: [isHousingPeriodValidGuard],
          },
          {
            path: 'current',
            component: HousingDetailsComponent,
            resolve: { currentHousingApp: currentHousingAppResolver },
          },
        ],
        canActivate: [isAuthenticatedGuard, hasRolesGuard],
        data: { roles: ['Student'] },
      },

      // Admin
      {
        path: 'admin-dashboard',
        component: DashboardLayoutComponent,
        children: [
          { path: '', redirectTo: 'housing-applications', pathMatch: 'full' },
          {
            path: 'housing-applications',
            component: StudentHousingApplicationsComponent,
          },
          {
            path: 'housing-applications/:id',
            component: StudentHousingApplicationDetailsComponent,
          },
          {
            path: 'faculties-percentages',
            component: FacultyConfigurationAcceptedTableComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          {
            path: 'buildings/faculties',
            component: SelectFacultiesInsideBuildingComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          // Building
          { path: 'buildings/create', component: BuildingFormComponent },
          { path: 'buildings', component: BuildingTableComponent },
          {
            path: 'buildings/employees',
            component: BuildingsStaffComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          {
            path: 'buildings/update/:id',
            component: BuildingFormComponent,
          },
          {
            path: 'buildings/:id',
            component: BuildingDetailsComponent,
          },
          // Floor
          { path: 'floors/create', component: FloorFormComponent },
          { path: 'floors/update/:id', component: FloorFormComponent },
          // Room
          { path: 'rooms/create', component: RoomFormComponent },
          { path: 'rooms', component: RoomTableComponent },
          { path: 'rooms/update/:id', component: RoomFormComponent },
          {
            path: 'rooms/:id',
            component: RoomDetailsAdminComponent,
          },
          // Faculties
          { path: 'faculties/create', component: FacultyFormComponent },
          { path: 'faculties', component: FacultyTableComponent },
          {
            path: 'faculties/update/:id',
            component: FacultyFormComponent,
          },
          {
            path: 'faculties/:id',
            component: FacultyDetailsComponent,
          },
          {
            path: 'acceptance-settings',
            component: AcceptanceSettingsComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          {
            path: 'system-settings',
            component: SystemSettingsComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          {
            path: 'academic-years',
            component: AcademicYearComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          {
            path: 'terms-and-conditions',
            component: TermsAndConditionsComponent,
            canActivate: [isAuthenticatedGuard, hasRolesGuard],
            data: { roles: ['SuperAdmin'] },
          },
          // staff
          { path: 'employees', component: StaffTableComponent },
          { path: 'employees/create', component: AddStaffFormComponent },
          { path: 'employees/:id', component: StaffDetailsComponent },
          { path: 'employees/update/:id', component: AddStaffFormComponent },

          // violation
          {
            path: 'violations/:housingId/:studentId',
            component: ViolationFormAndDetailsComponent,
          },
          { path: 'violations', component: ViolationTableComponent },
          // housed Students
          { path: 'students', component: HousedStudentsTableComponent },
          {
            path: 'students/:id',
            component: HousedStudentDetailsComponent,
          },
        ],
        canActivate: [isAuthenticatedGuard, hasRolesGuard],
        resolve: {
          academicYears: isSystemInitializedResolver,
        },
        data: { roles: ['Admin'] },
      },
    ],
  },

  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
